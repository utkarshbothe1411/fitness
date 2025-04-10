import React, { useState } from "react";
import { Link } from "react-router-dom";
import recipes from "./recipesData";

const RecipesPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "vegetarian" | "nonveg">("all");

  // Sort recipes by protein (highest first)
  const sortedRecipes = [...recipes].sort((a, b) => b.protein - a.protein);

  // Filter based on toggle selection
  const filteredRecipes = sortedRecipes.filter((recipe) => {
    if (filter === "vegetarian") return recipe.category === "vegetarian";
    if (filter === "nonveg") return recipe.category !== "vegetarian";
    return true; // Show all
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Maharashtrian High-Protein Recipes
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "all" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "vegetarian" 
              ? "bg-green-500 text-white" 
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
          }`}
          onClick={() => setFilter("vegetarian")}
        >
          Vegetarian
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === "nonveg" 
              ? "bg-red-500 text-white" 
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
          }`}
          onClick={() => setFilter("nonveg")}
        >
          Non-Vegetarian
        </button>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link 
            to={`/recipe/${recipe.id}`} 
            key={recipe.id} 
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full pb-[75%]"> {/* 4:3 aspect ratio */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            
            {/* Recipe content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold dark:text-white">{recipe.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {recipe.time} • {recipe.difficulty} • {recipe.servings} servings
              </p>
              
              <div className="flex justify-between items-center mt-3">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                  {recipe.protein}g protein
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  recipe.category === "vegetarian" 
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}>
                  {recipe.category}
                </span>
              </div>

              {/* Preview of first few ingredients */}
              <h4 className="font-bold mt-3 text-sm dark:text-white">Key Ingredients:</h4>
              <ul className="list-disc ml-5 text-sm line-clamp-2 dark:text-gray-300">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
                {recipe.ingredients.length > 3 && (
                  <li className="text-gray-500 dark:text-gray-400">
                    + {recipe.ingredients.length - 3} more
                  </li>
                )}
              </ul>

              <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors text-sm">
                View Full Recipe
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;