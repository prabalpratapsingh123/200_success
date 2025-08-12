

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { Users, Smartphone, TrendingUp, Target, MapPin, DollarSign, Clock, Activity, Filter, Download, Eye, RefreshCw } from 'lucide-react';
import SegmentCard from './SegmentCard';
const VisualExplorer = ({ data, selectedSegment }) => {
  return (
    <div className="space-y-6">
      {/* Scatter Plot for Visual Exploration */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Segments Visualization</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="users" name="Users" />
            <YAxis dataKey="engagement" name="Engagement" />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload[0]) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                      <p className="font-semibold">{data.city}, {data.region}</p>
                      <p>Users: {data.users.toLocaleString()}</p>
                      <p>Engagement: {data.engagement}%</p>
                      <p>ARPU: ₹{data.revenue}K</p>
                      <p className="text-sm text-gray-600">{data.appType} • {data.usageLevel}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter dataKey="engagement" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.usageLevel === 'High' ? '#10B981' : 
                    entry.usageLevel === 'Medium' ? '#F59E0B' : '#EF4444'
                  }
                  stroke={selectedSegment?.id === entry.id ? '#1D4ED8' : 'none'}
                  strokeWidth={selectedSegment?.id === entry.id ? 3 : 0}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">High Usage</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Medium Usage</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Low Usage</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VisualExplorer