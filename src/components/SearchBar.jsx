import React from "react";
export default function SearchBar({ onSearch, onChange, value }) {
  
  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search city..."
        className="w-full p-2 rounded-lg glass"
      />

      <button
        onClick={onSearch}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
      >
        🔍
      </button>
    </div>
  );
}
