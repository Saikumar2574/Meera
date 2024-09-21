"use client";
import { Spinner, Tooltip } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { MdFavorite, MdPushPin } from "react-icons/md";
import { getProductDetails } from "./service/getData";
import ProductDetails from "./ProductDetails";

function ExploreStore({ data }) {
  const [pinnedProducts, setPinnedProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const togglePin = (id) => {
    setPinnedProducts((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      setProduct(res?.product);
    }
  };

  return (
    <section className="p-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )}
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {data?.map((product) => (
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
                          color: pinnedProducts[product.id] ? "black" : "gray", // Change color based on state
                        }}
                      />
                    </button>

                    <span className="ml-4 font-bold text-[12px] text-black md:text-base">
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
                      e.target.src = "https://dummyimage.com/300/09f/fff.png";
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
                      onClick={(e) => fetchProductDetails(e, product.id)}
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
                    <Tooltip content="Add to wishlist" placement="bottom">
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
                    <Tooltip content="Add to wishlist" placement="bottom">
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
        ))}
      </div>
      {product && (
        <ProductDetails
          open={true}
          close={() => setProduct(null)}
          data={product}
        />
      )}
    </section>
  );
}

export default ExploreStore;
