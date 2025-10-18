import React from 'react';

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getYoutubeEmbedUrl(recipe.strYoutube);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-y-auto max-h-[90vh] animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="recipe-title" className="text-xl font-bold text-gray-800">
            {recipe.strMeal}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
          >
            ✕
          </button>
        </div>

        {/* Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover"
        />

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-600">
              {Array.from({ length: 20 }, (_, i) => {
                const ing = recipe[`strIngredient${i + 1}`];
                const meas = recipe[`strMeasure${i + 1}`];
                return ing ? <li key={i}>{`${ing} - ${meas}`}</li> : null;
              })}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Instructions</h3>
            <p className="text-gray-800 whitespace-pre-line">{recipe.strInstructions}</p>
          </div>

          {/* Video */}
          {embedUrl && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Video Tutorial</h3>
              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  title="Recipe Video"
                  allowFullScreen
                  className="w-full h-64 rounded"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}