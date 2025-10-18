import { useState, useRef, useEffect } from "react";

export default function RecipeModal({ recipe, onClose }) {
  const [activeTab, setActiveTab] = useState("ingredients");
  const contentRef = useRef(null); // Ref to scrollable content

  if (!recipe) return null;

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Build ingredients array safely
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure || ""}`);
    }
  }

  // Scroll to top whenever tab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-20"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Recipe Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover rounded-t-xl"
        />

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 pb-20"
        >
          {activeTab === "ingredients" && (
            <ul className="list-disc list-inside">
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {activeTab === "instructions" && (
            <p className="whitespace-pre-line">{recipe.strInstructions}</p>
          )}

          {activeTab === "video" && (
            <>
              {recipe.strYoutube ? (
                <div className="aspect-video">
                  <iframe
                    src={getYoutubeEmbedUrl(recipe.strYoutube)}
                    title="Recipe Video"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                </div>
              ) : (
                <p className="text-gray-500">No video available for this recipe.</p>
              )}
            </>
          )}
        </div>

        {/* Fixed Bottom Pill Menu */}
        <div className="fixed bottom-4 left-0 w-full flex justify-center px-4 z-30">
          <div className="bg-white rounded-full shadow-lg flex gap-2 p-2">
            {["ingredients", "instructions", "video"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  activeTab === tab
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
