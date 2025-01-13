import React from "react";

function SkeletonFeaturedeventscard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-48 flex flex-col items-center p-4">

      <div className="w-full h-32 bg-gray-300 rounded-md mb-3"></div>

     
      <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>

 
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}

export default SkeletonFeaturedeventscard;
