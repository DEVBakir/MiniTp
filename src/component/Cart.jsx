import React from 'react';
import Order from './Order';

function Cart({ cartItems, closeCart, handleRemoveItem, handleUpdateItem }) {
  const increaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    handleUpdateItem(updatedItems); 
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) { 
      updatedItems[index].quantity -= 1;
      handleUpdateItem(updatedItems); 
    }
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    : 0;

  const shippingFee = totalPrice > 0 ? 5.99 : 0; 
  const tax = totalPrice * 0.08; 
  const orderSummaryTotal = totalPrice + shippingFee + tax;

  return (
    <div className="fixed top-0 right-0 z-50 w-96 h-full bg-white shadow-lg transition-all duration-300 transform ease-in-out overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">Cart</h2>
        <button onClick={closeCart} className="text-xl font-semibold text-gray-600">
          X
        </button>
      </div>
      <div className="p-4 overflow-y-auto max-h-[70%]">
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={item.id} className="flex justify-between items-center mb-4 space-y-2">
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
                  <p className="text-sm text-gray-600 overflow-hidden text-ellipsis">{item.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className="text-xl font-semibold text-gray-600"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className="text-xl font-semibold text-gray-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)} 
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                  <span className="font-semibold text-sm sm:text-base">{(item.price * item.quantity).toFixed(2)}$</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Order
        totalPrice={totalPrice}
        shippingFee={shippingFee}
        tax={tax}
        orderSummaryTotal={orderSummaryTotal}
      />
    </div>
  );
}

export default Cart;
