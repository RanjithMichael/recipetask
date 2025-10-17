import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, onFavoriteToggle, isFavorite, onClick }) {
  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{recipe.strMeal}</h2>
          <span className="inline-block mt-1 px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
            {recipe.strCategory}
          </span>
        </div>
        <button
          className="text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}