
import React, { useState, useMemo } from 'react';
import { userData } from '../data/data';
import FilterPanel from '../components/FilterPanel';
import SummaryStats from '../components/SummaryStats';
import VisualExplorer from '../components/VisualExplorer';
import SegmentDetailsModal from '../components/SegmentDetailsModal';

const SegmentExplorer = () => {
  const [filters, setFilters] = useState({
    region: 'All',
    ageGroup: 'All',
    appType: 'All',
    usageLevel: 'All',
    tier: 'All'
  });
  
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const filteredData = useMemo(() => {
    return userData.filter(item => {
      return (filters.region === 'All' || item.region === filters.region) &&
             (filters.ageGroup === 'All' || item.ageGroup === filters.ageGroup) &&
             (filters.appType === 'All' || item.appType === filters.appType) &&
             (filters.usageLevel === 'All' || item.usageLevel === filters.usageLevel) &&
             (filters.tier === 'All' || item.tier === filters.tier);
    });
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setSelectedSegment(null); 
  };

  const resetFilters = () => {
    setFilters({
      region: 'All',
      ageGroup: 'All',
      appType: 'All',
      usageLevel: 'All',
      tier: 'All'
    });
    setSelectedSegment(null);
  };

  const handleSegmentSelect = (segment) => {
    setSelectedSegment(selectedSegment?.id === segment.id ? null : segment);
  };



  return (
    <div className="space-y-6">
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
        isOpen={filtersOpen}
        onToggle={() => setFiltersOpen(!filtersOpen)}
      />
      

      <SummaryStats data={filteredData} />

      <VisualExplorer
        data={filteredData}
        onSegmentSelect={handleSegmentSelect}
        selectedSegment={selectedSegment}
      />

      {/* {selectedSegment && (
        <SegmentDetailsModal
          segment={selectedSegment}
          onClose={() => setSelectedSegment(null)}
          onDownload={(data) => console.log('Downloaded:', data)}
        />
      )} */}
    </div>
  );
};


export default SegmentExplorer


// const SegmentExplorer = () => {
//   return (
//     <div className="text-center py-12 text-gray-600">
//       Segment Explorer view coming soon...
//     </div>
//   );
// };

// export default SegmentExplorer