"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page(props) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(
          "https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories"
        );
        const parentCategories = response.data;

        // For each parent category, fetch its child categories
        const updatedCategories = await Promise.all(
          parentCategories.map(async (parent) => {
            const children = await fetchChildCategories(parent.id);
            return {
              ...parent,
              children: children || [], // Add child categories to the parent category
            };
          })
        );

        setCategories(updatedCategories);
        console.log(updatedCategories);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    const fetchChildCategories = async (parentId) => {
      try {
        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${parentId}&category_type=child&page=1&per_page=2`
        );
        return res.data;
      } catch (error) {
        console.error(
          `Error fetching child categories for parent ID ${parentId}:`,
          error
        );
        return null;
      }
    };

    fetchParentCategories();
  }, []);
  return (
    <div className="h-full w-full relative overflow-y-auto">
      <div className="max-w-7xl mx-auto mt-10">
        {categories.map((parent) => (
          <div key={parent.id} className="mb-10">
            <h2 className="text-2xl font-bold capitalize mb-5">
              {parent.name}
            </h2>
            <div className="grid grid-cols-6 gap-4">
              {parent.children.subcategories.map((child) => (
                <div
                  className={`flex flex-col group cursor-pointer p-5  bg-white hover:bg-black hover:text-white rounded-[10px] shadow `}
                  onClick={() =>
                    router.push(`/store/products?catagory=${child.id}`)
                  }
                >
                  <img
                    src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                    alt={child.name}
                    className=" w-40 h-40 object-cover mb-2  rounded-md"
                  />
                  <div className="mt-auto">
                    <span className="flex items-center gap-2 capitalize text-sm font-bold">
                      {child.name}
                    </span>
                    <span className="text-gray-500 italic text-xs group-hover:text-white">
                      items : 20
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
