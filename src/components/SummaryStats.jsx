

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { Users, Smartphone, TrendingUp, Target, MapPin, DollarSign, Clock, Activity, Filter, Download, Eye, RefreshCw } from 'lucide-react';

const SummaryStats = ({ data }) => {
  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const avgEngagement = data.reduce((sum, item) => sum + item.engagement, 0) / data.length;
  const totalRevenue = data.reduce((sum, item) => sum + (item.users * item.revenue / 1000), 0);
  const segmentCount = data.length;

  const downloadFullReport = () => {
    const reportData = {
      summary: {
        totalSegments: segmentCount,
        totalUsers: totalUsers,
        averageEngagement: Math.round(avgEngagement),
        totalRevenue: Math.round(totalRevenue),
        generatedAt: new Date().toISOString()
      },
      segments: data.map(segment => ({
        id: segment.id,
        location: `${segment.city}, ${segment.region}`,
        demographics: {
          ageGroup: segment.ageGroup,
          tier: segment.tier
        },
        metrics: {
          users: segment.users,
          engagement: segment.engagement,
          revenue: segment.revenue,
          sessions: segment.sessions,
          time: segment.time
        },
        category: segment.appType,
        usageLevel: segment.usageLevel
      }))
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `complete_segments_report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtered Summary</h3>
        <button
          onClick={downloadFullReport}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Full Report
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{segmentCount}</p>
          <p className="text-sm text-gray-600">Segments</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{totalUsers.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{Math.round(avgEngagement)}%</p>
          <p className="text-sm text-gray-600">Avg Engagement</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">₹{Math.round(totalRevenue)}L</p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>
      </div>
    </div>
  );
};
 
export default SummaryStats