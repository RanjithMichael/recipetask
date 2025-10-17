export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search recipes..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border p-2 rounded w-full mb-4"
    />
  );
}
