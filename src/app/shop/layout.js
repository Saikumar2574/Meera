"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useRouter, usePathname } from "next/navigation";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IoFilterSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useOutsideClick } from "@/lib/hooks/OutsideClick";
import { Avatar } from "flowbite-react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const ProductSidebar = dynamic(() => import("@/components/productSidebar"), {
  suspense: true,
  ssr: false,
});

const ShopLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const token = useSelector((state) => state.auth?.token || null);
  const [breadcrumbArray, setBreadcrumbArray] = useState([]);
  const [dragStarted, setDragStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Relevence");
  const dropdownRef = useRef(null); // Reference for the dropdown
  const pinnedProducts = useSelector((state) => state.products?.selectedIds);

  const [activeTab, setActiveTab] = useState(null);
  const menuRef = useRef(null);
  useOutsideClick(menuRef, () => setActiveTab(null));

  const tabs = [
    { label: "Meera Insights", content: "Meera Insights content here" },
    { label: "Conversation", content: "Conversation content here" },
    {
      label: "Pinned",
      content: (
        <div className="product-list grid grid-cols-1 gap-4">
          {pinnedProducts?.map((product) => (
            <div
              key={product.id}
              className="flex items-center border-b pb-4 gap-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-blue-500">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    { label: "Shortlist Items", content: "Shortlist Items content here" },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    "Price : High-Low",
    "Price : Low-High",
    "Relevence",
    "Sort By Latest",
  ];
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Generate breadcrumbs based on the current route
  useEffect(() => {
    if (!pathname.includes("/shop/history")) {
      const pathSegments = pathname.split("/").filter((segment) => segment);

      const generatedBreadcrumb = pathSegments.map((segment, index) => ({
        name: capitalizeWords(segment),
        level:
          index === 0
            ? "root"
            : index === 1
            ? "parent"
            : index === 2
            ? "child"
            : index === 3
            ? "grandchild"
            : "product",
        url: "/" + pathSegments.slice(0, index + 1).join("/"),
      }));
      setBreadcrumbArray(generatedBreadcrumb);
    } else {
      setBreadcrumbArray([]);
    }
  }, [pathname]);

  // Breadcrumb Click Logic
  const handleBreadcrumbClick = (item) => {
    router.push(item.url); // Navigate to the clicked breadcrumb's URL
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
  };

  useEffect(() => {
    if (!token) {
      router.push("/shop");
    }
  }, [token]);

  return (
    <div className="w-full flex h-full">
      <aside className="hidden md:block w-16 fixed left-0 top-0 bottom-0 z-40 bg-[#04102f]">
        <Sidebar />
      </aside>

      <DragDropContext
        onDragEnd={handleDragEnd}
        onDragStart={() => setDragStarted(true)}
      >
        <div className={`flex flex-1 overflow-hidden ml-16  `}>
          <ProductSidebar breadcrumbArray={breadcrumbArray} page="shop" />
          <div className="flex-1 w-full flex flex-col transition-all duration-300 ">
            <main id="scrollableDiv" className=" h-full overflow-y-auto">
            { !(pathname.includes("/shop/history") || breadcrumbArray.some((item) => item.level === "product")) && (
                <div className="sticky top-0 bg-white w-full z-20">
                  <header className="block xl:hidden">
                    <Header />
                    <div className="relative bg-[#f1f1f1]">
                      <div className="grid grid-cols-4">
                        {tabs.map((tab, index) => (
                          <div
                            key={index}
                            className={`relative py-2 border-l border-b border-gray-300 ${
                              activeTab === index
                                ? "bg-[#04102f] text-white"
                                : ""
                            }`}
                          >
                            <div
                              className="flex justify-between gap-4 items-center cursor-pointer"
                              onClick={() =>
                                setActiveTab(activeTab === index ? null : index)
                              }
                            >
                              <p
                                className={`w-full py-2 px-4 font-semibold ${
                                  index !== 2 && "text-center"
                                } ${
                                  activeTab === index
                                    ? "text-white"
                                    : "text-gray-800"
                                }`}
                              >
                                {tab.label}
                              </p>

                              {/* Show avatars only for index 2 and when there are pinned products */}
                              {index === 2 &&
                                (pinnedProducts && pinnedProducts.length > 0 ? (
                                  <Avatar.Group className="mr-2 ">
                                    {/* Render avatar images */}
                                    {pinnedProducts
                                      .slice(0, 3)
                                      .map((product, i) => (
                                        <Avatar
                                          key={i}
                                          img={product.image} // Assuming pinnedProducts contain img links
                                          rounded
                                          stacked
                                        />
                                      ))}

                                    {/* Show counter for remaining avatars */}
                                    {pinnedProducts.length > 3 && (
                                      <Avatar.Counter
                                        total={pinnedProducts.length - 3}
                                        href="#" // Link to more details if needed
                                      />
                                    )}
                                  </Avatar.Group>
                                ) : (
                                  <span className="font-bold mr-2">0</span>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {activeTab !== null && (
                        <motion.div
                          ref={menuRef}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-0 right-0 w-full bg-white shadow-md rounded mt-2 z-30"
                        >
                          <div className="p-4">{tabs[activeTab].content}</div>
                        </motion.div>
                      )}
                    </div>
                  </header>

                  <div className="flex ml-10  justify-between items-end py-4  px-3">
                    <div className=" capitalize text-base font-semibold italic ">
                      <h6 className="italic font-bold text-gray-500  text-sm">
                        Breadcrub
                      </h6>
                      {breadcrumbArray.map((item, index) => {
                        const decodedName = decodeURIComponent(
                          item.name === "Shop" ? "Home" : item.name
                        );

                        return (
                          <React.Fragment key={index}>
                            <span
                              className={`cursor-pointer capitalize ${
                                index < breadcrumbArray.length - 1
                                  ? "text-blue-500"
                                  : "text-black"
                              }`}
                              onClick={() => handleBreadcrumbClick(item)}
                            >
                              {decodedName}
                            </span>
                            {index < breadcrumbArray.length - 1 && " | "}
                          </React.Fragment>
                        );
                      })}
                    </div>
                    {breadcrumbArray.some(
                      (item) => item.level === "grandchild"
                    ) && (
                      <div
                        className="relative"
                        ref={dropdownRef}
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={toggleDropdown}
                      >
                        <input
                          type="text"
                          value={selectedOption}
                          readOnly
                          className="border rounded-xl py-3 px-6 bg-[#04102f] text-sm font-semibold text-white w-full cursor-pointer focus:outline-none focus:ring-0"
                          placeholder="Select an option"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                          <motion.span
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IoFilterSharp size={22} color="white" />
                          </motion.span>
                        </div>

                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-10  w-full "
                          >
                            <div className="bg-gray-200 border rounded mt-2 shadow-lg p-2">
                              {options.map((option, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleOptionClick(option)}
                                  className="p-2 hover:bg-white rounded-md cursor-pointer text-sm font-semibold"
                                >
                                  {option}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="ml-10 mt-10 px-3 ">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-full">
                      <p>Loading...</p>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </div>
            </main>
            {breadcrumbArray.some((item) => item.level === "grandchild") && (
              <Footer />
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ShopLayout;
