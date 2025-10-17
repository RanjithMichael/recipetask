import { useEffect, useState } from "react";
import {
  fetchAllMeals,
  searchMealsByName,
  fetchCategories,
} from "../api/mealApi";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import RecipeModal from "../components/RecipeModal";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchAllMeals().then(setRecipes);
    fetchCategories().then(setCategories);

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (searchQuery) {
      searchMealsByName(searchQuery).then((data) => setRecipes(data || []));
    } else {
      fetchAllMeals().then(setRecipes);
    }
  }, [searchQuery]);

  const filteredRecipes = !showFavorites && selectedCategory
    ? recipes.filter((r) => r.strCategory === selectedCategory)
    : recipes;

  const displayedRecipes = showFavorites ? favorites : filteredRecipes;

  function handleFavoriteToggle(recipe) {
    setFavorites((prev) => {
      const exists = prev.some((r) => r.idMeal === recipe.idMeal);
      return exists
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prev, recipe];
    });
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? "Show All Recipes" : "Show Favorites"}
        </button>
      </div>

      {displayedRecipes.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onFavoriteToggle={() => handleFavoriteToggle(recipe)}
              isFavorite={favorites.some((r) => r.idMeal === recipe.idMeal)}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}