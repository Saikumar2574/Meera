"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import ExploreStore from "@/components/ExploreStore";

const CategorySidebar = ({ onCategorySelect }) => {
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedGrandChildId, setSelectedGrandChildId] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState({});
  const [grandchildCategories, setGrandchildCategories] = useState({});
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [loadingGrandchildren, setLoadingGrandchildren] = useState(false);

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

      onCategorySelect(products);
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
    if (level === "parent") {
      setSelectedChildId(null); // Reset child when breadcrumb for parent is clicked
    } else if (level === "root") {
      setSelectedParentId(null); // Reset parent and child when breadcrumb for root is clicked
      setSelectedChildId(null);
    }
  };

  const getBreadcrumb = () => {
    const parentName =
      parentCategories.find((pc) => pc.id === selectedParentId)?.name || "";
    const childName =
      childCategories[selectedParentId]?.find((c) => c.id === selectedChildId)
        ?.name || "";

    // Capitalize and format breadcrumb parts
    const formatName = (name) =>
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return `categories${parentName ? `/${formatName(parentName)}` : ""}${
      childName ? `/${formatName(childName)}` : ""
    }`;
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
    <div className="w-96  h-full hide-scrollbar overflow-y-auto">
      {/* Breadcrumb */}
      <div className="p-4 text-gray-700 text-lg font-bold bg-white  sticky top-0">
        {breadcrumbParts.map((part, index) => (
          <React.Fragment key={index}>
            <span
              className={`cursor-pointer capitalize ${
                index < breadcrumbParts.length - 1
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => {
                if (index === 0) handleBreadcrumbClick("root");
                else if (index === 1) handleBreadcrumbClick("parent");
              }}
            >
              {part}
            </span>
            {index < breadcrumbParts.length - 1 && " / "}
          </React.Fragment>
        ))}
      </div>
      <div className="px-4">
        {selectedChildId ? (
          <div className="mt-4">
            <ul className="grid grid-cols-2 gap-4">
              {loadingGrandchildren ? (
                <li className="text-sm text-gray-500">Loading...</li>
              ) : (
                grandchildCategories[selectedChildId]?.map((grandchild) => (
                  <li key={grandchild.id} className="mb-2">
                    <div
                      className={`flex flex-col group cursor-pointer p-5 h-40 w-40  hover:bg-black hover:text-white ${
                        selectedGrandChildId === grandchild.id
                          ? "bg-black text-white "
                          : "bg-white"
                      } rounded-[10px] shadow `}
                      onClick={() => handleCategorySelect(grandchild.id)}
                    >
                      <img
                        src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                        alt={parent.name}
                        className="w-10 h-10 object-cover mb-2  rounded-md"
                      />
                      <div className="mt-auto">
                        <span className="flex items-center gap-2 capitalize text-sm font-bold">
                          {grandchild.name}
                        </span>
                        <span className="text-gray-500 italic text-xs group-hover:text-white">
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
        ) : selectedParentId ? (
          <div className="mt-4">
            <ul className="grid grid-cols-2 gap-4">
              {loadingChildren ? (
                <li className="text-sm text-gray-500">Loading...</li>
              ) : (
                childCategories[selectedParentId]?.map((child) => (
                  <li key={child.id} className="mb-2">
                    <div
                      className={`flex flex-col group cursor-pointer p-5 h-40 w-40 bg-white hover:bg-black hover:text-white rounded-[10px] shadow  ${
                        selectedChildId === child.id ? "bg-gray-300" : ""
                      }`}
                      onClick={() => handleChildClick(child.id)}
                    >
                      <img
                        src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                        alt={parent.name}
                        className="w-10 h-10 object-cover mb-2  rounded-md"
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
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {parentCategories.map((parent) => (
              <li key={parent.id} className="mb-2" title={parent.name}>
                <div
                  className={`flex flex-col group cursor-pointer p-5 h-40 w-40 bg-white hover:bg-black hover:text-white rounded-[10px] shadow  ${
                    selectedParentId === parent.id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleParentClick(parent.id)}
                >
                  <img
                    src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                    alt={parent.name}
                    className="w-10 h-10 object-cover mb-2  rounded-md"
                  />
                  <div className="mt-auto">
                    <span className="flex items-center gap-2 capitalize text-sm font-bold">
                      {selectedParentId === parent.id && (
                        <Check className="text-green-500" />
                      )}
                      {parent.name}
                    </span>
                    <span className="text-gray-500 italic text-xs group-hover:text-white">
                      items : 20
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
      {/* <CategorySidebar onCategorySelect={handleCategorySelect} /> */}
    
        <ExploreStore data={{}} />{" "}
        {/* Assuming ExploreStore displays products */}
     
    </div>
  );
}

export default Page;
