"use client";
import { useSelector } from "react-redux";
import ExploreStore from "@/components/ExploreStore";

const ProductsPage = () => {
    
  const products = useSelector((state) => state.shop.products);

  return (
    <div className="mt-20">
      <h2 className="mb-5 text-xl font-bold capitalize dark:text-white text-black ">
        {products ? products.category.name : "No Products Available"}
      </h2>
      {products ? (
        <ExploreStore data={products} />
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductsPage;
