import React, { useState } from 'react';

function Card({ product,AddToCart }) {

  const handleCategoryChange = (e) => {
    setUpdatedCategory(e.target.value); 
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <TopSection imgSrc={product.imgSrc} /> 
      <BottomSection
        title={product.title}
        description={product.description}
        category={product.category}  
        onCategoryChange={handleCategoryChange} 
        addToCart={()=> {AddToCart(product)}}
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
  addToCart
}) {

  return (
    <div className="p-4">
    <>
      <h4 className="text-xl font-bold uppercase text-gray-800 mb-2 !font-[Quicksand]">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className='flex justify-between my-5 items-center'>
        <b className='font-extrabold text-2xl !font-[Quicksand]'>19.20$</b>
        <button 
        onClick={()=> {addToCart()}}
        className='text-red-600 font-semibold !font-[Quicksand] p-3 uppercase border-red-600 rounded-full border-2 transform transition duration-300 hover:bg-red-600 hover:text-white hover:scale-105'>
          Add To Cart
        </button>
      </div>
    </>        
  </div>
  
  );
}
