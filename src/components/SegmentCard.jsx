const SegmentCard = ({ segment, onClick, isSelected }) => (
  <div 
    className={`bg-white rounded-lg shadow-md border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => onClick(segment)}
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{segment.city}, {segment.region}</h3>

      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Users</p>
          <p className="text-xl font-bold text-gray-900">{segment.users.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Engagement</p>
          <p className="text-xl font-bold text-blue-600">{segment.engagement}%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="text-center">
          <p className="text-gray-600">Age</p>
          <p className="font-semibold">{segment.ageGroup}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Usage</p>
          <p className={`font-semibold ${
            segment.usageLevel === 'High' ? 'text-green-600' : 
            segment.usageLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {segment.usageLevel}
          </p>
        </div>
      </div>
    </div>
  </div>
);


export default SegmentCard