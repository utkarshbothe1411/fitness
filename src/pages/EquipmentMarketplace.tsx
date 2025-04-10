import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, ChevronRight } from 'lucide-react';

type FitnessProduct = {
  id: string;
  name: string;
  category: 'cardio' | 'strength' | 'recovery' | 'accessories';
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  affiliateLink: string;
};

const EquipmentMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  // Mock product data
  const products: FitnessProduct[] = [
    {
      id: '1',
      name: 'Adjustable Dumbbell Set',
      category: 'strength',
      price: 249.99,
      rating: 4.8,
      reviewCount: 124,
      image: 'cv4GCjuUxcgr5AABQAt1qdCQ.webp',
      description: '50lb adjustable dumbbells with quick-change dial',
      affiliateLink: '#'
    },
    {
      id: '2',
      name: 'Yoga Mat (Premium)',
      category: 'accessories',
      price: 39.99,
      rating: 4.9,
      reviewCount: 89,
      image: '61iDe7n4HoL._SL1500_.jpg',
      description: '6mm thick non-slip mat with carrying strap',
      affiliateLink: '#'
    },
    {
      id: '3',
      name: 'Resistance Bands Set',
      category: 'strength',
      price: 29.99,
      rating: 4.6,
      reviewCount: 215,
      image: '711+JJRoaeL._SL1280_.jpg',
      description: '5 bands with varying resistance levels',
      affiliateLink: '#'
    },
    {
      id: '4',
      name: 'Foam Roller',
      category: 'recovery',
      price: 24.99,
      rating: 4.5,
      reviewCount: 76,
      image: 'images (1).jpeg',
      description: 'High-density foam for muscle recovery',
      affiliateLink: '#'
    },
    {
      id: '5',
      name: 'Jump Rope (Weighted)',
      category: 'cardio',
      price: 19.99,
      rating: 4.7,
      reviewCount: 142,
      image: 'images.jpeg',
      description: 'Adjustable length with weighted handles',
      affiliateLink: '#'
    },
    {
      id: '6',
      name: 'Fitness Tracker',
      category: 'accessories',
      price: 79.99,
      rating: 4.4,
      reviewCount: 203,
      image: 'shopping.webp',
      description: 'Waterproof tracker with heart rate monitor',
      affiliateLink: '#'
    },
    {
      id: '7',
      name: 'Gym Cycle',
      category: 'cardio',
      price: 329.99,
      rating: 4.6,
      reviewCount: 98,
      image: 'cycle.webp',
      description: 'Indoor stationary cycle with adjustable resistance',
      affiliateLink: '#'
    },
    {
      id: '8',
      name: 'Fold-Down Weight Training Rack',
      category: 'strength',
      price: 549.00,
      rating: 4.9,
      reviewCount: 67,
      image: 'p2340887.jpg',
      description: 'Wall-mounted rack with fold-down feature for compact spaces',
      affiliateLink: '#'
    },
    {
      id: '9',
      name: 'Hand Gripper',
      category: 'accessories',
      price: 14.99,
      rating: 4.5,
      reviewCount: 150,
      image: 'shopping (2).webp',
      description: 'Grip strengthener with adjustable resistance',
      affiliateLink: '#'
    }
  
  ];

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return b.reviewCount - a.reviewCount; // popular
      }
    });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'strength', label: 'Strength' },
    { value: 'recovery', label: 'Recovery' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Fitness Equipment Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Premium gear to power your fitness journey
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search equipment..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="pl-4 pr-8 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 appearance-none"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-4" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Fitness+Gear';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{product.name}</h3>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="fill-yellow-400 text-yellow-400 w-4 h-4" />
                      <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Featured Brands with Logos */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Nike', img: 'nike.jpg' },
              { name: 'Adidas', img: 'images.jpg' },
              { name: 'Puma', img: 'puma.jpg' },
              { name: 'HRX', img: 'hrx.jpg' },
              { name: 'USPOLO', img: 'image.png' },
              { name: 'Muscleblaze', img: 'blaze.png' },
              { name: 'NewBalance', img: 'new.jpg' }

            ].map((brand) => (
              <div key={brand.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                {brand.img ? (
                  <img src={brand.img} alt={brand.name} className="h-full max-h-16 object-contain" />
                ) : (
                  <span className="font-medium text-gray-700 dark:text-gray-300">{brand.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentMarketplace;
