const SkeletonCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden max-w-[92%] mx-auto animate-pulse">
      <div className="w-full h-64 bg-gray-700" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  )
}

export default SkeletonCard
