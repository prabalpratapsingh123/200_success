

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { Users, Smartphone, TrendingUp, Target, MapPin, DollarSign, Clock, Activity, Filter, Download, Eye, RefreshCw } from 'lucide-react';

const SegmentDetailsModal = ({ segment, onClose, onDownload }) => {
  if (!segment) return null;

  const handleDownload = () => {
    const reportData = {
      segment: segment.city + ', ' + segment.region,
      demographics: {
        ageGroup: segment.ageGroup,
        region: segment.region,
        tier: segment.tier
      },
      metrics: {
        totalUsers: segment.users,
        engagement: segment.engagement + '%',
        revenue: '₹' + segment.revenue + 'K',
        avgSessions: segment.sessions,
        avgTime: segment.time + ' mins'
      },
      appCategory: segment.appType,
      usageLevel: segment.usageLevel,
      generatedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `segment_report_${segment.city}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    onDownload?.(reportData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Segment Details</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{segment.city}, {segment.region}</h3>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                segment.tier === 'Tier 1' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {segment.tier}
              </span>
              <span className="text-sm text-gray-600">{segment.ageGroup} • {segment.appType}</span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-900">{segment.users.toLocaleString()}</p>
              <p className="text-sm text-blue-700">Total Users</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-900">{segment.engagement}%</p>
              <p className="text-sm text-green-700">Engagement</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-900">₹{segment.revenue}K</p>
              <p className="text-sm text-purple-700">ARPU</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-900">{segment.time}m</p>
              <p className="text-sm text-orange-700">Avg. Time</p>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Usage Patterns</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Sessions</span>
                  <span className="font-medium">{segment.sessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Duration</span>
                  <span className="font-medium">{Math.round(segment.time / segment.sessions)}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usage Level</span>
                  <span className={`font-medium ${
                    segment.usageLevel === 'High' ? 'text-green-600' : 
                    segment.usageLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {segment.usageLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Monetization Insights</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue per User</span>
                  <span className="font-medium">₹{segment.revenue}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-medium">₹{(segment.users * segment.revenue / 1000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Potential</span>
                  <span className="font-medium text-green-600">
                    {segment.engagement > 80 ? 'High' : segment.engagement > 60 ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Recommendations</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {segment.engagement > 80 && <li>• High engagement - Focus on premium feature upselling</li>}
              {segment.usageLevel === 'High' && <li>• Heavy users - Implement loyalty rewards program</li>}
              {segment.tier === 'Tier 1' && <li>• Tier 1 market - Premium pricing strategy viable</li>}
              {segment.appType === 'Gaming' && <li>• Gaming segment - In-app purchases and tournaments</li>}
              {segment.revenue < 3 && <li>• Low ARPU - Focus on engagement before monetization</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SegmentDetailsModal