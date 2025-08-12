

const Navbar = ({ activeTab }) => {
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
      <h2 className="text-xl font-semibold text-gray-900">{getTabTitle()}</h2>
      <p className="text-sm text-gray-600 mt-1">
        Real-time insights of user trends in the Indian market
      </p>
    </div>
  );
};


export default Navbar