import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

// Fetch all meals (default search)
export const fetchAllMeals = async () => {
  try {
    const res = await axios.get(`${BASE_URL}search.php?s=`);
    return res.data.meals || [];
  } catch (error) {
    console.error("Error fetching all meals:", error);
    return [];
  }
};

// Fetch full meal details by ID
export const fetchMealById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
    return res.data.meals ? res.data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching meal by ID (${id}):`, error);
    return null;
  }
};

// Search meals by name
export const searchMealsByName = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}search.php?s=${query}`);
    return res.data.meals || [];
  } catch (error) {
    console.error(`Error searching meals by name (${query}):`, error);
    return [];
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}categories.php`);
    return res.data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
