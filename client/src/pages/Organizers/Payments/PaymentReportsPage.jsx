import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Download, DollarSign, Calendar, CreditCard, 
  PieChart, Filter, Search, ChevronDown, Tag, Settings,
  ChevronRight, AlertCircle, RefreshCw
} from 'lucide-react';
import axios from 'axios';

const PaymentReportsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    paidRegistrations: 0,
    pendingPayments: 0,
    refundedAmount: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, these would be API calls
        // const eventResponse = await axios.get(`/api/events/${eventId}`);
        // const paymentsResponse = await axios.get(`/api/events/${eventId}/payments`);
        // const statsResponse = await axios.get(`/api/events/${eventId}/payment-stats`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock event data
        const mockEvent = {
          id: eventId,
          title: 'Tech Conference 2025',
          startDate: '2025-06-15',
          endDate: '2025-06-17',
          location: 'San Francisco, CA',
          currency: 'USD'
        };
        
        // Mock payments data (recent transactions)
        const mockPayments = [
          {
            id: 'pay_1',
            date: '2024-12-15T10:30:45Z',
            attendee: {
              name: 'Jennifer Lawrence',
              email: 'jennifer.lawrence@example.com'
            },
            amount: 499,
            ticketType: 'Full Pass',
            status: 'successful',
            paymentMethod: 'credit_card',
            transactionId: 'ch_3OKRQy'
          },
          {
            id: 'pay_2',
            date: '2024-12-14T14:22:10Z',
            attendee: {
              name: 'Michael Chen',
              email: 'michael.chen@example.com'
            },
            amount: 199,
            ticketType: 'Day Pass',
            status: 'successful',
            paymentMethod: 'paypal',
            transactionId: 'ch_3OKPtr'
          },
          {
            id: 'pay_3',
            date: '2024-12-13T09:15:35Z',
            attendee: {
              name: 'Emma Wilson',
              email: 'emma.wilson@example.com'
            },
            amount: 499,
            ticketType: 'Full Pass',
            status: 'pending',
            paymentMethod: null,
            transactionId: null
          },
          {
            id: 'pay_4',
            date: '2024-12-12T16:47:20Z',
            attendee: {
              name: 'James Thompson',
              email: 'james.thompson@example.com'
            },
            amount: 149,
            ticketType: 'Workshop Only',
            status: 'successful',
            paymentMethod: 'credit_card',
            transactionId: 'ch_3OJxQr'
          },
          {
            id: 'pay_5',
            date: '2024-12-10T11:33:52Z',
            attendee: {
              name: 'Robert Davis',
              email: 'robert.davis@example.com'
            },
            amount: 499,
            ticketType: 'Full Pass',
            status: 'refunded',
            paymentMethod: 'credit_card',
            transactionId: 'ch_3OJjLm'
          },
          {
            id: 'pay_6',
            date: '2024-12-09T15:10:05Z',
            attendee: {
              name: 'Sophia Martinez',
              email: 'sophia.martinez@example.com'
            },
            amount: 199,
            ticketType: 'Day Pass',
            status: 'successful',
            paymentMethod: 'credit_card',
            transactionId: 'ch_3OJdKp'
          },
          {
            id: 'pay_7',
            date: '2024-12-07T13:25:18Z',
            attendee: {
              name: 'Daniel Johnson',
              email: 'daniel.johnson@example.com'
            },
            amount: 499,
            ticketType: 'Full Pass',
            status: 'successful',
            paymentMethod: 'paypal',
            transactionId: 'ch_3OJLTr'
          }
        ];
        
        // Mock stats data
        const mockStats = {
          totalRevenue: 8500,
          paidRegistrations: 42,
          pendingPayments: 5,
          refundedAmount: 1200,
          ticketRevenue: [
            { type: 'Full Pass', count: 25, revenue: 12475 },
            { type: 'Day Pass', count: 10, revenue: 1990 },
            { type: 'Workshop Only', count: 5, revenue: 745 },
            { type: 'Virtual Pass', count: 2, revenue: 198 }
          ],
          dailyRevenue: [
            { date: '2024-12-01', revenue: 499 },
            { date: '2024-12-02', revenue: 0 },
            { date: '2024-12-03', revenue: 149 },
            { date: '2024-12-04', revenue: 998 },
            { date: '2024-12-05', revenue: 199 },
            { date: '2024-12-06', revenue: 0 },
            { date: '2024-12-07', revenue: 499 },
            { date: '2024-12-08', revenue: 0 },
            { date: '2024-12-09', revenue: 199 },
            { date: '2024-12-10', revenue: 499 },
            { date: '2024-12-11', revenue: 0 },
            { date: '2024-12-12', revenue: 149 },
            { date: '2024-12-13', revenue: 499 },
            { date: '2024-12-14', revenue: 199 },
            { date: '2024-12-15', revenue: 499 }
          ],
          paymentMethods: [
            { method: 'Credit Card', count: 35, percentage: 83 },
            { method: 'PayPal', count: 7, percentage: 17 }
          ]
        };
        
        setEvent(mockEvent);
        setPayments(mockPayments);
        setStats(mockStats);
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
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'successful':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Filter payments based on search and filters
  const filteredPayments = payments.filter(payment => {
    // Apply search filter
    const matchesSearch = 
      payment.attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.ticketType.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    
    // Apply date range filter
    let matchesDate = true;
    if (dateRange !== 'all') {
      const paymentDate = new Date(payment.date);
      const today = new Date();
      
      if (dateRange === 'today') {
        matchesDate = paymentDate.toDateString() === today.toDateString();
      } else if (dateRange === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        matchesDate = paymentDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        matchesDate = paymentDate >= monthAgo;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Export payments report
  const exportPaymentsReport = (format) => {
    // In a real app, this would trigger an API call to generate a report
    alert(`Exporting payments report as ${format.toUpperCase()}`);
    
    // The actual implementation would redirect to an API endpoint
    // window.location.href = `/api/events/${eventId}/payments/export?format=${format}`;
  };
  
  // Refresh payments data
  const refreshData = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to refresh the data
      // await axios.get(`/api/events/${eventId}/payments?refresh=true`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, we'll just wait and use the same data
      setIsLoading(false);
    } catch (error) {
      console.error('Error refreshing data:', error);
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
            onClick={() => navigate(`/organizer/events/${eventId}`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Payment Reports
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Track and analyze payment data for {event?.title}
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
      
      {/* Stats Overview */}
      <div className="mb-6">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
                Total Revenue
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(stats.totalRevenue / 100, event?.currency)}
              </dd>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                Paid Registrations
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stats.paidRegistrations}
              </dd>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-gray-400" />
                Pending Payments
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-yellow-600">
                {stats.pendingPayments}
              </dd>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                <RefreshCw className="mr-2 h-5 w-5 text-gray-400" />
                Refunded Amount
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-red-600">
                {formatCurrency(stats.refundedAmount / 100, event?.currency)}
              </dd>
            </div>
          </div>
        </dl>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Search Input */}
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                placeholder="Search by name, email, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Filters
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                  Payment Status
                </label>
                <select
                  id="status-filter"
                  name="status-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="successful">Successful</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <select
                  id="date-filter"
                  name="date-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => exportPaymentsReport('csv')}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  Export CSV
                </button>
                <button
                  type="button"
                  onClick={() => exportPaymentsReport('excel')}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  Export Excel
                </button>
                <button
                  type="button"
                  onClick={() => refreshData()}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <RefreshCw className="mr-1.5 h-4 w-4" />
                  Refresh Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Payments Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Payment Transactions
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Recent payment activity for your event
          </p>
        </div>
        
        {filteredPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date/Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(payment.date)}</div>
                      <div>{formatTime(payment.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.attendee.name}</div>
                      <div className="text-sm text-gray-500">{payment.attendee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.ticketType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount, event?.currency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paymentMethod ? 
                        (payment.paymentMethod === 'credit_card' ? 'Credit Card' : 'PayPal') : 
                        '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => {/* View payment details */}}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-4 py-12 text-center">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all' || dateRange !== 'all' ? 
                "No payments match your current filters. Try adjusting your search criteria." : 
                "There are no payment transactions for this event yet."}
            </p>
          </div>
        )}
      </div>
      
      {/* Revenue by Ticket Type */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Tag className="mr-2 h-5 w-5 text-gray-500" />
              Revenue by Ticket Type
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {stats.ticketRevenue && stats.ticketRevenue.map((item) => (
                <div key={item.type} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.type}</span>
                    <span className="text-sm text-gray-500">
                      {item.count} sold · {formatCurrency(item.revenue / 100, event?.currency)}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                      <div
                        style={{ width: `${(item.revenue / stats.totalRevenue) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
              Payment Methods
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {stats.paymentMethods && stats.paymentMethods.map((item) => (
                <div key={item.method} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.method}</span>
                    <span className="text-sm text-gray-500">
                      {item.count} payments · {item.percentage}%
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${item.percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily Revenue Chart */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gray-500" />
            Daily Revenue
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="w-full h-64 bg-gray-50 rounded-md flex items-center justify-center">
            <PieChart className="h-10 w-10 text-gray-400" />
            <span className="ml-2 text-gray-500">Revenue chart visualization would appear here</span>
          </div>
          <p className="mt-2 text-sm text-gray-500 text-center">
            This chart shows daily payment activity over time
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReportsPage;