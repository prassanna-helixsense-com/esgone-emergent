import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { Eye, EyeOff, ArrowRight, Users, ShieldCheck, HeadphonesIcon } from 'lucide-react';

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    jobTitle: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return false;
    }
    
    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await register(formData);
    
    if (result.success) {
      toast({
        title: "Welcome to ESGone!",
        description: "Your account has been created successfully.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Registration failed",
        description: result.error || "Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background with Information */}
      <div className="flex-1 bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 relative overflow-hidden">
        {/* Background decoration circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/10 rounded-full"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-12">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <div className="text-2xl font-bold text-white">ESG</div>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl font-bold text-center mb-4">
            Join ESGone Support
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-center mb-12 text-white/90 max-w-lg">
            Start your ESG journey with comprehensive monitoring and reporting
          </p>
          
          {/* Feature List */}
          <div className="space-y-6 max-w-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Quick setup & onboarding</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">24/7 expert support</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join thousands of companies managing their ESG performance</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`h-1 w-8 ${currentStep >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <>
                {/* Step 1: Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pr-10 h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="pr-10 h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Step 2: Company Information */}
                <div>
                  <Label htmlFor="company">Company Name (Optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your Company Inc."
                    value={formData.company}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="ESG Manager"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 h-12"
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-teal-600 hover:text-teal-800 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;