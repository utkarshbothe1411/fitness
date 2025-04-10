import React, { useState } from "react";

const yogaAndZumbaVideos = [
  { title: "Yoga for Flexibility & Relaxation", url: "https://www.youtube.com/embed/v7AYKMP6rOE" },
  { title: "Morning Yoga for Beginners", url: "https://www.youtube.com/embed/4pKly2JojMw" },
  { title: "Power Yoga for Weight Loss", url: "https://www.youtube.com/embed/6rh6pVGTqRU?si=iwjCZA3uBABovvND" },
  { title: "Zumba Dance Workout", url: "https://www.youtube.com/embed/ymigWt5TOV8" },
  { title: "Beginner Zumba Workout", url: "https://www.youtube.com/embed/eM1E6FFnuZ8?si=GTw2LJQ04agkhngC" },
  { title: "Full-Body Yoga Flow", url: "https://www.youtube.com/embed/5v1wqxnrmrk" },
  { title: "Yoga for Obesity by Ramdev Baba", url: "https://www.youtube.com/embed/Kc-Xf_T7ctA?si=znr-xK1HSy06cDyh" },
  { title: "Relaxing Yoga for Sleep", url: "https://www.youtube.com/embed/2HTvZp5rPrg" },
  { title: "Zumba Cardio Workout", url: "https://www.youtube.com/embed/V3UeLUlFqe8?si=SIR7VlKZTSYJqxGa" },
  { title: "25 MIN FULL BODY HIIT", url: "https://www.youtube.com/embed/cbKkB3POqaY?si=mxowrCF1R1ng1-YX" },
];

const muscleGymVideos = [
  { title: "Strength Training for Muscle Gain", url: "https://www.youtube.com/embed/2tM1LFFxeKg" },
  { title: "Full Body Dumbbell Workout", url: "https://www.youtube.com/embed/Jpxc0TUr9BI?si=CBqz6F1g2XDlYPAB" },
  { title: "Chest & Triceps Workout", url: "https://www.youtube.com/embed/hkeLoBUbY00?si=WqXw7WEwZO3hBE12" },
  { title: "Leg Day Workout", url: "https://www.youtube.com/embed/JGQ935Pvk_g?si=5q-eF63cFB3T6aJl" },
  { title: "Arm Workout for Bigger Biceps", url: "https://www.youtube.com/embed/or_ebRUcuGQ?si=arjbPVBQDqCR4JjM" },
  { title: "Back & Shoulder Workout", url: "https://www.youtube.com/embed/MR1_THjLeo8?si=iXkAoRN4ITPqdgvw" },
  { title: "HIIT Cardio for Fat Burn", url: "https://www.youtube.com/embed/ml6cT4AZdqI" },
  { title: "Dumbbell Only Home Workout", url: "https://www.youtube.com/embed/0A3EgOztptQ?si=N3n_aL4Ix02pT_y0" },
  { title: "6-Pack Abs Workout", url: "https://www.youtube.com/embed/1919eTCoESo" },
];

const VideoLectures: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"Yoga & Zumba" | "Muscle & Gym">("Yoga & Zumba");

  const videos = selectedCategory === "Yoga & Zumba" ? yogaAndZumbaVideos : muscleGymVideos;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 dark:text-white text-center mb-6">
        🎥 Video Lectures
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setSelectedCategory("Yoga & Zumba")}
          className={`px-4 py-2 mx-2 rounded-md font-semibold ${
            selectedCategory === "Yoga & Zumba"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } transition`}
        >
          Yoga & Zumba
        </button>
        <button
          onClick={() => setSelectedCategory("Muscle & Gym")}
          className={`px-4 py-2 mx-2 rounded-md font-semibold ${
            selectedCategory === "Muscle & Gym"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          } transition`}
        >
          Muscle & Gym
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{video.title}</h3>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md shadow-md">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLectures;