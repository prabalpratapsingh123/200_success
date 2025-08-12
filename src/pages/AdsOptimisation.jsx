import React, { useState, useEffect } from "react";
import Papa from "papaparse";
const AdsOptimisation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdPlatform, setSelectedAdPlatform] = useState("Google Ads");
  const [selectedCampaign, setSelectedCampaign] = useState("App Install Boost");


    useEffect(() => {
    loadCampaignData();
  }, [selectedCampaign]);
    const loadCampaignData = async () => {
    try {
      setLoading(true);
      

      const response = await fetch('/Users/dev/Documents/hackathon/my-app/src/data/ads_data.csv');
      
      if (!response.ok) {
        throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            setError('Error parsing CSV data');
            return;
          }
          // processCampaignData(results.data);
          setLoading(false);
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          setError('Failed to parse CSV data');
          setLoading(false);
        }
      });

    } catch (err) {
      console.error('Error loading campaign data:', err);
      setError('Failed to load campaign data');
      setLoading(false);
    }
  };



  
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
      metrics: { 
        users: "9,500", 
        conversion: "18%", 
        nps: "35", 
        retention7: "58%", 
        retention30: "42%", 
        retention90: "28%" 
      },
      roi: 2.8,
      cac: "₹245"
    },
    "Summer Sale 2025": {
      painPoints: ["High CPC", "Low mobile conversions", "Weak retargeting"],
      metrics: { 
        users: "12,000", 
        conversion: "22%", 
        nps: "40", 
        retention7: "65%", 
        retention30: "48%", 
        retention90: "31%" 
      },
      roi: 4.2,
      cac: "₹180"
    },
    "Brand Awareness": {
      painPoints: ["Low brand recall", "High bounce rate"],
      metrics: { 
        users: "8,200", 
        conversion: "15%", 
        nps: "32", 
        retention7: "52%", 
        retention30: "38%", 
        retention90: "25%" 
      },
      roi: 1.9,
      cac: "₹320"
    },
    "Diwali Offer": {
      painPoints: ["Seasonal traffic drop", "Poor post-festival retention"],
      metrics: { 
        users: "15,500", 
        conversion: "26%", 
        nps: "45", 
        retention7: "72%", 
        retention30: "55%", 
        retention90: "38%" 
      },
      roi: 5.6,
      cac: "₹150"
    },
    "New Feature Launch": {
      painPoints: ["Feature adoption is slow", "User education gaps"],
      metrics: { 
        users: "7,800", 
        conversion: "20%", 
        nps: "38", 
        retention7: "60%", 
        retention30: "44%", 
        retention90: "29%" 
      },
      roi: 3.1,
      cac: "₹210"
    },
    "Festive Deals": {
      painPoints: ["Deal fatigue", "Low repeat purchases"],
      metrics: { 
        users: "11,200", 
        conversion: "24%", 
        nps: "42", 
        retention7: "68%", 
        retention30: "51%", 
        retention90: "34%" 
      },
      roi: 4.5,
      cac: "₹165"
    },
    "B2B Outreach": {
      painPoints: ["Long sales cycles", "Low lead quality"],
      metrics: { 
        users: "3,200", 
        conversion: "12%", 
        nps: "38", 
        retention7: "45%", 
        retention30: "32%", 
        retention90: "22%" 
      },
      roi: 6.2,
      cac: "₹450"
    },
    "Hiring Campaign": {
      painPoints: ["High cost per application", "Low quality candidates"],
      metrics: { 
        users: "1,800", 
        conversion: "8%", 
        nps: "28", 
        retention7: "35%", 
        retention30: "25%", 
        retention90: "18%" 
      },
      roi: 1.3,
      cac: "₹680"
    },
    "Product Webinar": {
      painPoints: ["Low attendance rate", "Poor follow-up conversion"],
      metrics: { 
        users: "4,500", 
        conversion: "16%", 
        nps: "41", 
        retention7: "58%", 
        retention30: "42%", 
        retention90: "28%" 
      },
      roi: 3.8,
      cac: "₹280"
    },
    "Reels Engagement": {
      painPoints: ["Short attention span", "Low app downloads"],
      metrics: { 
        users: "18,500", 
        conversion: "14%", 
        nps: "35", 
        retention7: "48%", 
        retention30: "32%", 
        retention90: "19%" 
      },
      roi: 2.4,
      cac: "₹95"
    },
    "Story Clicks Boost": {
      painPoints: ["High CPC", "Low story completion rate"],
      metrics: { 
        users: "12,800", 
        conversion: "19%", 
        nps: "37", 
        retention7: "55%", 
        retention30: "38%", 
        retention90: "24%" 
      },
      roi: 3.4,
      cac: "₹125"
    },
    "Influencer Collab": {
      painPoints: ["Expensive partnerships", "Variable performance"],
      metrics: { 
        users: "22,000", 
        conversion: "28%", 
        nps: "48", 
        retention7: "75%", 
        retention30: "58%", 
        retention90: "42%" 
      },
      roi: 7.1,
      cac: "₹88"
    }
  };





  const selectedDetails = campaignDetails[selectedCampaign] || null;
   const allCampaigns = Object.entries(campaignDetails).map(([name, data]) => ({
    name,
    ...data
  }));

  const topROICampaigns = allCampaigns
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 5);

  const leastROICampaigns = allCampaigns
    .sort((a, b) => a.roi - b.roi)
    .slice(0, 5);

  return (
    <div className="p-4 space-y-6">
      {/* Title */}
      
      {/* <div> */}
        {/* <h1 className="text-2xl font-bold">Ads Optimisation</h1> */}
        {/* <p className="text-gray-500">Analyse and improve ad campaign performance</p> */}
      {/* </div> */}
      
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

            {selectedDetails && (
        <div className="flex gap-6">
          {/* Metrics Cards - 2 rows of 3 cards each */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white shadow rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm">Users</p>
                <p className="text-2xl font-bold text-orange-600">{selectedDetails.metrics.users}</p>
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
                <p className="text-gray-500 text-sm">Retention 7 Days</p>
                <p className="text-2xl font-bold text-green-600">{selectedDetails.metrics.retention7}</p>
              </div>
              <div className="bg-white shadow rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm">Retention 30 Days</p>
                <p className="text-2xl font-bold text-green-500">{selectedDetails.metrics.retention30}</p>
              </div>
              <div className="bg-white shadow rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm">Retention 90 Days</p>
                <p className="text-2xl font-bold text-green-400">{selectedDetails.metrics.retention90}</p>
              </div>
            </div>
          </div>
          
          {/* Pain Points Card */}
          <div className="w-80">
            <div className="bg-white rounded-xl shadow p-4 h-full">
              <h2 className="text-lg font-semibold mb-4">Pain Points</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {selectedDetails.painPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}


  <div className="grid grid-cols-2 gap-6">
        {/* Top 5 ROI Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-green-600">Top 5 ROI Campaigns</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Campaign</th>
                  <th className="text-left py-2">Retention 7D</th>
                  <th className="text-left py-2">Conversion</th>
                  <th className="text-left py-2">NPS</th>
                  <th className="text-left py-2">CAC</th>
                </tr>
              </thead>
              <tbody>
                {topROICampaigns.map((campaign, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 font-medium">{campaign.name}</td>
                    <td className="py-2 text-green-600">{campaign.metrics.retention7}</td>
                    <td className="py-2 text-blue-600">{campaign.metrics.conversion}</td>
                    <td className="py-2 text-purple-600">{campaign.metrics.nps}</td>
                    <td className="py-2 text-orange-600">{campaign.cac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Least 5 ROI Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-red-600">Least 5 ROI Campaigns</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Campaign</th>
                  <th className="text-left py-2">Retention 7D</th>
                  <th className="text-left py-2">Conversion</th>
                  <th className="text-left py-2">NPS</th>
                  <th className="text-left py-2">CAC</th>
                </tr>
              </thead>
              <tbody>
                {leastROICampaigns.map((campaign, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 font-medium">{campaign.name}</td>
                    <td className="py-2 text-green-600">{campaign.metrics.retention7}</td>
                    <td className="py-2 text-blue-600">{campaign.metrics.conversion}</td>
                    <td className="py-2 text-purple-600">{campaign.metrics.nps}</td>
                    <td className="py-2 text-orange-600">{campaign.cac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>      
  
    </div>
  );
};

export default AdsOptimisation;