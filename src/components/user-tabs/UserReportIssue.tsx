import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  AlertTriangle,
  Zap,
  Droplets,
  Car,
  TreePine,
  Send,
  X,
  FileText,
  Mic,
  Camera,
  MapPin,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix Leaflet marker icons
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const issueCategories = [
  { id: "infrastructure", name: "Infrastructure", icon: AlertTriangle, description: "Roads, bridges, buildings" },
  { id: "utilities", name: "Utilities", icon: Zap, description: "Power, gas, internet" },
  { id: "water", name: "Water & Sanitation", icon: Droplets, description: "Water supply, drainage, waste" },
  { id: "traffic", name: "Traffic", icon: Car, description: "Traffic lights, signs, congestion" },
  { id: "environment", name: "Environment", icon: TreePine, description: "Pollution, green spaces" },
];

const priorityLevels = [
  { id: "low", name: "Low Priority", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  { id: "medium", name: "Medium Priority", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  { id: "high", name: "High Priority", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  { id: "urgent", name: "Urgent", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
];

// Component to pick location by clicking on map
function LocationMarker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function UserReportIssue() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    location: "",
    lat: null as number | null,
    lng: null as number | null,
    images: [] as string[],
  });
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData((prev) => ({
          ...prev,
          description: prev.description + " " + transcript,
        }));
      };

      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment"); // rear camera
      fileInputRef.current.click();
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitReport = () => {
    console.log("Submitting report:", formData);
    alert("Report submitted successfully!");
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "",
      location: "",
      lat: null,
      lng: null,
      images: [],
    });
    setCurrentStep(1);
  };

  const getStepProgress = () => (currentStep / 4) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-400" />
                Report New Issue
              </CardTitle>
              <p className="text-gray-400 text-sm mt-1">
                Help improve your community by reporting issues
              </p>
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Step {currentStep} of 4
            </Badge>
          </div>
          <div className="mt-4">
            <Progress value={getStepProgress()} className="h-2 bg-gray-700" />
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10">
        <CardContent className="p-8">
          {/* Step 1 - Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Basic Information</h2>
              <div>
                <Label className="text-white">Issue Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Brief issue title"
                  className="bg-black/30 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white flex justify-between">
                  Detailed Description
                  <Button onClick={startVoiceInput} type="button" className="ml-2 flex items-center">
                    <Mic className="h-4 w-4 mr-1" />
                    {isRecording ? "Stop" : "Voice Input"}
                  </Button>
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the issue in detail..."
                  className="bg-black/30 border-white/20 text-white min-h-32"
                />
              </div>
            </div>
          )}

          {/* Step 2 - Category & Priority */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Category & Priority</h2>
              <div className="grid grid-cols-2 gap-4">
                {issueCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleInputChange("category", cat.id)}
                    className={`p-4 rounded-xl border ${
                      formData.category === cat.id
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-white/20"
                    } text-left text-white`}
                  >
                    <cat.icon className="h-5 w-5 mb-2 text-blue-400" />
                    <div className="font-semibold">{cat.name}</div>
                    <div className="text-sm text-gray-400">{cat.description}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                {priorityLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleInputChange("priority", level.id)}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.priority === level.id
                        ? level.color
                        : "border-white/20 text-gray-300"
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 - Location & Media */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Location & Media</h2>

              <div>
                <Label className="text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" /> Select Location on Map
                </Label>
                <div className="h-64 mt-2 rounded-lg overflow-hidden border border-white/20">
                  <MapContainer
                    center={[20.5937, 78.9629]} // India default
                    zoom={5}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    {formData.lat && formData.lng && (
                      <Marker position={[formData.lat, formData.lng]} />
                    )}
                    <LocationMarker
                      onSelect={(lat, lng) =>
                        setFormData((prev) => ({ ...prev, lat, lng }))
                      }
                    />
                  </MapContainer>
                </div>
                {formData.lat && formData.lng && (
                  <p className="text-gray-300 mt-2 text-sm">
                    Selected: {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-white">Upload Images / Take Photo</Label>
                <div className="flex gap-3 mt-2">
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white"
                  >
                    Upload
                  </Button>
                  <Button
                    type="button"
                    onClick={openCamera}
                    className="bg-green-600 text-white flex items-center"
                  >
                    <Camera className="h-4 w-4 mr-2" /> Take Photo
                  </Button>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-3 mt-3">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/20"
                    >
                      <img
                        src={img}
                        alt="uploaded"
                        className="object-cover w-full h-full"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black/50 p-1 rounded-full"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6 text-white">
              <h2 className="text-2xl font-bold">Review & Submit</h2>
              <p>
                <b>Title:</b> {formData.title}
              </p>
              <p>
                <b>Description:</b> {formData.description}
              </p>
              <p>
                <b>Category:</b> {formData.category}
              </p>
              <p>
                <b>Priority:</b> {formData.priority}
              </p>
              <p>
                <b>Location:</b>{" "}
                {formData.lat && formData.lng
                  ? `${formData.lat.toFixed(4)}, ${formData.lng.toFixed(4)}`
                  : formData.location}
              </p>
              <div className="flex flex-wrap gap-3">
                {formData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="preview"
                    className="w-24 h-24 rounded-lg object-cover border border-white/20"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-gray-500/50 text-gray-300 hover:bg-gray-500/20 disabled:opacity-50"
            >
              Previous
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={submitReport}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
