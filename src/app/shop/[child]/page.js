"use client"
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  setChildCategories,
  selectChild,
} from "@/lib/redux/reducer/storeReducer";

const ChildCategoriesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const childCategories = useSelector((state) => state.shop.childCategories);
  const selectedParent = useSelector((state) => state.shop.selectedParent);

  useEffect(() => {
    if (!selectedParent) return;

    const fetchChildCategories = async () => {
      try {
        const response = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedParent.id}&category_type=child&page=1&per_page=2`
        );
        dispatch(setChildCategories(response.data.subcategories));
      } catch (error) {
        console.error("Error fetching child categories:", error);
      }
    };

    fetchChildCategories();
  }, [selectedParent, dispatch]);


  const handleChildClick = (child) => {
    const payload = { id: child.id, name: child.name };
    dispatch(selectChild(payload));
    router.push(`/shop/${selectedParent.name}/${child.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <h2 className="mb-10 text-xl font-bold sm:text-[40px] italic dark:text-white text-black leading-6 md:leading-[55px]">
        {selectedParent?.name}
      </h2>
      <div className="grid grid-cols-5 gap-10">
        {childCategories.map((child) => (
          <div key={child.id} className="mb-2">
            <div
              className="flex flex-col items-center group cursor-pointer text-center"
              onClick={() => handleChildClick(child)}
            >
              <img
                src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                alt={child.name}
                className="w-40 h-40 object-cover mb-2 rounded-md"
              />
              <span className="capitalize text-base font-bold">
                {child.name}
              </span>
              <span className="text-gray-500 italic text-xs">items: 20</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildCategoriesPage;
