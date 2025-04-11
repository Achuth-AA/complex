import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Download, QrCode, Copy, Check, Share2, 
  Printer, Smartphone, Tag, DollarSign, Settings, Clipboard
} from 'lucide-react';
import axios from 'axios';

const PaymentQRCodePage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const qrCodeRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const qrCodeResponse = await axios.get(`/api/events/${eventId}/payment-qr-codes`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17',
          location: 'San Francisco, CA',
          currency: 'USD',
          ticketTypes: [
            { 
              id: 'full', 
              name: 'Full Pass', 
              price: 499,
              qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=full_499'
            },
            { 
              id: 'day', 
              name: 'Day Pass', 
              price: 199,
              qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=day_199'
            },
            { 
              id: 'workshop', 
              name: 'Workshop Only', 
              price: 149,
              qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=workshop_149'
            },
            { 
              id: 'virtual', 
              name: 'Virtual Pass', 
              price: 99,
              qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=virtual_99'
            }
          ],
          paymentQRCodes: {
            baseUrl: 'https://checkout.stripe.com/pay/cs_test_',
            eventUrl: 'https://techconf2025.events/register',
            customAmountUrl: 'https://checkout.stripe.com/pay/cs_test_custom_amount'
          }
        };
        
        setEvent(mockEvent);
        setSelectedTicketType(mockEvent.ticketTypes[0]);
        setQrCodeData({
          url: mockEvent.ticketTypes[0].qrCodeUrl,
          amount: mockEvent.ticketTypes[0].price,
          type: mockEvent.ticketTypes[0].name
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [eventId]);
  
  // Format currency for display
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  // Generate QR code for a specific ticket type
  const generateTicketQRCode = (ticketType) => {
    setSelectedTicketType(ticketType);
    setQrCodeData({
      url: ticketType.qrCodeUrl,
      amount: ticketType.price,
      type: ticketType.name
    });
    setShowCustomAmount(false);
  };
  
  // Generate custom amount QR code
  const generateCustomAmountQRCode = () => {
    if (!customAmount || parseFloat(customAmount) <= 0) {
      return;
    }
    
    // In a real app, this would call an API to generate a QR code for the custom amount
    const mockCustomQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=custom_${customAmount}`;
    
    setSelectedTicketType(null);
    setQrCodeData({
      url: mockCustomQRUrl,
      amount: parseFloat(customAmount),
      type: 'Custom Payment'
    });
  };
  
  // Copy payment URL to clipboard
  const copyPaymentUrl = () => {
    // In a real app, this would be the actual payment URL
    const paymentUrl = event.paymentQRCodes.eventUrl + `?amount=${qrCodeData.amount}&type=${qrCodeData.type}`;
    
    navigator.clipboard.writeText(paymentUrl).then(() => {
      setCopiedText('url');
      setTimeout(() => setCopiedText(''), 2000);
    });
  };
  
  // Download QR code as image
  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;
    
    const canvas = document.createElement('canvas');
    const img = qrCodeRef.current;
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    
    const link = document.createElement('a');
    link.download = `${event.title.replace(/\s+/g, '-')}-payment-qr-${qrCodeData.type.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    setSuccessMessage('QR code downloaded successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Print QR code
  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${event.title} - Payment QR Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              text-align: center;
            }
            .qr-container {
              margin: 20px auto;
              max-width: 400px;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .event-details {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .price {
              font-size: 24px;
              font-weight: bold;
              margin: 10px 0;
            }
            .ticket-type {
              font-size: 18px;
              margin-bottom: 20px;
            }
            img {
              max-width: 300px;
              height: auto;
            }
            .instructions {
              margin-top: 20px;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>${event.title}</h1>
            <div class="event-details">${event.location} • ${new Date(event.startDate).toLocaleDateString()}</div>
            <div class="price">${formatCurrency(qrCodeData.amount, event.currency)}</div>
            <div class="ticket-type">${qrCodeData.type}</div>
            <img src="${qrCodeData.url}" alt="Payment QR Code" />
            <div class="instructions">
              <p>Scan this QR code to make a payment</p>
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  
  // Share QR code
  const shareQRCode = async () => {
    try {
      // Create a blob from the image
      const response = await fetch(qrCodeData.url);
      const blob = await response.blob();
      
      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: `${event.title} - Payment QR Code`,
          text: `Pay ${formatCurrency(qrCodeData.amount, event.currency)} for ${qrCodeData.type}`,
          files: [
            new File([blob], 'payment-qr-code.png', { type: 'image/png' })
          ]
        });
        
        setSuccessMessage('QR code shared successfully');
      } else {
        // Fallback to clipboard
        copyPaymentUrl();
        setSuccessMessage('Payment URL copied to clipboard');
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };
  
  // Create a new custom QR code via API
  const createNewQRCode = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // const response = await axios.post(`/api/events/${eventId}/payment-qr-codes`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Refresh QR code data for the selected ticket type
      if (selectedTicketType) {
        generateTicketQRCode(selectedTicketType);
      } else if (showCustomAmount && customAmount) {
        generateCustomAmountQRCode();
      }
      
      setSuccessMessage('New QR code generated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating new QR code:', error);
      setIsLoading(false);
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
            onClick={() => navigate(`/organizer/events/${eventId}/payments`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Payment QR Codes
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Generate and manage QR codes for accepting payments
            </p>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          <button
            type="button"
            onClick={() => navigate(`/organizer/events/${eventId}/payments/settings`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Settings className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Payment Settings
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
      
      {/* QR Code Generator Panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Panel: QR Code Selection */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Tag className="mr-2 h-5 w-5 text-gray-500" />
              Select Ticket Type
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Generate a QR code for a specific ticket type or custom amount
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {event?.ticketTypes.map((ticket) => (
                <div 
                  key={ticket.id}
                  className={`border rounded-md p-4 cursor-pointer hover:border-indigo-500 transition-colors ${
                    selectedTicketType?.id === ticket.id && !showCustomAmount ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                  }`}
                  onClick={() => generateTicketQRCode(ticket)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                      <p className="text-sm text-gray-500">Fixed price ticket</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(ticket.price, event?.currency)}</p>
                  </div>
                </div>
              ))}
              
              <div 
                className={`border rounded-md p-4 cursor-pointer hover:border-indigo-500 transition-colors ${
                  showCustomAmount ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
                onClick={() => setShowCustomAmount(true)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">Custom Amount</h4>
                    <p className="text-sm text-gray-500">Generate a QR code for any amount</p>
                  </div>
                  <DollarSign className="h-6 w-6 text-gray-400" />
                </div>
                
                {showCustomAmount && (
                  <div className="mt-4">
                    <div className="flex">
                      <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">{event?.currency}</span>
                        </div>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={generateCustomAmountQRCode}
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: QR Code Display */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <QrCode className="mr-2 h-5 w-5 text-gray-500" />
              Payment QR Code
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Scan with a mobile device to make a payment
            </p>
          </div>
          
          {qrCodeData ? (
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
              <div className="bg-white p-4 border border-gray-200 rounded-md mb-4">
                <img 
                  ref={qrCodeRef}
                  src={qrCodeData.url} 
                  alt="Payment QR Code" 
                  className="h-64 w-64"
                />
              </div>
              
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(qrCodeData.amount, event?.currency)}
                </div>
                <div className="text-sm text-gray-500">
                  {qrCodeData.type}
                </div>
                
                <div className="mt-2 px-4 py-2 bg-gray-50 rounded-md w-full max-w-md">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 truncate">
                      {event?.paymentQRCodes?.eventUrl}?amount={qrCodeData.amount}
                    </span>
                    <button
                      type="button"
                      onClick={copyPaymentUrl}
                      className="ml-2 text-indigo-600 hover:text-indigo-900 focus:outline-none"
                    >
                      {copiedText === 'url' ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={downloadQRCode}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="mr-2 h-5 w-5 text-gray-500" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={printQRCode}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Printer className="mr-2 h-5 w-5 text-gray-500" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={shareQRCode}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Share2 className="mr-2 h-5 w-5 text-gray-500" />
                  Share
                </button>
                <button
                  type="button"
                  onClick={createNewQRCode}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <RefreshCw className="mr-2 h-5 w-5 text-gray-500" />
                  Regenerate
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-12 sm:p-12 text-center">
              <QrCode className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No QR code generated</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a ticket type or enter a custom amount to generate a payment QR code.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Usage Instructions */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            How to Use Payment QR Codes
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-indigo-100 p-3">
                <QrCode className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="mt-2 text-lg font-medium text-gray-900">1. Generate</h4>
              <p className="mt-1 text-sm text-gray-500">
                Create a QR code for a specific ticket type or custom amount
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-indigo-100 p-3">
                <Smartphone className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="mt-2 text-lg font-medium text-gray-900">2. Display</h4>
              <p className="mt-1 text-sm text-gray-500">
                Print or display the QR code at your event or share it online
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-indigo-100 p-3">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="mt-2 text-lg font-medium text-gray-900">3. Collect</h4>
              <p className="mt-1 text-sm text-gray-500">
                Attendees scan the QR code with their phone camera to make a payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentQRCodePage;