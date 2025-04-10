// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from "./Contexts/AuthContext"

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login, user } = useAuth();
//   const navigate = useNavigate();
  
//   // Animation trigger after component mount
//   useEffect(() => {
//     setIsLoaded(true);
//   }, []);
  
//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       redirectBasedOnRole(user.role);
//     }
//   }, [user]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-in-out">
//         {/* Left Panel - Branding */}
//         <div 
//           className={`w-full md:w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center items-center transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
//         >
//           <div className="max-w-md mx-auto">
//             <div className={`transition-all duration-700 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
//               <h1 className="text-4xl font-bold mb-4">ConferenceHub</h1>
//               <p className="text-xl mb-8">Welcome back to the ultimate conference management platform</p>
//             </div>
            
//             <div className={`bg-white/10 rounded-lg p-6 backdrop-blur-sm transition-all duration-700 delay-500 transform ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
//               <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
//               <p className="mb-6">Log in to access your personalized dashboard, manage your schedule, and connect with other attendees.</p>
//               <div className="flex space-x-4">
//                 <div className={`bg-white/20 rounded p-4 flex-1 text-center transform transition-all duration-500 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                   <p className="font-semibold">500+</p>
//                   <p className="text-sm">Events</p>
//                 </div>
//                 <div className={`bg-white/20 rounded p-4 flex-1 text-center transform transition-all duration-500 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                   <p className="font-semibold">10K+</p>
//                   <p className="text-sm">Users</p>
//                 </div>
//                 <div className={`bg-white/20 rounded p-4 flex-1 text-center transform transition-all duration-500 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                   <p className="font-semibold">95%</p>
//                   <p className="text-sm">Satisfaction</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Right Panel - Login Form */}
//         <div 
//           className={`w-full md:w-1/2 bg-white p-8 flex justify-center items-center transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
//         >
//           <div className="max-w-md w-full">
//             <div className={`text-center mb-8 transition-all duration-700 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//               <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
//               <p className="text-gray-600 mt-2">Access your conference dashboard</p>
//             </div>
            
//             {errorMessage && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//                 {errorMessage}
//               </div>
//             )}
            
//             <form className="space-y-5" onSubmit={handleSubmit}>
//               <div className={`relative transition-all duration-500 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//                   <Mail size={18} />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
//                   required
//                 />
//               </div>
              
//               <div className={`relative transition-all duration-500 delay-600 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//                   <Lock size={18} />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
              
//               <div className={`flex items-center justify-between text-sm transition-all duration-500 delay-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-gray-700">
//                     Remember me
//                   </label>
//                 </div>
//                 <div>
//                   <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:-translate-y-1 active:translate-y-0 ${isLoaded ? 'opacity-100 translate-y-0 delay-800' : 'opacity-0 translate-y-10'} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
//                     Signing In...
//                   </div>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>
            
//             <div className={`relative my-6 transition-all duration-500 delay-900 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
//               </div>
//             </div>
            
//             <div className={`grid grid-cols-2 gap-3 transition-all duration-500 delay-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//               <button 
//                 className="flex justify-center items-center py-2.5 px-4 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
//               >
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                   <path
//                     fill="#4285F4"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="#EA4335"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 Google
//               </button>
//               <button 
//                 className="flex justify-center items-center py-2.5 px-4 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
//                   <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
//                 </svg>
//                 Facebook
//               </button>
//             </div>
            
//             <div className={`mt-6 text-center text-sm transition-all duration-500 delay-1100 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//               <p className="text-gray-600">
//                 Don't have an account?
//                 <Link
//                   to="/register"
//                   className="ml-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
//                 >
//                   Create one
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   // Helper functions
//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }
  
//   function redirectBasedOnRole(role) {
//     switch (role) {
//       case 'organizer':
//         navigate('/organizer/home');
//         break;
//       case 'attendee':
//         navigate('/attendee/home');
//         break;
//       case 'presenter':
//         navigate('/presenter/home');
//         break;
//       default:
//         navigate('/login');
//     }
//   }
  
//   async function handleSubmit(e) {
//     e.preventDefault();
    
//     if (isSubmitting) return;
    
//     setIsSubmitting(true);
//     setErrorMessage('');
    
//     try {
//       const response = await login({
//         email: formData.email,
//         password: formData.password
//       });
      
//       if (!response.success) {
//         setErrorMessage(response.message);
//       }
//       // If successful, useEffect with user dependency will handle redirection
//     } catch (error) {
//       setErrorMessage('An unexpected error occurred. Please try again.');
//       console.error('Login error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }
// };

// export default LoginPage;





import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./Contexts/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  // Animation trigger after component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.role);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const redirectBasedOnRole = (role) => {
    switch (role) {
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
        navigate('/login');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      });
      
      if (!response.success) {
        setErrorMessage(response.message);
      }
      // If successful, useEffect with user dependency will handle redirection
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
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
            backgroundImage: "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            backgroundPosition: "center",
            filter: "brightness(0.6)"
          }}
        ></div>
        
        <div className="relative z-10 max-w-2xl mx-auto px-8 py-12 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-700 delay-300 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome Back!
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-2xl">
              Sign in to your ConferenceHub account to manage events, connect with attendees, and access your personalized dashboard.
            </p>
          </div>
          
          <div className={`mt-12 transition-all duration-700 delay-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">The Ultimate Conference Platform</h2>
              <p className="text-indigo-100 mb-6">Access your personalized dashboard, manage your schedule, and connect with other attendees.</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-sm text-indigo-100">Events</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="text-sm text-indigo-100">Users</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-white">95%</p>
                  <p className="text-sm text-indigo-100">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`mt-12 transition-all duration-700 delay-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">What's New</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-300 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-indigo-100">Enhanced networking features</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-300 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-indigo-100">AI-powered session recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-300 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-indigo-100">Real-time interactive Q&A sessions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div 
        className={`lg:w-1/2 bg-white transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-20 min-h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className={`text-center transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Access your conference dashboard and manage your experience
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className={`bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Google</span>
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                      </svg>
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`mt-6 text-center transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up now
                </Link>
              </p>
              <p className="mt-3 text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;