import React from "react";
import { useParams } from "react-router-dom";
import recipesData from "./recipesData";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipesData.find((r) => r.id === Number(id));

  if (!recipe) return <div className="text-center">Recipe Not Found!</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <p>{recipe.time} • {recipe.difficulty} • {recipe.servings} servings</p>
      <p><strong>Protein:</strong> {recipe.protein}g</p>

      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mt-4" />

      <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Instructions</h2>
      <ol className="list-decimal pl-6">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* YouTube Video */}
      {recipe.video && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Watch Recipe Video</h2>
          <iframe
            className="w-full h-64 mt-2 rounded-lg"
            src={recipe.video}
            title="Recipe Video"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
