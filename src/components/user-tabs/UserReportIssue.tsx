import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
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
  CheckCircle,
  FileText
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
    // Here you would typically send the data to your backend
    alert('Report submitted successfully!');
    // Reset form
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
                  <Label htmlFor="description" className="text-white">Detailed Description</Label>
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

          {/* Step 2: Category & Priority */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Category & Priority</h2>
                <p className="text-gray-400">Help us categorize and prioritize your report</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-white">Issue Category</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {issueCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div
                          key={category.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            formData.category === category.id
                              ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/25'
                              : 'bg-black/30 border-white/20 hover:border-white/40 hover:bg-black/40'
                          }`}
                          onClick={() => handleInputChange('category', category.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="h-6 w-6 text-blue-400" />
                            <div>
                              <div className="text-white font-medium">{category.name}</div>
                              <div className="text-gray-400 text-sm">{category.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-white">Priority Level</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    {priorityLevels.map((priority) => (
                      <div
                        key={priority.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 text-center ${
                          formData.priority === priority.id
                            ? `${priority.color} scale-105`
                            : 'bg-black/30 border-white/20 text-gray-300 hover:border-white/40'
                        }`}
                        onClick={() => handleInputChange('priority', priority.id)}
                      >
                        {priority.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location & Images */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Location & Evidence</h2>
                <p className="text-gray-400">Add location and visual evidence for your report</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="location" className="text-white flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter address or landmark"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="mt-1 bg-black/30 border-white/20 text-white placeholder-gray-400 focus:border-purple-500"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>

                <div>
                  <Label className="text-white flex items-center">
                    <Camera className="h-4 w-4 mr-2 text-green-400" />
                    Upload Images (Optional)
                  </Label>
                  
                  <div
                    className={`mt-3 border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      isDragOver
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/30 hover:border-white/50'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      handleFileUpload(e.dataTransfer.files);
                    }}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Drag and drop images here, or click to select</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                    <input
                      id="file-input"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-white/20"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
                <p className="text-gray-400">Please review your report before submitting</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="text-white font-medium mb-2">Issue Details</h3>
                  <p className="text-gray-300">{formData.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{formData.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-2">Category</h3>
                    <p className="text-gray-300 capitalize">{formData.category}</p>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-2">Priority</h3>
                    <p className="text-gray-300 capitalize">{formData.priority}</p>
                  </div>
                </div>

                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="text-white font-medium mb-2">Location</h3>
                  <p className="text-gray-300">{formData.location}</p>
                </div>

                {formData.images.length > 0 && (
                  <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-2">Attached Images</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {formData.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-16 object-cover rounded border border-white/20"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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