"use client";
import axios from "axios";
import { Breadcrumb, Spinner, Tooltip } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { MdFavorite, MdPushPin } from "react-icons/md";
import { PiLineVerticalBold } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getProductDetails } from "./service/getData";
import ProductDetails from "./ProductDetails";
import { motion, AnimatePresence } from "framer-motion";

function ExploreStore() {
  const [parentCatList, setParentCatList] = useState([]);
  const [productList, setProductList] = useState(null);
  const [pinnedProducts, setPinnedProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [childCategories, setChildCategories] = useState([]);
  const [grandchildCategories, setGrandchildCategories] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedGrandchildId, setSelectedGrandChildId] = useState(null);
  const scrollableRef = useRef(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };
  const togglePin = (id) => {
    setPinnedProducts((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Fetch child categories when a parent category is selected
  useEffect(() => {
    if (selectedParentId === null) return;
    const fetchChildCategories = async () => {
      try {
        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedParentId}&category_type=child&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          setChildCategories(res.data.subcategories);
        }
      } catch (error) {
        console.error("Error fetching child categories:", error);
      }
    };

    fetchChildCategories();
  }, [selectedParentId]);

  // Fetch grandchild categories when a child category is selected
  useEffect(() => {
    console.log("Selected Child ID changed:", selectedChildId); // Debug log

    if (selectedChildId === null) return;

    const fetchGrandchildCategories = async () => {
      try {
        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedChildId}&category_type=grandchild&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          setGrandchildCategories(res.data.subcategories);
          handleCategorySelect(res.data.subcategories?.[0].id);
        }
      } catch (error) {
        console.error("Error fetching grandchild categories:", error);
      }
    };

    fetchGrandchildCategories();
  }, [selectedChildId]); // Ensure selectedChildId is included here

  // Fetch Parent Categories
  const fetchParentCategories = async () => {
    try {
      const response = await axios.get(
        "https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories"
      );
      setProductList(null);
      setParentCatList(response.data);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };
  useEffect(() => {
    fetchParentCategories();
  }, []);

  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      setProduct(res?.product);
    }
  };

  const handleCategorySelect = async (categoryId) => {
    try {
      const res = await axios.get(
        `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${categoryId}&category_type=products`
      );
      setProductList(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleBreadcrumbClick = (level) => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (level === "parent") {
      setSelectedChildId(null); // Reset child when breadcrumb for parent is clicked
    } else if (level === "root") {
      setSelectedParentId(null); // Reset parent and child when breadcrumb for root is clicked
      setSelectedChildId(null);
    }
  };
  const getBreadcrumb = () => {
    const parentName =
      parentCatList.find((pc) => pc.id === selectedParentId)?.name || "";
    const childName =
      childCategories.find((c) => c.id === selectedChildId)?.name || "";
    const grandchildName =
      grandchildCategories.find((gc) => gc.id === selectedGrandchildId)?.name ||
      "";

    // Capitalize and format breadcrumb parts
    const formatName = (name) =>
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return `categories${parentName ? `/${formatName(parentName)}` : ""}${
      childName ? `/${formatName(childName)}` : ""
    }${grandchildName ? `/${formatName(grandchildName)}` : ""}`;
  };

  const breadcrumbParts = getBreadcrumb().split("/");

  return (
    <section ref={scrollableRef} className="flex-1 overflow-y-auto bg-[#f3f3f3]">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )}

      <div className="flex items-center sticky top-0 justify-center bg-[#2d2762] p-4 z-10">
        {breadcrumbParts.map((part, index) => (
          <React.Fragment key={index}>
            <div
              className="relative"
              onMouseEnter={() => index === 1&& selectedChildId && setDropdownVisible(true)}
              onMouseLeave={() => index === 1 && setDropdownVisible(false)}
            >
              <span
                className={`cursor-pointer capitalize text-2xl font-bold text-white `}
                onClick={() => {
                  if (index === 0) handleBreadcrumbClick("root");
                  else if (index === 1) handleBreadcrumbClick("parent");
                }}
              >
                {part}
              </span>
              {/* Conditionally render the dropdown for parent */}
              {index === 1 && (
                <AnimatePresence>
                  {isDropdownVisible && childCategories.length > 0 && (
                    <motion.div
                      className="absolute top-full mt-2 left-0 w-60 bg-white border border-gray-200 shadow-lg rounded-lg"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      transition={{ duration: 0.2 }} // Adjust duration as needed
                    >
                      {childCategories.map((child) => (
                        <div
                          key={child.id}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-base font-semibold"
                          onClick={() => {
                            setSelectedChildId(child.id);
                            setDropdownVisible(false)
                          }}
                        >
                          {child.name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
            {index < breadcrumbParts.length - 1 && (
              <span className="mx-5"> <PiLineVerticalBold color="white"  size={30}/> </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="px-10 py-6 mb-10 bg-[#2d2762]">
        <Carousel opts={{ align: "start" }} className="w-full mt-5  max-w-7xl mx-auto text-white">
          <CarouselContent
            className={`gap-10 ${
              selectedChildId
                ? grandchildCategories.length < 8
                  ? "justify-center"
                  : ""
                : selectedParentId
                ? childCategories.length < 8
                  ? "justify-center"
                  : ""
                : parentCatList.length < 8
                ? "justify-center"
                : ""
            }`}
          >
            {selectedChildId && grandchildCategories.length > 0
              ? grandchildCategories.map((cat) => (
                  <CarouselItem
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`basis-[100%] md:basis-[10%] relative p-0 transition-all duration-300  cursor-pointer`}
                  >
                    <img
                      className="object-cover w-20  sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto border border-gray-200 rounded-md"
                      src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                      alt={cat.name}
                    />
                    <p className="mt-3 text-center text-xs  font-bold ">
                      <a href="#" title="" className="capitalize">
                        {cat.name}
                      </a>
                    </p>
                  </CarouselItem>
                ))
              : selectedParentId && childCategories.length > 0
              ? childCategories.map((cat) => (
                  <CarouselItem
                    key={cat.id}
                    onClick={() => setSelectedChildId(cat.id)}
                    className={`basis-[100%] md:basis-[10%] relative p-0 transition-all duration-300  cursor-pointer`}
                  >
                    <img
                      className="object-cover w-20  sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto border border-gray-200 rounded-md"
                      src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                      alt={cat.name}
                    />
                    <p className="mt-3 text-center text-xs  font-bold ">
                      <a href="#" title="" className="capitalize">
                        {cat.name}
                      </a>
                    </p>
                  </CarouselItem>
                ))
              : parentCatList?.map((cat) => (
                  <CarouselItem
                    key={cat.id}
                    onClick={() => setSelectedParentId(cat.id)}
                    className={`basis-[100%] md:basis-[10%] relative p-0 transition-all duration-300  cursor-pointer`}
                  >
                    <img
                      className="object-cover w-20  sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto border border-gray-200 rounded-md"
                      src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                      alt={cat.name}
                    />
                    <p className="mt-3 text-center text-xs  font-bold">
                      <a href="#" title="" className="capitalize">
                        {cat.name}
                      </a>
                    </p>
                  </CarouselItem>
                ))}
          </CarouselContent>
          {/* Conditionally render Next/Previous buttons based on the current active category list */}
          {selectedChildId ? (
            // We're in grandchild view
            grandchildCategories.length >= 9 ? (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            ) : null
          ) : selectedParentId ? (
            // We're in child view
            childCategories.length >= 9 ? (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            ) : null
          ) : parentCatList.length >= 9 ? (
            // We're in parent view
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          ) : null}
        </Carousel>
      </div>
      {/* Products */}
      <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8 pb-20">
        {productList?.category && (
          <section >
            <div className="max-w-7xl">
              <h2 className="text-2xl font-bold capitalize mb-10 text-gray-900 sm:text-3xl">
                {productList?.category?.name}
              </h2>
              <div className="grid gap-5 grid-cols-2 lg:grid-cols-4 sm:gap-8">
                {productList.products?.length ? (
                  productList.products.map((product) => (
                    <div key={product.id}>
                      <div
                        // onClick={() => handleCardClick(card)}
                        className={`flex flex-col overflow-hidden bg-white transition-all duration-700  rounded-md hover:scale-105 hover:shadow-2xl ${
                          pinnedProducts[product.id]
                            ? "border-2 border-black"
                            : " border border-gray-200"
                        } 
                        `}
                        // style={{
                        //   boxShadow: "1px 1px 10px 2px rgba(0, 0, 0, 0.1)",
                        // }}
                      >
                        <div className="relative flex-shrink-0 aspect-w-3 aspect-h-2 p-3 md:p-5 group ">
                          <div>
                            <div className="flex items-center mb-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePin(product.id); // Toggle pin color on click
                                }}
                                className="inline-flex items-center justify-center"
                              >
                                <MdPushPin
                                  className="md:w-5 md:h-5 sm:w-4 sm:h-4"
                                  style={{
                                    color: pinnedProducts[product.id]
                                      ? "black"
                                      : "gray", // Change color based on state
                                  }}
                                />
                              </button>

                              <span className="ml-4 font-bold text-[12px] md:text-base">
                                A2B7
                              </span>

                              <p className="ml-auto hidden text-sm font-semibold text-gray-500 italic group-hover:block">
                                Price : &#8377;{product?.price}
                              </p>
                            </div>
                          </div>

                          <div className="relative">
                            <Image
                              className="object-cover w-full h-full rounded-md "
                              src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                              alt="img"
                              width={300}
                              height={300}
                              onError={(e) => {
                                e.target.src =
                                  "https://dummyimage.com/300/09f/fff.png";
                              }}
                            />
                          </div>

                          <div className="flex flex-col flex-1">
                            <div className="hidden md:block mt-2">
                              <div className="flex items-center space-x-px">
                                {[...Array(5)].map((_, starIndex) => (
                                  <svg
                                    key={starIndex}
                                    className={`w-5 h-5 text-[#fed101]`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <h3
                              className={`text-[12px] md:text-[16px] capitalize font-bold text-gray-900 mt-2 flex-1 transition-all duration-200 overflow-hidden text-ellipsis`}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                minHeight: "2.5rem", // This reserves space for two lines
                              }}
                              dangerouslySetInnerHTML={{
                                __html: product?.name,
                              }}
                            ></h3>

                            <div className="flex items-center  flex-shrink-0 my-1  md:my-2">
                              <p
                                className={`text-[12px] md:text-lg font-semibold text-gray-500 italic`}
                              >
                                Price : &#8377; {product?.price}
                              </p>
                            </div>
                          </div>

                          <div className="hidden md:block absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0 bg-black px-2 py-3">
                            <div className=" flex items-center justify-between">
                              <button
                                type="button"
                                onClick={(e) =>
                                  fetchProductDetails(e, product.id)
                                }
                                className="inline-flex items-center justify-center py-2 px-4 text-sm  font-bold text-black bg-white rounded-md transition duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                              >
                                <IoBag className="w-4 h-4 mr-2" />{" "}
                                {/* Adjusted icon size and added spacing */}
                                Buy Now
                              </button>
                              <Tooltip content="Add to cart" placement="bottom">
                                <button
                                  //   onClick={(e) => addToCart(e, card.productId)}
                                  className="hover:bg-gray-200 rounded-md p-2 text-white hover:text-black"
                                >
                                  <IoMdCart size={20} />
                                </button>
                              </Tooltip>
                              <Tooltip
                                content="Add to wishlist"
                                placement="bottom"
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // setProductId(card.productId);
                                    // setShowWishlistModal(true);
                                  }}
                                  className="hover:bg-gray-200 rounded-md p-2"
                                >
                                  <MdFavorite size={20} color="red" />
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                          <div className="block md:hidden">
                            <div className=" flex items-center justify-between">
                              <button
                                type="button"
                                className="inline-flex items-center justify-center py-1 px-2 text-[12px]  font-bold text-white bg-black rounded-md "
                              >
                                <IoBag className="w-4 h-4 mr-1" />{" "}
                                {/* Adjusted icon size and added spacing */}
                                Buy
                              </button>
                              <Tooltip content="Add to cart" placement="bottom">
                                <button
                                  //   onClick={(e) => addToCart(e, card.productId)}
                                  className="hover:bg-gray-200 rounded-md p-2 text-black "
                                >
                                  <IoMdCart size={20} />
                                </button>
                              </Tooltip>
                              <Tooltip
                                content="Add to wishlist"
                                placement="bottom"
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // setProductId(card.productId);
                                    // setShowWishlistModal(true);
                                  }}
                                  className="hover:bg-gray-200 rounded-md p-2"
                                >
                                  <MdFavorite size={20} color="red" />
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          </section>
        )}
        {product && (
          <ProductDetails
            open={true}
            close={() => setProduct(null)}
            data={product}
          />
        )}
      </div>
    </section>
  );
}

export default ExploreStore;
