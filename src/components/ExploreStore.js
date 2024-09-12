"use client";
import axios from "axios";
import { Breadcrumb, Spinner, Tooltip } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { MdFavorite, MdPushPin } from "react-icons/md";

function ExploreStore() {
  const [catList, setCatList] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]); // Track breadcrumb navigation
  const [currentCategory, setCurrentCategory] = useState(null); // Current selected category
  const [productList, setProductList] = useState(null);
  const [pinnedProducts, setPinnedProducts] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePin = (id) => {
    setPinnedProducts((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the pin status for the clicked product
    }));
  };
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://gearnride.in/wp-json/custom-api/v1/parent-categories"
      );
      if (res) {
        setProductList(null);
        setBreadcrumbs([]); // Reset breadcrumbs for root categories
        setCatList(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = async (category, breadcrumbIndex = null) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://gearnride.in/wp-json/custom-api/v1/parent-categories?category_id=${category.id}&page=1&per_page=50`
      );
      if (res) {
        if (res.data?.subcategories?.length > 0) {
          setProductList(null);

          if (breadcrumbIndex === null) {
            // Check if the category already exists in the breadcrumbs
            setBreadcrumbs((prev) => {
              const categoryExists = prev.find(
                (crumb) => crumb.id === category.id
              );
              if (!categoryExists) {
                return [...prev, category];
              }
              return prev;
            });
          } else {
            // Handle breadcrumb click, slicing the array
            setBreadcrumbs((prev) => prev.slice(0, breadcrumbIndex + 1));
          }

          setCatList(res.data.subcategories);
        } else {
          setProductList(res.data);
        }
        setCurrentCategory(category);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const Breadcrumbs = () => (
    <nav className="flex rounded-lg w-full mb-4">
      <Breadcrumb
        aria-label="breadcrumb"
        separator={<span className="mx-2">/</span>}
      >
        <Breadcrumb.Item
          theme={{
            base: "group flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer",
          }}
          onClick={() => {
            setProductList(null);
            setCatList([]);
            setBreadcrumbs([]);
            setCurrentCategory(null);
            getAllCategories();
          }}
        >
          All Categories
        </Breadcrumb.Item>
        {breadcrumbs.map((crumb, index) => (
          <Breadcrumb.Item
            theme={{
              base: "group flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer",
            }}
            key={crumb.id}
            onClick={() => {
              getCategoryData(crumb, index);
            }}
          >
            {crumb.name}
          </Breadcrumb.Item>
        ))}
        {currentCategory && productList?.category && (
          <Breadcrumb.Item
            theme={{
              base: "group flex items-center text-gray-600",
            }}
          >
            {currentCategory.name}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </nav>
  );
  return (
    <section className="py-10 ">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )}
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs />

        {/* Root Categories */}
        {!productList && !currentCategory && catList.length > 0 && (
          <div>
            <div className="flex items-center justify-center text-center md:justify-between sm:text-left">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Popular Categories
                </h2>
                <p className="text-base text-gray-600 font-normal mt-2.5">
                  Choose from a wide variety of items
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-10 mt-8 text-center">
              {catList.length > 0 ? (
                catList.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => getCategoryData(cat)}
                    className="relative transition-all duration-300 bg-gray-100 rounded-xl hover:shadow-xl hover:bg-white"
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <img
                        className="object-cover w-24 h-24 mx-auto border border-gray-200 rounded-full"
                        src={cat.image}
                        alt={cat.name}
                      />
                      <p className="mt-5 text-base font-bold text-gray-900">
                        <a href="#" title="" className="capitalize">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: cat.name,
                            }}
                          />
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>
          </div>
        )}

        {/* Subcategories */}
        {!productList && currentCategory && catList.length > 0 && (
          <>
            <div className="flex items-center justify-center text-center md:justify-between sm:text-left">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {currentCategory.name} Categories
                </h2>
                <p className="text-base text-gray-600 font-normal mt-2.5">
                  Choose from a wide variety of items
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-10 mt-8 text-center">
              {catList.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => getCategoryData(cat)}
                  className="relative transition-all duration-300 bg-gray-100 rounded-xl hover:shadow-xl hover:bg-white"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <img
                      className="object-cover w-24 h-24 mx-auto border border-gray-200 rounded-full"
                      src={cat.image}
                      alt={cat.name}
                    />
                    <p className="mt-5 text-base font-bold text-gray-900">
                      <a href="#" title="" className="capitalize">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: cat.name,
                          }}
                        />
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Products */}
        {productList?.category && (
          <section className=" bg-white">
            <div className="max-w-7xl">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Category: {productList?.category?.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-10 mt-12 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16 sm:gap-8">
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

                              <span className="ml-4 font-bold text-[16px]">
                                A2B7
                              </span>

                              <span
                                className="ml-auto font-bold text-[16px] italic"
                                style={{
                                  textShadow: "0px 0px 8px yellow", // Adds a blurred yellow shadow behind the text
                                }}
                              >
                                Top Pick
                              </span>
                            </div>
                          </div>

                          <div className="relative">
                            <Image
                              className="object-cover w-full h-full rounded-md "
                              src={product.image}
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
                              className={`text-[16px] md:text-[16px] capitalize font-bold text-gray-900 mt-2 flex-1 transition-all duration-200 overflow-hidden text-ellipsis`}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                minHeight: "2.5rem", // This reserves space for two lines
                              }}
                              dangerouslySetInnerHTML={{
                                __html: product.name,
                              }}
                            ></h3>

                            <div className="flex items-center  flex-shrink-0 my-2">
                              <p
                                className={`text-[16px] md:text-lg font-semibold text-gray-500 italic`}
                              >
                                Price : &#8377; {product?.price}
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0 bg-black px-2 py-3">
                            <div className=" flex items-center justify-between">
                              <button
                                type="button"
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
      </div>
    </section>
  );
}

export default ExploreStore;
