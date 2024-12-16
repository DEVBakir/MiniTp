export default function Order({ totalPrice, shippingFee, tax, orderSummaryTotal }) {
    return (
      <div className="absolute bottom-0 left-0 right-0 p-4 text-black bg-gray-100">
        <div className="flex justify-between mb-2">
          <span className="text-lg font-semibold">Subtotal:</span>
          <span className="font-bold">{totalPrice.toFixed(2)}$</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-lg font-semibold">Shipping:</span>
          <span className="font-bold">{shippingFee.toFixed(2)}$</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-lg font-semibold">Tax (8%):</span>
          <span className="font-bold">{tax.toFixed(2)}$</span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold text-red-600">{orderSummaryTotal.toFixed(2)}$</span>
        </div>
        <button className="w-full py-2 mt-4 bg-red-600 rounded-full text-white">Checkout</button>
      </div>
    );
  }
  