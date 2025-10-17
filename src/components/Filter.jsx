export default function Filter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border p-2 rounded mb-4"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat.idCategory} value={cat.strCategory}>
          {cat.strCategory}
        </option>
      ))}
    </select>
  );
}
