import React, { useState, useEffect } from 'react';

function Category({ data, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(data[0]);

  // Sync state with the selected category in the parent component
  useEffect(() => {
    onCategoryChange(selectedCategory);
  }, [selectedCategory, onCategoryChange]);

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='flex gap-3 my-8'>
      {data.map((category, index) => (
        <button
          key={index}
          onClick={() => handleClick(category)}
          className={`py-2 px-4 rounded-full transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-[#a21519] text-white'
              : 'bg-[#ecf1f4] text-[#333]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Category;
