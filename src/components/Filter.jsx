export default function Filter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-full sm:w-48">
      <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
        Filter by Category
      </label>
      <select
        id="category-select"
        aria-label="Filter by category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.idCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
}
