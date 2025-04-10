const recipesData = [
    {
      id: 1,
      title: "Mutton Sukka (Spicy Dry Mutton)",
      category: "meat",
      protein: 50,
      time: "45 mins",
      servings: 3,
      difficulty: "Medium",
      ingredients: ["500g mutton", "Onions", "Coconut", "Garam masala", "Red chili powder"],
      instructions: ["Marinate mutton with spices for 30 minutes.", "Sauté onions, add coconut, and cook till golden brown.", "Add mutton and cook till tender.", "Garnish with coriander and serve."],
      image: "https://static.toiimg.com/thumb/53823731.cms?width=1200&height=900",
      video: "https://www.youtube.com/embed/aV4B6hGVb0g?si=gDkN-qDfeNBKk8tr"
    },
    {
      id: 2,
      title: "Kolambi Masala (Prawn Curry)",
      category: "meat",
      protein: 40,
      time: "30 mins",
      servings: 4,
      difficulty: "Medium",
      ingredients: ["500g prawns", "Coconut milk", "Garam masala", "Kokum", "Onions"],
      instructions: ["Marinate prawns", "Prepare spicy curry", "Simmer for 15 mins"],
      image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Prawns-Masala-min.jpg",
      video: "https://www.youtube.com/embed/5yBih_TL6Mc?si=S4cKRIz0jC3_4JUv"
    },
    {
      id: 3,
      title: "Varhadi Chicken Curry",
      category: "meat",
      protein: 48,
      time: "50 mins",
      servings: 4,
      difficulty: "Hard",
      ingredients: ["Chicken", "Varhadi masala", "Onions", "Garlic", "Coconut"],
      instructions: ["Marinate chicken", "Cook with masala", "Serve with bhakri"],
      image: "https://img-cdn.thepublive.com/fit-in/1200x675/sanjeev-kapoor/media/media_files/SXiL6B3bEKwbXqrwA9W7.jpg",
      video: "https://www.youtube.com/embed/W4WeKNPfBcY?si=XKKMNZWbext3glHI"
    },
    {
      id: 4,
      title: "Misal Pav",
      category: "vegetarian",
      protein: 30,
      time: "40 mins",
      servings: 4,
      difficulty: "Medium",
      ingredients: ["Sprouted moth beans", "Onions", "Garlic", "Spices", "Pav"],
      instructions: ["Boil beans", "Prepare spicy misal gravy", "Serve hot with pav"],
      image: "https://i0.wp.com/pistachiodoughnut.com/wp-content/uploads/2022/07/IMG_8414_jpg.jpg?fit=2042%2C2048&ssl=1",
      video: "https://www.youtube.com/embed/ozyN7b3jP-A?si=7zyHchchpSdE9Hiw"
    },
    {
      id: 5,
      title: "Pithla Bhakri",
      category: "vegetarian",
      protein: 25,
      time: "30 mins",
      servings: 3,
      difficulty: "Easy",
      ingredients: ["Besan (Gram flour)", "Garlic", "Green chilies", "Bajra flour"],
      instructions: ["Mix besan", "Cook till thick", "Serve hot with bhakri"],
      image: "https://ministryofcurry.com/wp-content/uploads/2022/08/Pithla-Bhakri-thali-scaled.jpg",
      video: "https://www.youtube.com/embed/67G1uLdhKDA?si=My6gcTH6IJfVlFD-"
    },
    {
      id: 6,
      title: "Mutter Paneer",
      category: "vegetarian",
      protein: 25,
      time: "30 mins",
      servings: 3,
      difficulty: "Easy",
      ingredients: ["200g Paneer (Cottage Cheese)", "1 cup Green Peas", "2 Tomatoes", "1 Onion", "2 cloves Garlic", "1 tsp Garam Masala", "1 tsp Turmeric", "1 tsp Cumin", "1/2 cup Cream", "Salt", "Oil"],
      instructions: ["Heat oil in a pan and sauté onions until golden brown.", "Add chopped tomatoes, garlic, and spices. Cook until soft.", "Add green peas and a little water. Simmer for 5 minutes.", "Add paneer cubes and cook for another 5 minutes.", "Stir in cream, cook for 2 more minutes, and serve hot."],
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/02/matar-paneer-2.jpg",
      video: "https://www.youtube.com/embed/tYt9s6-5MLc?si=raaqMbi4ccPt8XyF"
    },
    {
      id: 7,
      title: "Egg Curry",
      category: "eggs",
      protein: 35,
      time: "40 mins",
      servings: 3,
      difficulty: "Medium",
      ingredients: ["4 boiled eggs", "2 Tomatoes", "1 Onion", "2 cloves Garlic", "1 tsp Garam Masala", "1 tsp Turmeric", "1 tsp Red Chili Powder", "1 tsp Cumin Seeds", "1/2 cup Coconut Milk", "Oil", "Salt"],
      instructions: ["Heat oil in a pan, add cumin seeds, and sauté onions until golden brown.", "Add chopped tomatoes, garlic, and spices. Cook until soft.", "Add coconut milk and mix well.", "Make small slits in boiled eggs and add them to the curry.", "Simmer for 5 minutes and serve hot with rice or roti."],
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/egg-curry-recipe.jpg",
      video: "https://www.youtube.com/embed/pqGMxHIfcXg?si=PH_DP024oJ6VHQt2"
    },
    {
      id: 8,
      title: "Egg Bhurji (Indian Scrambled Eggs)",
      category: "eggs",
      protein: 30,
      time: "20 mins",
      servings: 2,
      difficulty: "Easy",
      ingredients: ["4 Eggs", "1 Onion", "1 Tomato", "1 Green Chili", "1 tsp Cumin Seeds", "1/2 tsp Turmeric", "1/2 tsp Red Chili Powder", "Coriander Leaves", "Salt", "Oil"],
      instructions: ["Heat oil in a pan, add cumin seeds and chopped onions. Sauté until golden brown.", "Add chopped tomatoes, green chili, and spices. Cook for 2 minutes.", "Crack eggs directly into the pan and stir continuously.", "Cook until eggs are scrambled and fully cooked.", "Garnish with coriander leaves and serve hot with bread or chapati."],
      image: "https://www.whiskaffair.com/wp-content/uploads/2020/07/Egg-Bhurji-2-3.jpg",
      video: "https://www.youtube.com/embed/4GvRTAR-xtA?si=YqhIYaT5GZybeEhT"
    }
  ];
  
export default recipesData;
