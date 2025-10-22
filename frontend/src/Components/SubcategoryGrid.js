const SubcategoryGrid = ({ subcategories }) => {
  if (!subcategories.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
        Available Cuts
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {subcategories.map(({ _id, subcategory_name, subcategory_image, subcategory_slug }) => (
          <div
            key={_id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={subcategory_image?.url || '/placeholder.jpg'}
              alt={subcategory_name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full"
            />
            <h3 className="mt-3 text-sm font-semibold text-gray-800 text-center">{subcategory_name}</h3>
            <p className="text-xs text-gray-600 text-center mt-1">{subcategory_slug || 'No description available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryGrid;
