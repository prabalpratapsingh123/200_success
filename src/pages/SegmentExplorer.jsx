import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter,Legend } from 'recharts';
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


    const acquisitionData = [
    { name: 'Organic Search', value: 30.0, avg_retenetion: 42.51, color: '#6366f1' },
    { name: 'Google Ads', value: 25.5, avg_retenetion: 43.41, color: '#ef4444' },
    { name: 'Meta Ads', value: 20.3, avg_retenetion: 47.1, color: '#10b981' },
    { name: 'Referral', value: 9.65, avg_retenetion: 41.3, color: '#f59e0b' },
    { name: 'LinkedIn Ads', value: 9.74, avg_retenetion: 40.5, color: '#8b5cf6' },
    { name: 'YouTube Ads', value: 4.74, avg_retenetion: 50.1, color: '#06b6d4' }
  ];

  // Gender Distribution Data
  const genderData = [
    { name: 'Male', value: 51.9, color: '#6366f1' },
    { name: 'Female', value: 44.9, color: '#ef4444' },
    { name: 'Other', value: 3.2, color: '#10b981' }
  ];

    const renderLabel = (entry) => {
    return `${entry.value}%`;
  };


    const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const CustomPieTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { name, value ,avg_retenetion} = payload[0].payload;
    const users = Math.round(value * 100); // multiply by 100 and round

    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">Total Users: {users}</p>
        <p className="text-sm text-gray-600">Avg Retention: {avg_retenetion}%</p>
      </div>
    );
  }
  return null;
};


  const audienceSegments = [
    {
      title: 'College Tech Enthusiasts',
      details: [
        { value: '671', label: 'Users' },
        { value: '18-24', label: 'Age Range' },
        { value: '60%', label: 'Course Completion %' },
        { value: '₹485', label: 'Avg. Spend' }
      ],
      description: 'High engagement with coding bootcamps, language learning, and skill development apps. Prime target for freemium conversion strategies.'
    },
    {
      title: 'Working Professional Learners',
      details: [
        { value: '510', label: 'Users' },
        { value: '25-34', label: 'Age Range' },
        { value: '4.8%', label: 'Evening Usage' },
        { value: '₹839', label: 'Avg. Spend' }
      ],
      description: 'Focus on professional certifications, business skills, and career advancement. Highest paying segment with premium subscription preference.'
    },
    {
      title: 'Rural Digital Learners',
      details: [
        { value: '1.4K', label: 'Users' },
        { value: '16-24', label: 'Age Range' },
        { value: '6%', label: 'Low Bandwidth' },
        { value: '₹484', label: 'Avg. Spend' }
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
{/* 
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
      </div> */}
 <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* User Acquisition Source Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            User Acquisition Source Split
          </h2>
          
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={acquisitionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {acquisitionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
          
          <p className="text-sm text-gray-600 text-center mt-4 px-4">
            Look for channels with a large share but low performance elsewhere. 
            Small but high-performing slices = growth opportunity.
          </p>
        </div>

        {/* Gender Distribution Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Gender Distribution
          </h2>
          
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
          
          <p className="text-sm text-gray-600 text-center mt-4 px-4">
            If one gender dominates but product appeals to both, 
            re-target underrepresented group.
          </p>
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

