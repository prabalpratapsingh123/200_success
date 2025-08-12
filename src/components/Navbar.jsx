import {User , LogIn } from 'lucide-react' ;

const Navbar = ({ activeTab, isLoggedIn = false, user = null, onLogin, onProfile }) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'explorer': return 'Segment Explorer';
      case 'dashboard': return 'Dashboard Overview';
      case 'segments': return 'User Segments Analysis';
      case 'geography': return 'Geographic Distribution';
      case 'behavior': return 'User Behavior Patterns';
      case 'monetization': return 'Monetization Insights';
      case 'adOptimisaion' : return 'Ads Optimization'
      default: return 'Segment Explorer';
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{getTabTitle()}</h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time insights of user trends in the Indian market
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <button
              onClick={onProfile}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <User size={20} />
              <span className="text-sm font-medium">
                {user?.name || 'Profile'}
              </span>
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-400 rounded-lg transition-colors duration-200"
            >
              <LogIn size={20} />
              <span className="text-sm font-medium">LOGIN</span>
            </button>
          )}
        </div>
      </div>
    </div>

//   return (
//     <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//       <h2 className="text-xl font-semibold text-gray-900">{getTabTitle()}</h2>
//       <p className="text-sm text-gray-600 mt-1">
//         Real-time insights of user trends in the Indian market
//       </p>
//     </div>

    
  );
};


export default Navbar