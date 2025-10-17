export default function RecipeCard({ recipe, onFavoriteToggle, isFavorite, onClick }) {
  return (
    <div
      className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden cursor-pointer w-full max-w-sm group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-gray-900 leading-tight">
            {recipe.strMeal}
          </h2>
          <span className="mt-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full w-fit">
            {recipe.strCategory}
          </span>
        </div>

        <button
          className="text-xl focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}