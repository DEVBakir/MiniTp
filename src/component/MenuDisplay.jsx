import React, { useState } from 'react';
import Category from './Category';
import MenuItem from './MenuItem';
import Cart from './Cart';
import img1 from '../assets/1.webp';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.avif';

export default function MenuDisplay() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menu, setMenu] = useState([
    {
      id: 1,
      imgSrc: img1,
      title: 'Chicken Burger',
      description: 'Delicious beef burger with cheese, lettuce, and tomato.',
      category: 'Burger',
      price: 19.20,
      quantity: 1,
    },
    {
      id: 2,
      imgSrc: img2,
      title: 'Fish Burger',
      description: 'Delicious fish burger with cheese, lettuce, and tomato.',
      category: 'Burger',
      price: 15.50,
      quantity: 1,
    },
    {
      id: 3,
      imgSrc: img3,
      title: 'Italy Pizza',
      description: 'Delicious pizza with cheese, olives, and pepperoni.',
      category: 'Pizza',
      price: 22.00,
      quantity: 1,
    },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const handleUpdateItem = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const filteredMenu = selectedCategory === 'All'
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  return (
    <main>
      <div className="container mx-auto mt-12">
        <Category data={['All', 'Burger', 'Pizza']} onCategoryChange={handleCategoryChange} />
        <MenuItem data={filteredMenu} onAddToCart={handleAddToCart} />
        <button
          onClick={handleToggleCart}
          className="fixed bottom-5 right-5 bg-red-600 text-white p-3 rounded-full shadow-lg"
        >
          View Cart
        </button>
      </div>

      {isCartOpen && <Cart cartItems={cartItems} handleRemoveItem={handleRemoveItem} handleUpdateItem={handleUpdateItem} closeCart={handleToggleCart} />}
    </main>
  );
}
