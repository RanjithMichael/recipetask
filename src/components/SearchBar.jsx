import { useEffect, useState } from "react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 400); // Debounce delay
    return () => clearTimeout(debounce);
  }, [localQuery]);

  return (
    <div className="relative w-full sm:w-72 md:w-80">
      {/* 🔍 Search Icon */}
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg pointer-events-none">
        🔍
      </span>

      {/* ✨ Input Field */}
      <input
        type="text"
        aria-label="Search recipes"
        placeholder="Search recipes..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent 
                   transition-all duration-200 placeholder-gray-400 text-gray-800"
      />

      {/* Clear Button (optional) */}
      {localQuery && (
        <button
          onClick={() => setLocalQuery("")}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Clear search"
        >
          ✖
        </button>
      )}
    </div>
  );
}

