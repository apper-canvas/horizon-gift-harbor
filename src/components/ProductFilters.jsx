import { useState } from 'react';
import getIcon from '../utils/iconUtils';

const ProductFilters = ({ filters, onFilterChange }) => {
  const FilterIcon = getIcon('SlidersHorizontal');
  const XIcon = getIcon('X');
  
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  const categories = [
    { id: 'handcrafted', name: 'Handcrafted' },
    { id: 'personalized', name: 'Personalized' },
    { id: 'experience', name: 'Experience Gifts' },
    { id: 'home', name: 'Home & Living' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'tech', name: 'Tech Gifts' }
  ];
  
  const occasions = [
    { id: 'birthday', name: 'Birthday' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'anniversary', name: 'Anniversary' },
    { id: 'christmas', name: 'Christmas' },
    { id: 'valentines', name: "Valentine's Day" },
    { id: 'graduation', name: 'Graduation' }
  ];
  
  const handleCategoryChange = (category) => {
    onFilterChange({ category: filters.category === category ? '' : category });
  };
  
  const handleOccasionChange = (occasion) => {
    onFilterChange({ occasion: filters.occasion === occasion ? '' : occasion });
  };
  
  const handlePriceChange = (min, max) => {
    onFilterChange({ priceRange: [min, max] });
  };
  
  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 1000],
      occasion: '',
      searchQuery: ''
    });
  };
  
  const toggleMobileFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <>
      {/* Mobile filters toggle */}
      <div className="md:hidden mb-4">
        <button 
          className="w-full btn bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200 flex items-center justify-center gap-2"
          onClick={toggleMobileFilters}
        >
          <FilterIcon className="w-4 h-4" />
          {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
    
      <div className={`card sticky top-20 ${!isFiltersVisible ? 'hidden md:block' : 'block'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button 
            onClick={clearAllFilters}
            className="text-xs text-primary hover:text-primary-dark"
          >
            Clear All
          </button>
        </div>
        
        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="space-y-1">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`category-${category.id}`} 
                  checked={filters.category === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-surface-800 dark:text-surface-200">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="flex items-center">
            <span className="text-sm text-surface-500">$0</span>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
              className="w-full mx-2 accent-primary" 
            />
            <span className="text-sm text-surface-500">${filters.priceRange[1]}</span>
          </div>
          <div className="text-center mt-2 text-sm text-surface-600 dark:text-surface-400">
            Up to ${filters.priceRange[1]}
          </div>
        </div>
        
        {/* Occasions */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Occasions</h3>
          <div className="space-y-1">
            {occasions.map(occasion => (
              <div key={occasion.id} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`occasion-${occasion.id}`} 
                  checked={filters.occasion === occasion.id}
                  onChange={() => handleOccasionChange(occasion.id)}
                  className="rounded text-primary focus:ring-primary" 
                />
                <label htmlFor={`occasion-${occasion.id}`} className="ml-2 text-sm text-surface-800 dark:text-surface-200">
                  {occasion.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;