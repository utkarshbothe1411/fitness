import React, { useState } from "react";

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const CalorieTracker: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealInput, setMealInput] = useState<Meal>({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  const addMeal = () => {
    if (mealInput.name.trim() !== "") {
      setMeals([...meals, mealInput]);
      setMealInput({ name: "", calories: 0, protein: 0, carbs: 0, fats: 0 });
    }
  };

  const total = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700 dark:text-white">
        Calorie & Macros Tracker
      </h2>

      {/* Meal Input Form */}
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Meal Name"
          value={mealInput.name}
          onChange={(e) => setMealInput({ ...mealInput, name: e.target.value })}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
        />
        <div className="grid grid-cols-4 gap-2">
          <input
            type="number"
            placeholder="Calories"
            value={mealInput.calories}
            onChange={(e) => setMealInput({ ...mealInput, calories: +e.target.value })}
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Protein (g)"
            value={mealInput.protein}
            onChange={(e) => setMealInput({ ...mealInput, protein: +e.target.value })}
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Carbs (g)"
            value={mealInput.carbs}
            onChange={(e) => setMealInput({ ...mealInput, carbs: +e.target.value })}
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <input
            type="number"
            placeholder="Fats (g)"
            value={mealInput.fats}
            onChange={(e) => setMealInput({ ...mealInput, fats: +e.target.value })}
            className="p-2 border rounded dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          onClick={addMeal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
        >
          Add Meal
        </button>
      </div>

      {/* Meals List */}
      {meals.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-white">Today's Meals</h3>
          <table className="w-full mt-2 border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                <th className="p-2 border">Meal</th>
                <th className="p-2 border">Calories</th>
                <th className="p-2 border">Protein</th>
                <th className="p-2 border">Carbs</th>
                <th className="p-2 border">Fats</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, index) => (
                <tr key={index} className="text-center text-gray-700 dark:text-white">
                  <td className="p-2 border">{meal.name}</td>
                  <td className="p-2 border">{meal.calories}</td>
                  <td className="p-2 border">{meal.protein}g</td>
                  <td className="p-2 border">{meal.carbs}g</td>
                  <td className="p-2 border">{meal.fats}g</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-300 dark:bg-gray-800 font-bold">
                <td className="p-2 border">Total</td>
                <td className="p-2 border">{total.calories}</td>
                <td className="p-2 border">{total.protein}g</td>
                <td className="p-2 border">{total.carbs}g</td>
                <td className="p-2 border">{total.fats}g</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalorieTracker;
