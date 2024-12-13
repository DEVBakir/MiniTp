import React, { useState } from 'react';

function Card({ product, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(product.title);
  const [updatedDescription, setUpdatedDescription] = useState(product.description);
  const [updatedCategory, setUpdatedCategory] = useState(product.category);  // Store the updated category
  const [updatedImg, setUpdatedImg] = useState(product.imgSrc);  // Store the image URL

  const handleUpdate = () => {
    if (isEditing) {
      onUpdate(product.id, {
        title: updatedTitle,
        description: updatedDescription,
        category: updatedCategory,  // Include the updated category
        imgSrc: updatedImg,  // Update the image source as well
      });
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a Blob URL
      setUpdatedImg(imageUrl);  // Update the image URL state
    }
  };

  const handleCategoryChange = (e) => {
    setUpdatedCategory(e.target.value);  // Update the category
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <TopSection imgSrc={updatedImg} /> {/* Pass the updated imgSrc */}
      <BottomSection
        title={updatedTitle}
        description={updatedDescription}
        category={updatedCategory}  // Pass the updated category
        productId={product.id}
        onDelete={onDelete}
        isEditing={isEditing}
        setUpdatedTitle={setUpdatedTitle}
        setUpdatedDescription={setUpdatedDescription}
        onUpdate={handleUpdate}
        onImageChange={handleImageChange}  // Pass the image change handler
        onCategoryChange={handleCategoryChange}  // Pass the category change handler
      />
    </div>
  );
}

export default Card;

function TopSection({ imgSrc }) {
  return (
    <div className="w-full h-64 overflow-hidden flex justify-center">
      <img src={imgSrc} alt="Product" className="h-full object-cover" />
    </div>
  );
}

function BottomSection({
  title,
  description,
  category,
  productId,
  onDelete,
  isEditing,
  setUpdatedTitle,
  setUpdatedDescription,
  onUpdate,
  onImageChange,
  onCategoryChange,
}) {
  const handleDelete = () => {
    onDelete(productId);
  };

  return (
    <div className="p-4">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            value={description}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          
          {/* Category Dropdown */}
          <select
            value={category}
            onChange={onCategoryChange}  // Handle category change
            className="border p-2 rounded w-full mb-2"
          >
            <option value="Burger">Burger</option>
            <option value="Pizza">Pizza</option>
            <option value="Dessert">Dessert</option>
          </select>

          {/* Image Upload */}
          <input
            type="file"
            onChange={onImageChange} // Trigger the image change
            className="border p-2 rounded w-full mb-2"
          />
        </>
      ) : (
        <>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {category}</p>
        </>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={onUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Save' : 'Update'}
        </button>
      </div>
    </div>
  );
}
