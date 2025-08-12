

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { Users, Smartphone, TrendingUp, Target, MapPin, DollarSign, Clock, Activity, Filter, Download, Eye, RefreshCw } from 'lucide-react';

const filterOptions = {
  regions: ['All', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'West Bengal', 'Delhi', 'Rajasthan', 'Haryana'],
  ageGroups: ['All', '18-25', '26-35', '36-45', '46+'],
  usageLevels: ['All', 'Low', 'Medium', 'High']
};


const FilterPanel = ({ filters, onFilterChange, onReset, isOpen, onToggle }) => (
  
  <div className={`bg-white border border-gray-200 rounded-lg transition-all duration-300 ${isOpen ? 'p-6' : 'p-4'}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Filter className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="font-semibold text-gray-900">Filters</h3>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          <RefreshCw className="h-4 w-4 inline mr-1" />
          Reset
        </button>
        <button
          onClick={onToggle}
          className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
        >
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
    </div>

    {isOpen && (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
          <select
            value={filters.region}
            onChange={(e) => onFilterChange('region', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filterOptions.regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
          <select
            value={filters.ageGroup}
            onChange={(e) => onFilterChange('ageGroup', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filterOptions.ageGroups.map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>



        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Usage Level</label>
          <select
            value={filters.usageLevel}
            onChange={(e) => onFilterChange('usageLevel', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filterOptions.usageLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>


      </div>
    )}
  </div>
);

export default FilterPanel;