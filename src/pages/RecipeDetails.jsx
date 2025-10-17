import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMealById } from "../api/mealApi";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMealById(id).then((data) => setRecipe(data));

    // Check if this recipe is already in favorites
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((r) => r.idMeal === id));
  }, [id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      const updated = favorites.filter((r) => r.idMeal !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full max-w-lg rounded mb-4"/>
      <p className="mb-2"><strong>Category:</strong> {recipe.strCategory}</p>
      <p className="mb-4"><strong>Instructions:</strong> {recipe.strInstructions}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      <ul className="list-disc list-inside mb-4">
        {ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
      </ul>

      {recipe.strYoutube && (
        <a href={recipe.strYoutube} target="_blank" className="text-blue-500 mb-4 block">
          Watch Video
        </a>
      )}

      <button
        onClick={handleFavorite}
        className={`px-4 py-2 rounded ${
          isFavorite ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
