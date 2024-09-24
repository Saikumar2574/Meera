"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import ExploreStore from "@/components/ExploreStore";
import { useSearchParams } from "next/navigation";

const CategorySidebar = ({ onCategorySelect }) => {
  const searchParams = useSearchParams();
  const catagoryId = searchParams.get("catagory");
  const [selectedGrandChildId, setSelectedGrandChildId] = useState(null);
  const [grandchildCategories, setGrandchildCategories] = useState([]);
  const [loadingGrandchildren, setLoadingGrandchildren] = useState(false);
  const [categoryName, setCategoryName] = useState(null);

  // Fetch grandchild categories when a child category is selected
  useEffect(() => {
    const fetchGrandchildCategories = async () => {
      try {
        setLoadingGrandchildren(true);

        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${catagoryId}&category_type=grandchild&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          setCategoryName(res.data?.category?.name);
          setGrandchildCategories(res.data.subcategories);
          handleCategorySelect(res.data.subcategories?.[0]?.id);
        }
      } catch (error) {
        console.error("Error fetching grandchild categories:", error);
      } finally {
        setLoadingGrandchildren(false);
      }
    };

    if (catagoryId) fetchGrandchildCategories();
  }, [catagoryId]);

  const handleCategorySelect = async (categoryId) => {
    setSelectedGrandChildId(categoryId);
    try {
      const res = await axios.get(
        `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${categoryId}&category_type=products`
      );

      const products = res.data; // Assuming products are returned in the API response

      onCategorySelect(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const attributes = [
    {
      name: "Color",
      values: ["Red", "Blue", "Green"],
    },
    {
      name: "Size",
      values: ["S", "M", "L", "XL"],
    },
  ];

  return (
    <div className="w-80  h-full hide-scrollbar overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold capitalize">{categoryName}</h2>
        {catagoryId && (
          <div className="mt-4">
            <ul >
              {loadingGrandchildren ? (
                <li className="text-sm text-gray-500">Loading...</li>
              ) : (
                grandchildCategories?.map((grandchild) => (
                  <li key={grandchild.id} className="mb-2">
                    <div
                      className={`flex gap-5 mt-4  items-center  group cursor-pointer px-5 py-2 hover:bg-gray-100 ${
                        selectedGrandChildId === grandchild.id
                          ? "bg-gray-200"
                          : "bg-white"
                      } rounded-[10px] shadow `}
                      onClick={() => handleCategorySelect(grandchild.id)}
                    >
                      <img
                        src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                        alt={grandchild.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="mt-auto">
                        <span className="flex items-center gap-2 capitalize text-sm font-bold">
                          {grandchild.name}
                        </span>
                        <span className="text-gray-500 italic text-xs ">
                          items : 20
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-5">
              {attributes.map((attr, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold text-gray-700">
                    {attr.name}:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {attr.values.map((value, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 capitalize rounded-lg border border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function Page() {
  const [products, setProducts] = useState([]);

  const handleCategorySelect = (products) => {
    setProducts(products);
  };

  return (
    <div className="flex h-full w-full relative">
      <CategorySidebar onCategorySelect={handleCategorySelect} />
      <div className="flex-1 p-4 overflow-y-auto">
        <ExploreStore data={products} />{" "}
        {/* Assuming ExploreStore displays products */}
      </div>
    </div>
  );
}

export default Page;
