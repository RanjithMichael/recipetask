export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.strMeal}</h2>
        <p className="text-sm text-gray-500 mb-2">Category: {recipe.strCategory}</p>
        <p className="text-sm text-gray-500 mb-4">Area: {recipe.strArea}</p>
        <p className="text-gray-700 whitespace-pre-line">{recipe.strInstructions}</p>
      </div>
    </div>
  );
}