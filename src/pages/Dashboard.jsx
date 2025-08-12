import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { Users, Smartphone, TrendingUp, Target, MapPin, DollarSign, Clock, Activity, Filter, Download, Eye, RefreshCw } from 'lucide-react';
import MetricCard from '../components/MetricCard';

const Dashboard = () => {
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Users}
          title="Total Users"
          value="170K"
          change={12}
          color="blue"
        />
        <MetricCard
          icon={TrendingUp}
          title="Avg. Engagement"
          value="76%"
          change={8}
          color="green"
        />
        <MetricCard
          icon={DollarSign}
          title="ARPU"
          value="₹3.2K"
          change={15}
          color="purple"
        />
        <MetricCard
          icon={Activity}
          title="Session Duration"
          value="8.5 min"
          change={-3}
          color="orange"
        />
      </div>

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
    </div>
  );
};

export default Dashboard