import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { Users, Smartphone, TrendingUp, Target, MapPin, DollarSign, Clock, Activity, Filter, Download, Eye, RefreshCw } from 'lucide-react';

import React, { useState, useMemo } from 'react';
import { userData } from '../data/data';
import FilterPanel from '../components/FilterPanel';
import SummaryStats from '../components/SummaryStats';
import VisualExplorer from '../components/VisualExplorer';
import SegmentDetailsModal from '../components/SegmentDetailsModal';

const SegmentExplorer = () => {
  const [filters, setFilters] = useState({
    region: 'All',
    ageGroup: 'All',
    usageLevel: 'All',
  });
  
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const filteredData = useMemo(() => {
    return userData.filter(item => {
      return (filters.region === 'All' || item.region === filters.region) &&
             (filters.ageGroup === 'All' || item.ageGroup === filters.ageGroup) &&
             (filters.usageLevel === 'All' || item.usageLevel === filters.usageLevel)
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSelectedSegment(null); 
  };

  const resetFilters = () => {
    setFilters({
      region: 'All',
      ageGroup: 'All',
      usageLevel: 'All',
    });
    setSelectedSegment(null);
  };

  const handleSegmentSelect = (segment) => {
    setSelectedSegment(selectedSegment?.id === segment.id ? null : segment);
  };

    const engagementTrends = [
    { month: 'Jan', dau: 45000, retention: 68, satisfaction: 7.2 },
    { month: 'Feb', dau: 48000, retention: 71, satisfaction: 7.4 },
    { month: 'Mar', dau: 52000, retention: 74, satisfaction: 7.6 },
    { month: 'Apr', dau: 55000, retention: 76, satisfaction: 7.8 },
    { month: 'May', dau: 58000, retention: 78, satisfaction: 8.0 },
    { month: 'Jun', dau: 61000, retention: 80, satisfaction: 8.2 }
  ];

  const incomeSegments = [
    { name: 'Low Income (<₹25K)', value: 35, color: '#FF6B6B' },
    { name: 'Middle Income (₹25K-₹75K)', value: 45, color: '#4ECDC4' },
    { name: 'High Income (>₹75K)', value: 20, color: '#45B7D1' }
  ];


  const audienceSegments = [
    {
      title: 'College Tech Enthusiasts',
      details: [
        { value: '18.2K', label: 'Users' },
        { value: '18-24', label: 'Age Range' },
        { value: '85%', label: 'Mobile First' },
        { value: '₹299', label: 'Avg. Spend' }
      ],
      description: 'High engagement with coding bootcamps, language learning, and skill development apps. Prime target for freemium conversion strategies.'
    },
    {
      title: 'Working Professional Learners',
      details: [
        { value: '24.7K', label: 'Users' },
        { value: '25-35', label: 'Age Range' },
        { value: '67%', label: 'Evening Usage' },
        { value: '₹899', label: 'Avg. Spend' }
      ],
      description: 'Focus on professional certifications, business skills, and career advancement. Highest paying segment with premium subscription preference.'
    },
    {
      title: 'Rural Digital Learners',
      details: [
        { value: '15.3K', label: 'Users' },
        { value: '16-28', label: 'Age Range' },
        { value: '45%', label: 'Low Bandwidth' },
        { value: '₹49', label: 'Avg. Spend' }
      ],
      description: 'Growing segment with basic smartphone usage. Focus on offline content, vernacular languages, and affordable micro-learning modules.'
    }
  ];


  return (
    <div className="space-y-6">
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      />
      

      {/* <SummaryStats data={filteredData} /> */}

      <VisualExplorer
        data={filteredData}
        onSegmentSelect={handleSegmentSelect}
        selectedSegment={selectedSegment}
      />

      {selectedSegment && (
        <SegmentDetailsModal
          segment={selectedSegment}
          onClose={() => setSelectedSegment(null)}
          onDownload={(data) => console.log('Downloaded:', data)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="dau" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeSegments}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {incomeSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Audience Segments Section */}
<div className="bg-white rounded-xl shadow-lg p-6 mt-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <span className="text-pink-500 text-xl">🎯</span>
      <h3 className="text-lg font-semibold text-gray-900">
        Key Audience Segments
      </h3>
    </div>
    <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
      <Download size={16} />
      Download Segment Report
    </button>
  </div>

  {/* Cards */}
  <div className="space-y-4">
    {audienceSegments.map((segment, idx) => (
      <div
        key={idx}
        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">
            {idx === 0 && "🎓"}
            {idx === 1 && "💼"}
            {idx === 2 && "🏡"}
          </span>
          <h4 className="font-semibold text-gray-900">{segment.title}</h4>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {segment.details.map((detail, i) => (
            <div
              key={i}
              className="bg-white rounded-md shadow p-2 text-center"
            >
              <div className="text-indigo-600 font-bold text-lg">
                {detail.value}
              </div>
              <div className="text-xs text-gray-500">{detail.label}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{segment.description}</p>
      </div>
    ))}
  </div>
</div>
 </div>
  );
};


export default SegmentExplorer

