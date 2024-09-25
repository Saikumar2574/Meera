"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import ExploreStore from "@/components/ExploreStore";

const Page = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedGrandChildId, setSelectedGrandChildId] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState({});
  const [grandchildCategories, setGrandchildCategories] = useState({});
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [loadingGrandchildren, setLoadingGrandchildren] = useState(false);
  const [products, setProducts] = useState(null);

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
        setParentCategories(response.data); // Assuming the response contains the parent categories
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      }
    };

    fetchParentCategories();
  }, []);

  // Fetch child categories when a parent category is selected
  useEffect(() => {
    if (selectedParentId === null) return;

    const fetchChildCategories = async () => {
      try {
        setLoadingChildren(true);

        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedParentId}&category_type=child&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          setChildCategories((prev) => ({
            ...prev,
            [selectedParentId]: res.data.subcategories,
          }));
        }
      } catch (error) {
        console.error("Error fetching child categories:", error);
      } finally {
        setLoadingChildren(false);
      }
    };

    fetchChildCategories();
  }, [selectedParentId]);

  // Fetch grandchild categories when a child category is selected
  useEffect(() => {
    if (selectedChildId === null) return;

    const fetchGrandchildCategories = async () => {
      try {
        setLoadingGrandchildren(true);

        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedChildId}&category_type=grandchild&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          setGrandchildCategories((prev) => ({
            ...prev,
            [selectedChildId]: res.data.subcategories,
          }));
        }
      } catch (error) {
        console.error("Error fetching grandchild categories:", error);
      } finally {
        setLoadingGrandchildren(false);
      }
    };

    fetchGrandchildCategories();
  }, [selectedChildId]);

  const handleCategorySelect = async (categoryId) => {
    setSelectedGrandChildId(categoryId);
    try {
      const res = await axios.get(
        `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${categoryId}&category_type=products`
      );
      const products = res.data; // Assuming products are returned in the API response
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleParentClick = (parentId) => {
    setSelectedParentId(parentId);
    setSelectedChildId(null); // Reset child selection when a new parent is selected
  };

  const handleChildClick = (childId) => {
    setSelectedChildId(childId);
  };

  const handleBreadcrumbClick = (level) => {
    if (level === "child") {
      setSelectedGrandChildId(null);
      setProducts(null);
    } else if (level === "parent") {
      setSelectedChildId(null); // Reset child when breadcrumb for parent is clicked
    } else if (level === "root") {
      setSelectedParentId(null); // Reset parent and child when breadcrumb for root is clicked
      setSelectedChildId(null);
      setSelectedGrandChildId(null);
      setProducts(null);
    }
  };

  const getBreadcrumb = () => {
    const parentName =
      parentCategories.find((pc) => pc.id === selectedParentId)?.name || "";
    const childName =
      childCategories[selectedParentId]?.find((c) => c.id === selectedChildId)
        ?.name || "";
    const grandChildName =
      grandchildCategories[selectedChildId]?.find(
        (c) => c.id === selectedGrandChildId
      )?.name || "";

    // Capitalize and format breadcrumb parts
    const formatName = (name) =>
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return `home${parentName ? `/${formatName(parentName)}` : ""}${
      childName ? `/${formatName(childName)}` : ""
    }${grandChildName ? `/${formatName(grandChildName)}` : ""}`;
  };

  const breadcrumbParts = getBreadcrumb().split("/");

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
    <div className="w-full flex h-full">
      <div className="flex flex-1 overflow-hidden">
        <motion.div
          className={`relative h-full  transition-transform duration-300 pr-6 ${
            isSidebarOpen ? "w-[360px] h-full" : "w-0"
          } overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: isSidebarOpen ? "25%" : "0%" }}
        >
          <div className="bg-[#200042] rounded-tr-3xl h-full w-full rounded-br-3xl text-white p-4">
            <Link href="/" prefetch={false}>
              <img
                src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
                className="w-28 md:w-32 md:h-16"
              />
            </Link>

            {/* Breadcrumb */}
            <div className="p-4 text-white text-base font-semibold italic">
              {breadcrumbParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span
                    className={`cursor-pointer capitalize ${
                      index < breadcrumbParts.length - 1
                        ? "text-blue-500"
                        : "text-white"
                    }`}
                    onClick={() => {
                      if (index === 0) handleBreadcrumbClick("root");
                      else if (index === 1) handleBreadcrumbClick("parent");
                      else if (index === 2) handleBreadcrumbClick("child");
                    }}
                  >
                    {part}
                  </span>
                  {index < breadcrumbParts.length - 1 && " | "}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* <IoMdCloseCircle
            className="absolute top-1/2 right-0 z-20 border rounded-full bg-gray-300 text-white"
            onClick={toggleSidebar}
            size={60}
          /> */}
          {/* <video
            className="absolute h-14 w-14 top-1/2 -right-0 z-20 border rounded-full bg-gray-300 text-white"
            src="/inputVedio.mp4"
            autoPlay={true}
            playsInline
            muted
            loop
          ></video> */}
        </motion.div>
        <div
          className={`flex-1 w-full flex flex-col transition-all duration-300`}
        >
          <main className="h-full overflow-y-auto px-20">
            <div className="max-w-7xl mx-auto mt-20">
              <h2 className="  mb-10 text-4xl font-bold italic dark:text-white text-black leading-6  md:leading-[55px]">
                Hey there,
                <br />
                this is what i could process ...
              </h2>
              <h2 className=" mb-5 text-xl font-bold capitalize dark:text-white text-black ">
                {products ? products.category.name : "Popular Categories"}
              </h2>

              {products ? (
                <ExploreStore data={products} />
              ) : (
                <div className="grid grid-cols-5 gap-10">
                  {selectedChildId
                    ? grandchildCategories[selectedChildId]?.map(
                        (grandchild) => (
                          <div key={grandchild.id} className="mb-2">
                            <div
                              className={`flex flex-col items-center group cursor-pointer text-center `}
                              onClick={() =>
                                handleCategorySelect(grandchild.id)
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
                        )
                      )
                    : selectedParentId
                    ? childCategories[selectedParentId]?.map((child) => (
                        <div key={child.id} className="mb-2">
                          <div
                            className={`flex flex-col items-center group cursor-pointer text-center `}
                            onClick={() => handleChildClick(child.id)}
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
                        <div
                          key={parent.id}
                          className="mb-2"
                          title={parent.name}
                        >
                          <div
                            className={`flex flex-col items-center group cursor-pointer text-center `}
                            onClick={() => handleParentClick(parent.id)}
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
              )}
            </div>
          </main>
          <div className="px-20">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
