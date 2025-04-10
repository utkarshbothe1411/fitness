import React, { useState } from "react";

const WorkoutPlan: React.FC = () => {
  const [goal, setGoal] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [plan, setPlan] = useState<string[]>([]);

  const generateWorkoutPlan = () => {
    if (!goal || !level) {
      setPlan(["Please select a fitness goal and experience level."]);
      return;
    }

    const plans: Record<string, Record<string, string[]>> = {
      "Weight Loss": {
        Beginner: [
          "🏋️‍♀️ Monday: Full-Body Circuit (3 rounds)",
          " - 15 Bodyweight Squats",
          " - 10 Push-ups (knees if needed)",
          " - 30s Plank",
          " - 10 Step-ups per leg",
          " - 15 Glute Bridges",
          "🏃‍♀️ Wednesday: 30 min Brisk Walking + 5 min Stretching",
          "🧘‍♀️ Friday: Yoga Flow (30 min) + Core Exercises",
          "🚶‍♀️ Weekend: Active Recovery - 45 min Walk"
        ],
        Intermediate: [
          "🔥 Monday: HIIT Workout (30 min)",
          " - 40s Work / 20s Rest x 8 rounds",
          " - Jump Squats, Burpees, Mountain Climbers, High Knees",
          "🏋️‍♂️ Wednesday: Strength Training",
          " - Dumbbell Squats 3x12",
          " - Push-ups 3x10-12",
          " - Bent-over Rows 3x10",
          "🚴‍♂️ Friday: 45 min Cycling + Core Work",
          "🧘‍♂️ Sunday: Mobility & Recovery Session"
        ],
        Advanced: [
          "💥 Monday: Tabata Training (4 exercises, 8 rounds each)",
          " - Kettlebell Swings, Box Jumps, Battle Ropes, Sprints",
          "🏋️‍♀️ Tuesday: Lower Body Power",
          " - Barbell Squats 4x6",
          " - Deadlifts 4x6",
          " - Lunges 3x10 per leg",
          "🔥 Thursday: Metabolic Conditioning",
          " - EMOM 20 min: 5 Power Cleans, 10 Push Press, 15 Air Squats",
          "🏊‍♀️ Saturday: 60 min Swimming or Cycling",
          "🧘‍♂️ Sunday: Yoga for Recovery"
        ]
      },
      "Muscle Gain": {
        Beginner: [
          "💪 Monday: Full Body Workout A",
          " - Squats 3x8-10",
          " - Bench Press 3x8-10",
          " - Rows 3x8-10",
          " - Shoulder Press 3x8-10",
          " - Plank 3x30s",
          "🏋️‍♀️ Wednesday: Full Body Workout B",
          " - Deadlifts 3x8-10",
          " - Lat Pulldowns 3x8-10",
          " - Dumbbell Press 3x8-10",
          " - Leg Curls 3x10-12",
          " - Biceps/Triceps 2x12 each",
          "🏋️‍♂️ Friday: Repeat Workout A",
          "🚶‍♂️ Weekend: Active Recovery"
        ],
        Intermediate: [
          "🔥 Monday: Upper Body (Push Focus)",
          " - Bench Press 4x6-8",
          " - Incline Dumbbell Press 3x8-10",
          " - Shoulder Press 3x8-10",
          " - Triceps Dips 3x10-12",
          "💪 Wednesday: Lower Body",
          " - Squats 4x6-8",
          " - Romanian Deadlifts 3x8-10",
          " - Leg Press 3x10-12",
          " - Calf Raises 4x12-15",
          "🏋️‍♀️ Friday: Upper Body (Pull Focus)",
          " - Pull-ups 4x6-8",
          " - Bent-over Rows 3x8-10",
          " - Face Pulls 3x12-15",
          " - Biceps Curls 3x10-12",
          "🧘‍♂️ Sunday: Mobility Work"
        ],
        Advanced: [
          "🏋️‍♂️ Monday: Chest & Triceps (Heavy)",
          " - Flat Bench 5x5",
          " - Incline Bench 4x6-8",
          " - Weighted Dips 3x8-10",
          " - Skull Crushers 3x10-12",
          "💪 Tuesday: Back & Biceps",
          " - Deadlifts 5x5",
          " - Weighted Pull-ups 4x6-8",
          " - Barbell Rows 4x6-8",
          " - Biceps Work 4x8-12",
          "🔥 Thursday: Legs (Power)",
          " - Back Squats 5x5",
          " - Front Squats 4x6-8",
          " - Bulgarian Split Squats 3x8 per leg",
          " - Hamstring Curls 4x10-12",
          "🏋️‍♀️ Friday: Shoulders & Arms",
          " - OHP 5x5",
          " - Lateral Raises 4x10-12",
          " - Rear Delt Flyes 4x12-15",
          " - Arm Supersets",
          "🧘‍♀️ Sunday: Active Recovery + Mobility"
        ]
      },
      "Endurance Training": {
        Beginner: [
          "🏃‍♀️ Monday: 20 min Jog + Bodyweight Circuit",
          " - 10 Push-ups",
          " - 15 Air Squats",
          " - 10 Lunges per leg",
          " - 30s Plank",
          "🚴‍♀️ Wednesday: 30 min Cycling + Core",
          "🏊‍♂️ Friday: 20 min Swim + Stretching",
          "🧗‍♀️ Weekend: 45 min Hike or Walk"
        ],
        Intermediate: [
          "🔥 Monday: Interval Training",
          " - 5 min Warm-up",
          " - 1 min Sprint / 2 min Walk x 8",
          " - 5 min Cool-down",
          "🏋️‍♂️ Wednesday: Strength-Endurance Circuit",
          " - Kettlebell Swings 3x15",
          " - Push Press 3x12",
          " - Jump Squats 3x15",
          " - Rows 3x12",
          "🏃‍♂️ Friday: 5K Tempo Run",
          "🧘‍♀️ Sunday: Yoga for Runners"
        ],
        Advanced: [
          "💥 Monday: Fartlek Training (45 min)",
          " - Alternating between 80% and 50% effort",
          "🏋️‍♀️ Tuesday: CrossFit-style Metcon",
          " - AMRAP 20 min: 5 Pull-ups, 10 Push-ups, 15 Air Squats",
          "🚴‍♂️ Thursday: 60 min Hill Repeats",
          "🏊‍♀️ Saturday: 1500m Swim for Time",
          "🧗‍♂️ Sunday: 2 Hour Trail Run/Hike"
        ]
      }
    };

    setPlan(plans[goal][level]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-white text-center">AI Workout Plan Generator</h2>

      <div className="mt-4">
        <label className="block font-medium text-gray-700 dark:text-gray-300">Select Your Fitness Goal:</label>
        <select 
          className="w-full mt-2 p-2 border dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="">-- Choose Goal --</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Endurance Training">Endurance Training</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block font-medium text-gray-700 dark:text-gray-300">Select Your Experience Level:</label>
        <select 
          className="w-full mt-2 p-2 border dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">-- Choose Level --</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <button
        className="w-full mt-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        onClick={generateWorkoutPlan}
      >
        Generate Workout Plan
      </button>

      {plan.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h3 className="font-semibold text-indigo-700 dark:text-white mb-3">Your Custom Workout Plan:</h3>
          <ul className="space-y-2">
            {plan.map((item, index) => (
              <li 
                key={index} 
                className={`text-gray-800 dark:text-gray-300 ${
                  item.startsWith("🏋️") || item.startsWith("🔥") || item.startsWith("💪") || 
                  item.startsWith("🏃") || item.startsWith("🚴") || item.startsWith("🧘") ? 
                  "font-semibold mt-2" : "ml-4"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;