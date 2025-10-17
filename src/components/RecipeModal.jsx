export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  // Extract YouTube video ID from the URL
  const getYoutubeEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getYoutubeEmbedUrl(recipe.strYoutube);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full overflow-y-auto max-h-[80vh] shadow-xl">
        <button
          className="text-red-500 float-right text-xl font-bold"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-2">{recipe.strMeal}</h2>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full rounded mb-4"
        />

        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {Array.from({ length: 20 }, (_, i) => {
            const ing = recipe[`strIngredient${i + 1}`];
            const meas = recipe[`strMeasure${i + 1}`];
            return ing ? <li key={i}>{`${ing} - ${meas}`}</li> : null;
          })}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
        <p className="text-gray-800 whitespace-pre-line">{recipe.strInstructions}</p>

        {embedUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Video Tutorial</h3>
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
  );
}