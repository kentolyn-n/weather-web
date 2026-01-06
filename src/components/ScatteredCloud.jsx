import React from "react";
export default function ScatteredClouds({ description }) {
  return (
    <div className="fixed inset-0 -z-10">
      <img
        src="https://images.unsplash.com/photo-1502082553048-f009c37129b9" 
        alt="Scattered clouds"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gray-200/20" />

      <div className="absolute top-16 left-1/4 w-40 h-28 bg-gray-300 rounded-xl blur-xl animate-cloud-slow" />
      <div className="absolute top-36 right-1/3 w-48 h-32 bg-gray-300 rounded-xl blur-xl animate-cloud-slow delay-1500" />

      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-gray-800 text-xl font-semibold">
        {description}
      </div>
    </div>
  );
}