import React, { useState } from "react";
import { Link } from "react-router-dom";
import recipesData from "./recipesData";

const RecipeList: React.FC = () => {
  const [vegOnly, setVegOnly] = useState(false); // Toggle for veg/non-veg

  const filteredRecipes = recipesData.filter((recipe) =>
    vegOnly ? recipe.category === "vegetarian" : recipe.category === "meat"
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Maharashtrian High-Protein Recipes</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setVegOnly(!vegOnly)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {vegOnly ? "Show Non-Veg" : "Show Veg"}
        </button>
      </div>

      <div className="grid gap-4">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="block p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p>{recipe.time} • {recipe.difficulty} • {recipe.servings} servings</p>
            <p><strong>Protein:</strong> {recipe.protein}g</p>
            <p><strong>Category:</strong> {recipe.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
