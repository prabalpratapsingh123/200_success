import { Users, Smartphone, TrendingUp, Target, MapPin, DollarSign, Clock, Activity, Filter, Download, Eye, RefreshCw ,Megaphone} from 'lucide-react';



const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'explorer', label: 'Segment Explorer', icon: Eye },
    // { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'adOptimisaion', label: 'Ads Optimization', icon: Megaphone },
    // { id: 'segments', label: 'User Segments', icon: Users },
    // { id: 'geography', label: 'Geography', icon: MapPin },
    // { id: 'behavior', label: 'Behavior', icon: Smartphone },
    // { id: 'monetization', label: 'Monetization', icon: DollarSign }
  ];

  return (
    <div className="bg-white shadow-lg h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">M.O.R.D</h1>
        <p className="text-sm text-gray-600 mt-1">Marketing Optimization & Retention Dashboard</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar