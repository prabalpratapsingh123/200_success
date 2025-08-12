import React, { useState } from "react";

const AdsOptimisation = () => {
  const [selectedAdPlatform, setSelectedAdPlatform] = useState("Google Ads");
  const [selectedCampaign, setSelectedCampaign] = useState("App Install Boost");
  
  const adPlatforms = ["Google Ads", "Meta Ads", "LinkedIn Ads", "Instagram Ads"];
  
  const campaigns = {
    "Google Ads": ["Summer Sale 2025", "App Install Boost", "Brand Awareness"],
    "Meta Ads": ["Diwali Offer", "New Feature Launch", "Festive Deals"],
    "LinkedIn Ads": ["B2B Outreach", "Hiring Campaign", "Product Webinar"],
    "Instagram Ads": ["Reels Engagement", "Story Clicks Boost", "Influencer Collab"]
  };
  
  const campaignDetails = {
    "App Install Boost": {
      painPoints: ["Low install-to-signup ratio", "Poor ad creatives"],
      metrics: { retention: "58%", conversion: "18%", nps: "35", users: "9,500" }
    },
    "Summer Sale 2025": {
      painPoints: ["High CPC", "Low mobile conversions", "Weak retargeting"],
      metrics: { retention: "65%", conversion: "22%", nps: "40", users: "12,000" }
    },
    // Add similar entries for other campaigns...
  };
  
  const selectedDetails = campaignDetails[selectedCampaign] || null;

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div>
        {/* <h1 className="text-2xl font-bold">Ads Optimisation</h1> */}
        <p className="text-gray-500">Analyse and improve ad campaign performance</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 flex gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ad Platform</label>
          <select
            className="border rounded-md px-3 py-2"
            value={selectedAdPlatform}
            onChange={(e) => {
              setSelectedAdPlatform(e.target.value);
              setSelectedCampaign("");
            }}
          >
            {adPlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Campaign</label>
          <select
            className="border rounded-md px-3 py-2"
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            <option value="">Select Campaign</option>
            {campaigns[selectedAdPlatform].map((campaign) => (
              <option key={campaign} value={campaign}>{campaign}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Pain Points */}
      {selectedDetails && (
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Pain Points</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {selectedDetails.painPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Metrics Cards */}
      {selectedDetails && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Retention</p>
            <p className="text-2xl font-bold text-green-600">{selectedDetails.metrics.retention}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Conversion</p>
            <p className="text-2xl font-bold text-blue-600">{selectedDetails.metrics.conversion}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">NPS</p>
            <p className="text-2xl font-bold text-purple-600">{selectedDetails.metrics.nps}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-gray-500 text-sm">Users</p>
            <p className="text-2xl font-bold text-orange-600">{selectedDetails.metrics.users}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsOptimisation;