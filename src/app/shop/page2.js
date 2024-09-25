"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import ExploreStore from "@/components/ExploreStore";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectChild,
  selectGrandChild,
  selectParent,
  setChildCategories,
  setGrandchildCategories,
  setParentCategories,
} from "@/lib/redux/reducer/storeReducer";
import { useRouter } from "next/navigation";

const Page = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [loadingGrandchildren, setLoadingGrandchildren] = useState(false);
  const [products, setProducts] = useState(null);

  const parentCategories = useSelector((state) => state.shop.parentCategories);
  const childCategories = useSelector((state) => state.shop.childCategories);
  const grandchildCategories = useSelector(
    (state) => state.shop.grandchildCategories
  );
  const selectedParent = useSelector((state) => state.shop.selectedParent);
  const selectedChild = useSelector((state) => state.shop.selectedChild);
  const selectedGrandChildId = useSelector(
    (state) => state.shop.selectedGrandChild
  );

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  // Fetch Parent Categories
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(
          "https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories"
        );
        dispatch(setParentCategories(response.data)); // Assuming the response contains the parent categories
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    fetchParentCategories();
  }, []);

  // Fetch child categories when a parent category is selected
  useEffect(() => {
    if (selectedParent === null) return;
    const fetchChildCategories = async () => {
      try {
        setLoadingChildren(true);

        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedParent.id}&category_type=child&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          dispatch(setChildCategories(res.data.subcategories));
        }
      } catch (error) {
        console.error("Error fetching child categories:", error);
      } finally {
        setLoadingChildren(false);
      }
    };

    fetchChildCategories();
  }, [selectedParent]);

  useEffect(() => {
    dispatch(selectGrandChild(null));
  }, []);

  // Fetch grandchild categories when a child category is selected
  useEffect(() => {
    if (selectedChild === null) return;

    const fetchGrandchildCategories = async () => {
      try {
        setLoadingGrandchildren(true);

        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedChild.id}&category_type=grandchild&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          dispatch(setGrandchildCategories(res.data.subcategories));
        }
      } catch (error) {
        console.error("Error fetching grandchild categories:", error);
      } finally {
        setLoadingGrandchildren(false);
      }
    };

    fetchGrandchildCategories();
  }, [selectedChild]);

  const handleCategorySelect = async (payload) => {
    dispatch(selectGrandChild(payload));

    try {
      const categoryId = payload.id;
      await dispatch(fetchProducts(payload.id)).unwrap();
        router.push("/shop/products");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleParentClick = (payload) => {
    dispatch(selectParent(payload));
    // dispatch(selectChild(null));
  };

  const handleChildClick = (payload) => {
    dispatch(selectChild(payload));
  };

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <h2 className="  mb-10 text-4xl font-bold  italic dark:text-white text-black leading-6  md:leading-[55px]">
        Hey there,
        <br />
        this is what i could process ...
      </h2>
      <h2 className=" mb-5 text-xl font-bold capitalize dark:text-white text-black ">
        {selectedChild
          ? selectedChild.name
          : selectedParent
          ? selectedParent.name
          : "Popular Categories"}
      </h2>
      <div className="grid grid-cols-5 gap-10">
        {selectedChild
          ? grandchildCategories?.map((grandchild) => (
              <div key={grandchild.id} className="mb-2">
                <div
                  className={`flex flex-col items-center group cursor-pointer text-center `}
                  onClick={() =>
                    handleCategorySelect({
                      id: grandchild.id,
                      name: grandchild.name,
                    })
                  }
                >
                  <img
                    src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                    alt={grandchild.name}
                    className=" w-40 h-40 object-cover mb-2  rounded-md"
                  />
                  <div className="mt-auto flex flex-col ">
                    <span className="capitalize text-base font-bold">
                      {grandchild.name}
                    </span>
                    <span className="text-gray-500 italic text-xs">
                      items : 20
                    </span>
                  </div>
                </div>
              </div>
            ))
          : selectedParent
          ? childCategories?.map((child) => (
              <div key={child.id} className="mb-2">
                <div
                  className={`flex flex-col items-center group cursor-pointer text-center `}
                  onClick={() =>
                    handleChildClick({ id: child.id, name: child.name })
                  }
                >
                  <img
                    src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                    alt={child.name}
                    className=" w-40 h-40 object-cover mb-2  rounded-md"
                  />
                  <div className="mt-auto flex flex-col ">
                    <span className="capitalize text-base font-bold">
                      {child.name}
                    </span>
                    <span className="text-gray-500 italic text-xs">
                      items : 20
                    </span>
                  </div>
                </div>
              </div>
            ))
          : parentCategories.map((parent) => (
              <div key={parent.id} className="mb-2" title={parent.name}>
                <div
                  className={`flex flex-col items-center group cursor-pointer text-center `}
                  onClick={() =>
                    handleParentClick({ id: parent.id, name: parent.name })
                  }
                >
                  <img
                    src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                    alt={parent.name}
                    className=" w-40 h-40 object-cover mb-2  rounded-md"
                  />
                  <div className="mt-auto flex flex-col ">
                    <span className="capitalize text-base font-bold">
                      {parent.name}
                    </span>
                    <span className="text-gray-500 italic text-xs">
                      items : 20
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Page;
