import Banner from "./Banner";
import products from "./utils/ProductsData";
import ProductCards from "../Components/ProductCards";

const Body = () => {
  return (
    <div className="p-4">
      <Banner />
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {products.map((item) => (
          <ProductCards key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Body;
