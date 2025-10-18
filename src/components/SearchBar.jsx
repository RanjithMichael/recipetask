import { useEffect, useState } from "react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 400); // Debounce delay in ms

    return () => clearTimeout(debounce);
  }, [localQuery]);

  return (
    <div className="relative w-full sm:w-64">
  <input
    type="text"
    aria-label="Search recipes"
    placeholder="Search recipes..."
    value={localQuery}
    onChange={(e) => setLocalQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
  />
   </div>
 );
}
