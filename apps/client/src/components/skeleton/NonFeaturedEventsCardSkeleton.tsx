import React from "react";

function SkeletonNonfeaturedeventcard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg flex flex-row p-3 shadow-md w-full h-[80px]">
      
      <div className="w-20 h-full bg-gray-300 rounded-md"></div>


      <div className="flex flex-col flex-grow justify-center ml-4">
        <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonNonfeaturedeventcard;
