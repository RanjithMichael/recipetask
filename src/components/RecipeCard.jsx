export default function RecipeCard({ recipe, onFavoriteToggle, isFavorite, onClick }) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      role="button"
      tabIndex={0}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
    >
      {/* 🖼️ Recipe Image */}
      <div className="overflow-hidden relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 text-2xl transition-transform duration-300 ${
            isFavorite
              ? "text-red-500 scale-110"
              : "text-white hover:scale-125 drop-shadow-md"
          }`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* 📋 Recipe Info */}
      <div className="p-4 flex flex-col justify-between min-h-[110px]">
        <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
          {recipe.strMeal}
        </h2>

        <div className="flex justify-between items-center mt-2">
          <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full">
            {recipe.strCategory}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle();
            }}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300"
          >
            {isFavorite ? "Remove ❤️" : "Add 🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}
