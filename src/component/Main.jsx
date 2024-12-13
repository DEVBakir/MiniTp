import React, { useState } from 'react';
import Category from './Category';
import CardList from './CardList';

function Main() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menu, setMenu] = useState([
    {
      id: 1,
      imgSrc: 'https://static.vecteezy.com/system/resources/previews/022/911/694/non_2x/cute-cartoon-burger-icon-free-png.png',
      title: 'Chicken Burger',
      description: 'Delicious beef burger with cheese, lettuce, and tomato.',
      category: 'Burger'
    },
    {
      id: 2,
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/McDonald%27s_Filet-O-Fish_sandwich_%281%29.jpg',
      title: 'Fish Burger',
      description: 'Delicious fish burger with cheese, lettuce, and tomato.',
      category: 'Burger'
    },
    {
      id: 3,
      imgSrc: 'https://img.freepik.com/free-photo/delicious-italian-pizza-with-tomato-olives-pepperoni-mushrooms-top-view-isolated-white-background-still-life-copy-space_639032-299.jpg?t=st=1734122719~exp=1734126319~hmac=4aa5a1814a0256e8d2ed66e2e1849f3b38e50e9fbed2eb5eb432879d29a6df9a&w=826',
      title: 'Italy Pizza',
      description: 'Delicious pizza with cheese, olives, and pepperoni.',
      category: 'Pizza'
    }
  ]);
  
  const [isAdding, setIsAdding] = useState(false); // State to toggle product creation form visibility
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: 'Burger',
    imgSrc: '',
  });
  const [imageBlob, setImageBlob] = useState(null); // State to hold the image blob

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDelete = (id) => {
    setMenu(menu.filter(item => item.id !== id)); // Remove the product by id
  };

  const handleUpdate = (id, updatedProduct) => {
    setMenu(menu.map(item => item.id === id ? { ...item, ...updatedProduct } : item));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageBlob(imageUrl); // Set the blob URL for the uploaded image
      setNewProduct({ ...newProduct, imgSrc: imageUrl }); // Store the image URL in the newProduct state
    }
  };

  const handleAddProduct = () => {
    const newId = menu.length + 1;
    const newProductWithId = { ...newProduct, id: newId };
    setMenu([...menu, newProductWithId]); // Add new product to the menu
    setIsAdding(false); // Close the form after adding
    setNewProduct({
      title: '',
      description: '',
      category: 'Burger',
      imgSrc: '',
    }); // Reset the form
    setImageBlob(null); // Reset the image blob state
  };

  const filteredMenu = selectedCategory === 'All'
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  return (
    <main>
      <div className="container mx-auto mt-12">
        <Category data={['All', 'Burger', 'Pizza', 'Dessert']} onCategoryChange={handleCategoryChange} />
        
        {/* Add Product Button */}
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Product
        </button>

        {/* Add Product Form */}
        {isAdding && (
          <div className="p-4 bg-gray-100 rounded-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            >
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Dessert">Dessert</option>
            </select>

            {/* Image Upload */}
            <input
              type="file"
              onChange={handleImageUpload}
              className="border p-2 rounded mb-2 w-full"
            />

            {/* Display selected image preview */}
            {imageBlob && (
              <div className="mb-4">
                <img src={imageBlob} alt="Preview" className="h-40 object-cover w-full" />
              </div>
            )}

            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </button>
          </div>
        )}

        <CardList data={filteredMenu} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </main>
  );
}

export default Main;
