import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Briefcase, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./Contexts/AuthContext";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('attendee');
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    organization: '',
    jobTitle: '',
    bio: '',
    role: 'attendee'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Animation trigger after component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'organizer':
          navigate('/organizer/home');
          break;
        case 'attendee':
          navigate('/attendee/home');
          break;
        case 'presenter':
          navigate('/presenter/home');
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      ...formData,
      role: type
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
    } else {
      if (isSubmitting) return;
      
      setIsSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      try {
        const response = await register(formData);
        
        if (response.success) {
          setSuccessMessage(response.message);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        setErrorMessage('An unexpected error occurred. Please try again.');
        console.error('Registration error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Image & Content */}
      <div 
        className={`relative lg:w-1/2 bg-indigo-700 flex items-center justify-center transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            backgroundPosition: "center",
            filter: "brightness(0.6)"
          }}
        ></div>
        
        <div className="relative z-10 max-w-2xl mx-auto px-8 py-12 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to ConferenceHub
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-2xl">
              Join thousands of professionals and experts at the world's premier conference management platform.
            </p>
          </div>
          
          <div className={`mt-12 transition-all duration-700 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center">
                  <div className="bg-indigo-500 rounded-md p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-white">500+ Events</h3>
                </div>
                <p className="mt-4 text-base text-indigo-100">
                  Access exclusive conferences and events from around the world.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center">
                  <div className="bg-indigo-500 rounded-md p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-white">Networking</h3>
                </div>
                <p className="mt-4 text-base text-indigo-100">
                  Connect with industry professionals and grow your network.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center">
                  <div className="bg-indigo-500 rounded-md p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-white">Personalized</h3>
                </div>
                <p className="mt-4 text-base text-indigo-100">
                  Get custom recommendations based on your interests.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center">
                  <div className="bg-indigo-500 rounded-md p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-white">All-in-One</h3>
                </div>
                <p className="mt-4 text-base text-indigo-100">
                  Manage schedules, materials, and networking all in one platform.
                </p>
              </div>
            </div>
          </div>
          
          <div className={`mt-12 text-center transition-all duration-700 delay-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-base text-indigo-100">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-white hover:text-indigo-200 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div 
        className={`lg:w-1/2 bg-white transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-20 min-h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-md xl:max-w-xl">
            <div className={`text-center transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {step === 1 ? 'Create your account' : 'Complete your profile'}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {step === 1 
                  ? "Join ConferenceHub today and start managing your conference experience."
                  : "Tell us more about yourself to personalize your experience."}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md xl:max-w-xl">
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}

            <div className={`bg-white py-8 px-4 sm:rounded-lg sm:px-10 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">I am registering as:</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['attendee', 'presenter', 'organizer'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleUserTypeChange(type)}
                            className={`px-4 py-3 text-sm rounded-lg border transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 ${
                              userType === type
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
                            } capitalize flex justify-center items-center`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="relative">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User size={18} />
                          </div>
                          <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Mail size={18} />
                          </div>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Lock size={18} />
                          </div>
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            placeholder="Create a strong password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Password must be at least 8 characters long with a mix of letters, numbers and symbols.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {(userType === 'presenter' || userType === 'organizer') && (
                      <div className="space-y-6">
                        <div className="relative">
                          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                            Organization/Company
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <Building size={18} />
                            </div>
                            <input
                              id="organization"
                              type="text"
                              name="organization"
                              value={formData.organization}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                              placeholder="Your organization name"
                            />
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <Briefcase size={18} />
                            </div>
                            <input
                              id="jobTitle"
                              type="text"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                              placeholder="Your position or title"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Brief Bio {userType === 'presenter' && '(will be visible to attendees)'}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows="4"
                          className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          placeholder={`Tell us a bit about yourself${userType === 'presenter' ? ' and your expertise' : ''}`}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>
                      </label>
                    </div>
                  </>
                )}
                
                <div className={`flex ${step === 2 ? 'justify-between' : 'justify-end'} pt-4`}>
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex justify-center items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
                    >
                      Back
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                        {step === 1 ? 'Processing...' : 'Registering...'}
                      </>
                    ) : (
                      step === 1 ? 'Continue' : 'Complete Registration'
                    )}
                  </button>
                </div>
              </form>
              
              {step === 1 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              )}
            </div>
            
            <div className={`mt-6 text-center transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-xs text-gray-500">
                By signing up, you acknowledge that you have read and understand our <a href="#" className="text-indigo-600 hover:text-indigo-500">Data Policy</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Cookie Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;