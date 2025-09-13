import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Users, BarChart3 } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, socialLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Sign in failed",
        description: result.error || "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    const result = await socialLogin(provider);
    
    if (result.success) {
      toast({
        title: "Welcome!",
        description: `Successfully signed in with ${provider}.`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Sign in failed",
        description: "Social login failed. Please try again.",
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
            AI-Powered ESG<br />Platform
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-center mb-12 text-white/90 max-w-lg">
            Comprehensive environmental, social, and governance monitoring platform
          </p>
          
          {/* Feature List */}
          <div className="space-y-6 max-w-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Environmental impact monitoring</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Sustainable development goals</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg">Global ESG compliance & reporting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your AI-Powered ESG Platform dashboard</p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              variant="outline"
              className="w-full h-12 border-2 hover:bg-red-50"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-12 border-2 hover:bg-blue-50"
              onClick={() => handleSocialLogin('microsoft')}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z"/>
                <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                <path fill="#FFB900" d="M13 13h10v10H13z"/>
              </svg>
              Microsoft
            </Button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-12"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10 h-12"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-teal-600 hover:text-teal-800">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-teal-600 hover:text-teal-800 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;