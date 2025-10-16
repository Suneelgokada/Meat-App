const ProductCards = ({ name, price, weight, image, quantity, onAdd, onRemove }) => {
  
  return (
    <div className="w-64 p-4 bg-white shadow-md rounded-lg relative">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-sm text-gray-600">{weight}</p>
      <p className="text-md font-bold text-red-600">₹{price}</p>

      {/* Bottom-right cart controls */}
      <div className="absolute bottom-2 right-2">
        {quantity > 0 ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={onRemove}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-sm font-medium">{quantity}</span>
            <button
              onClick={onAdd}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 cursor-pointer"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCards;
