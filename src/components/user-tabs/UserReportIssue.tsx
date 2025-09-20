import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Upload, 
  Camera, 
  MapPin, 
  AlertTriangle, 
  Zap, 
  Droplets, 
  Car, 
  TreePine, 
  Send,
  X,
  FileText,
  Mic
} from 'lucide-react';

const issueCategories = [
  { id: 'infrastructure', name: 'Infrastructure', icon: AlertTriangle, description: 'Roads, bridges, buildings' },
  { id: 'utilities', name: 'Utilities', icon: Zap, description: 'Power, gas, internet' },
  { id: 'water', name: 'Water & Sanitation', icon: Droplets, description: 'Water supply, drainage, waste' },
  { id: 'traffic', name: 'Traffic', icon: Car, description: 'Traffic lights, signs, congestion' },
  { id: 'environment', name: 'Environment', icon: TreePine, description: 'Pollution, green spaces' },
];

const priorityLevels = [
  { id: 'low', name: 'Low Priority', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { id: 'medium', name: 'Medium Priority', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  { id: 'high', name: 'High Priority', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  { id: 'urgent', name: 'Urgent', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
];

export function UserReportIssue() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    location: '',
    images: [] as string[]
  });
  const [isDragOver, setIsDragOver] = useState(false);

  // ✅ Voice input states
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData((prev) => ({
          ...prev,
          description: prev.description + ' ' + transcript,
        }));
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Your browser does not support Speech Recognition.');
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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const imageUrls = fileArray.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitReport = () => {
    console.log('Submitting report:', formData);
    alert('Report submitted successfully!');
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: '',
      location: '',
      images: []
    });
    setCurrentStep(1);
  };

  const getStepProgress = () => (currentStep / 4) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-400" />
                Report New Issue
              </CardTitle>
              <p className="text-gray-400 text-sm mt-1">Help improve your community by reporting issues</p>
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
      <Card className="bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
        <CardContent className="p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
                <p className="text-gray-400">Let's start with the basics about your issue</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">Issue Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-1 bg-black/30 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white flex items-center justify-between">
                    <span>Detailed Description</span>
                    <Button
                      type="button"
                      onClick={startVoiceInput}
                      className="ml-2 flex items-center px-3 py-1 rounded-md"
                    >
                      <Mic className="h-4 w-4 mr-1" />
                      {isRecording ? 'Stop' : 'Voice Input'}
                    </Button>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about the issue..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="mt-1 bg-black/30 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 min-h-32"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2, 3, 4 remain unchanged */}
          {/* ... your existing code for steps 2, 3, 4 ... */}

          {/* Navigation Buttons */}
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
