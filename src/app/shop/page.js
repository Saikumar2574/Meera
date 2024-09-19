"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  selectParent,
  setParentCategories,
  setChildCategories,
  setGrandchildCategories,
  selectChild,
  selectGrandChild,
} from "@/lib/redux/reducer/storeReducer";

const ParentCategoriesPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const parentCategories = useSelector((state) => state.shop.parentCategories);
  const selectedParent = useSelector((state) => state.shop.selectedParent);

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(
          "https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories"
        );
        dispatch(setParentCategories(response.data));
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    fetchParentCategories();
  }, [dispatch]);

  const handleParentClick = (parent) => {
    const payload = { id: parent.id, name: parent.name };
    dispatch(selectParent(payload));
    router.push(`/shop/${parent.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <h2 className="mb-10 text-xl font-bold sm:text-[40px] italic dark:text-white text-black leading-6 md:leading-[55px]">
        Popular Categories
      </h2>
      <div className="grid grid-cols-5 gap-10">
        {parentCategories.map((parent) => (
          <div key={parent.id} className="mb-2">
            <div
              className="flex flex-col items-center group cursor-pointer text-center"
              onClick={() => handleParentClick(parent)}
            >
              <img
                src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                alt={parent.name}
                className="w-40 h-40 object-cover mb-2 rounded-md"
              />
              <span className="capitalize text-base font-bold">
                {parent.name}
              </span>
              <span className="text-gray-500 italic text-xs">items: 20</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentCategoriesPage;
