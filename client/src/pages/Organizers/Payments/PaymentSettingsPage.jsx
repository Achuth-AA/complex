import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, CreditCard, Globe, 
  Check, Eye, EyeOff, AlertTriangle, Tag
} from 'lucide-react';

const PaymentSettingsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [event, setEvent] = useState(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  
  // Simplified payment settings
  const [settings, setSettings] = useState({
    currency: 'USD',
    stripeEnabled: true,
    testMode: true,
    publishableKey: 'pk_test_51O7VyXJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxFsHUe',
    secretKey: 'sk_test_51O7VyXJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxD8tcs',
    taxEnabled: false,
    taxRate: 0,
    taxName: 'Sales Tax'
  });
  
  const [errors, setErrors] = useState({});
  
  // Available currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17'
        };
        
        setEvent(mockEvent);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkboxes vs other inputs
    const newValue = type === 'checkbox' ? checked : value;
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Toggle test mode
  const toggleTestMode = () => {
    setSettings(prev => ({
      ...prev,
      testMode: !prev.testMode
    }));
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!settings.publishableKey) {
      newErrors.publishableKey = 'API key is required';
    } else if (settings.testMode && !settings.publishableKey.startsWith('pk_test_')) {
      newErrors.publishableKey = 'Invalid test publishable key format';
    }
    
    if (!settings.secretKey) {
      newErrors.secretKey = 'Secret key is required';
    } else if (settings.testMode && !settings.secretKey.startsWith('sk_test_')) {
      newErrors.secretKey = 'Invalid test secret key format';
    }
    
    if (settings.taxEnabled) {
      if (settings.taxRate < 0 || settings.taxRate > 100) {
        newErrors.taxRate = 'Tax rate must be between 0 and 100';
      }
      
      if (!settings.taxName.trim()) {
        newErrors.taxName = 'Tax name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Save settings
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccessMessage('Payment settings saved successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Payment Settings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Configure payment options for {event?.title}
            </p>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/payments/ticket-config`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            <Tag className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Ticket Config
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="-ml-1 mr-2 h-5 w-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="space-y-6 mb-8">
        {/* Currency Settings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Globe className="mr-2 h-5 w-5 text-gray-500" />
              Currency Settings
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="max-w-lg">
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Primary Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                All payments will be processed in this currency
              </p>
            </div>
          </div>
        </div>
        
        {/* Stripe Configuration */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                Payment Gateway
              </h3>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                alt="Stripe Logo" 
                className="h-8"
              />
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            {/* Stripe Enabled Toggle */}
            <div className="flex items-center">
              <input
                id="stripeEnabled"
                name="stripeEnabled"
                type="checkbox"
                checked={settings.stripeEnabled}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="stripeEnabled" className="ml-3 block text-sm font-medium text-gray-700">
                Enable Stripe Payments
              </label>
            </div>
            
            {settings.stripeEnabled && (
              <>
                {/* Mode Toggle */}
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Mode</h4>
                    <p className="text-sm text-gray-500">
                      {settings.testMode ? 
                        'Test mode is enabled. No real transactions will be processed.' : 
                        'Live mode is enabled. Real transactions will be processed.'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`mr-3 text-sm ${!settings.testMode ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                      Live
                    </span>
                    <button
                      type="button"
                      onClick={toggleTestMode}
                      className={`${
                        !settings.testMode ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      <span className="sr-only">Toggle mode</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          !settings.testMode ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      ></span>
                    </button>
                    <span className={`ml-3 text-sm ${settings.testMode ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                      Test
                    </span>
                  </div>
                </div>
                
                {/* API Keys */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="publishableKey" className="block text-sm font-medium text-gray-700">
                      {settings.testMode ? 'Test Publishable Key' : 'Live Publishable Key'}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="publishableKey"
                        id="publishableKey"
                        className={`block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                          errors.publishableKey ? 'border-red-300' : ''
                        }`}
                        placeholder={settings.testMode ? "pk_test_..." : "pk_live_..."}
                        value={settings.publishableKey}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.publishableKey && (
                      <p className="mt-1 text-sm text-red-600">{errors.publishableKey}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">
                      {settings.testMode ? 'Test Secret Key' : 'Live Secret Key'}
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={showSecretKey ? 'text' : 'password'}
                        name="secretKey"
                        id="secretKey"
                        className={`block w-full pr-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                          errors.secretKey ? 'border-red-300' : ''
                        }`}
                        placeholder={settings.testMode ? "sk_test_..." : "sk_live_..."}
                        value={settings.secretKey}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => setShowSecretKey(!showSecretKey)}
                      >
                        {showSecretKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.secretKey && (
                      <p className="mt-1 text-sm text-red-600">{errors.secretKey}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <p className="text-sm text-gray-500">
                      Keep your API keys secure and never share them publicly
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Tax Settings */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tax Settings
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <input
                id="taxEnabled"
                name="taxEnabled"
                type="checkbox"
                checked={settings.taxEnabled}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="taxEnabled" className="ml-3 block text-sm font-medium text-gray-700">
                Enable Tax Collection
              </label>
            </div>
            
            {settings.taxEnabled && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="taxName" className="block text-sm font-medium text-gray-700">
                    Tax Name
                  </label>
                  <input
                    type="text"
                    name="taxName"
                    id="taxName"
                    className={`mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                      errors.taxName ? 'border-red-300' : ''
                    }`}
                    placeholder="e.g. Sales Tax, VAT, GST"
                    value={settings.taxName}
                    onChange={handleInputChange}
                  />
                  {errors.taxName && (
                    <p className="mt-1 text-sm text-red-600">{errors.taxName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">
                    Tax Rate (%)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="taxRate"
                      id="taxRate"
                      className={`block w-full pr-12 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md ${
                        errors.taxRate ? 'border-red-300' : ''
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                      value={settings.taxRate}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                  {errors.taxRate && (
                    <p className="mt-1 text-sm text-red-600">{errors.taxRate}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 z-10">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSaving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettingsPage;