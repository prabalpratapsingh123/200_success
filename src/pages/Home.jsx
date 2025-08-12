
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SegmentExplorer from "./SegmentExplorer";
import Dashboard from "./Dashboard";


const Home = () => {
  const [activeTab, setActiveTab] = useState('explorer');

  const renderContent = () => {
    switch (activeTab) {
      case 'explorer': return <SegmentExplorer />;
      case 'dashboard': return <Dashboard />;
    //   case 'segments': return <div className="text-center py-12 text-gray-600">User Segments view coming soon...</div>;
    //   case 'geography': return <div className="text-center py-12 text-gray-600">Geography view coming soon...</div>;
    //   case 'behavior': return <div className="text-center py-12 text-gray-600">Behavior view coming soon...</div>;
    //   case 'monetization': return <div className="text-center py-12 text-gray-600">Monetization view coming soon...</div>;
      default: return <SegmentExplorer />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Home;