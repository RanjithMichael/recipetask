export default function Filter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-full sm:max-w-xs">
      {/* Label */}
      <label
        htmlFor="category-select"
        className="block text-sm font-semibold text-gray-700 mb-1 tracking-wide"
      >
        🍳 Filter by Category
      </label>

      {/* Dropdown */}
      <div className="relative">
        <select
          id="category-select"
          aria-label="Filter by category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm
                     text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                     transition-all duration-200 cursor-pointer hover:border-indigo-300"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>

        {/* Down Arrow Icon (emoji or Font Awesome ready) */}
        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 text-sm">
          ⬇️
        </span>
      </div>
    </div>
  );
}

