import React from "react";

export default function OvercastClouds() {
  return (
    <div className="fixed inset-0 -z-10">
      
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" // overcast clouds photo
        alt="Overcast sky"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gray-700/40" />

      <div className="absolute top-10 left-1/4 w-48 h-24 bg-gray-400 rounded-full opacity-50 animate-cloud-slow" />
      <div className="absolute top-20 left-1/2 w-64 h-32 bg-gray-500 rounded-full opacity-60 animate-cloud-slow delay-2000" />
      <div className="absolute top-5 right-1/4 w-56 h-28 bg-gray-400 rounded-full opacity-50 animate-cloud-slow delay-1000" />

    </div>
  );
}
