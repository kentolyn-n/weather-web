import React from "react";

export default function BrokenClouds({ description }) {
  return (
    <div className="fixed inset-0 -z-10">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
        alt="Broken clouds"
        className="w-full h-full object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-gray-400/20" />

      {/* clouds */}
      <div className="absolute top-20 left-1/3 w-48 h-32 bg-gray-300 rounded-xl blur-2xl animate-cloud-slow" />
      <div className="absolute top-40 right-1/4 w-64 h-40 bg-gray-300 rounded-xl blur-2xl animate-cloud-slow delay-2000" />

      {/* description */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-gray-800 text-xl font-semibold">
        {description}
      </div>
    </div>
  );
}
