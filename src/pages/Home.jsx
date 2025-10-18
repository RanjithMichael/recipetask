import { useEffect, useState } from "react";
import {
  fetchAllMeals,
  searchMealsByName,
  fetchCategories,
  fetchMealById,
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

  // 🧭 Initial data fetch
  useEffect(() => {
    fetchAllMeals().then(setRecipes);
    fetchCategories().then(setCategories);

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 💾 Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🔍 Search functionality
  useEffect(() => {
    if (searchQuery) {
      searchMealsByName(searchQuery).then((data) => setRecipes(data || []));
    } else {
      fetchAllMeals().then(setRecipes);
    }
  }, [searchQuery]);

  // 🍽️ Filter logic
  const filteredRecipes =
    !showFavorites && selectedCategory
      ? recipes.filter((r) => r.strCategory === selectedCategory)
      : recipes;

  const displayedRecipes = showFavorites ? favorites : filteredRecipes;

  // ⭐ Handle favorite toggle
  function handleFavoriteToggle(recipe) {
    setFavorites((prev) => {
      const exists = prev.some((r) => r.idMeal === recipe.idMeal);
      return exists
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prev, recipe];
    });
  }

  // 📖 Open modal
  async function handleCardClick(id) {
    const fullRecipe = await fetchMealById(id);
    if (fullRecipe) {
      setSelectedRecipe(fullRecipe);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-indigo-100">
      {/* 🌟 Header Section */}
      <header className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 drop-shadow-sm">
          🍽️ Explore Delicious Recipes
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Discover new dishes, save your favorites, and get inspired to cook every day!
        </p>
      </header>

      {/* 🔍 Controls Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md border border-indigo-100">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <button
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm ${
              showFavorites
                ? "bg-gray-600 text-white hover:bg-gray-700"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
            onClick={() => setShowFavorites((prev) => !prev)}
          >
            {showFavorites ? "Show All Recipes" : "Show Favorites"}
          </button>
        </div>
      </section>

      {/* 🧁 Recipe Grid Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {displayedRecipes.length === 0 ? (
          <p className="text-center text-gray-500 mt-16 text-lg">
            No recipes found. Try another search!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onFavoriteToggle={() => handleFavoriteToggle(recipe)}
                isFavorite={favorites.some((r) => r.idMeal === recipe.idMeal)}
                onClick={() => handleCardClick(recipe.idMeal)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 🍲 Modal Overlay */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        </div>
      )}
    </div>
  );
}
