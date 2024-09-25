"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart, FaEye, FaThumbtack } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { Tooltip } from "flowbite-react";

function Page() {
  const iconVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="overflow-y-auto h-full">
      <section className="py-12 bg-gray-500 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 gap-4 mt-8 sm:mt-12 sm:gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden bg-white group transition-all p-3 md:p-5  duration-700 rounded-md hover:scale-105 hover:shadow-2xl"
              >
                {/* <div className="relative flex-shrink-0 aspect-w-3 aspect-h-2 p-3 md:p-5  "> */}
                <div className="flex items-center mb-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // togglePin(product.id); // Toggle pin color on click
                    }}
                    className="inline-flex items-center justify-center"
                  >
                    <FaThumbtack className="md:w-5 md:h-5 sm:w-4 sm:h-4 text-gray-600" />
                  </button>

                  <span className="ml-4 font-bold text-sm md:text-base">
                    A2B7
                  </span>

                  <p className="ml-auto hidden text-sm font-semibold text-gray-500 italic group-hover:block">
                    Price : &#8377;5000
                  </p>
                </div>

                {/* Image with Hover Effect */}
                <div className="relative flex-shrink-0 overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover rounded-md w-full h-full transition-all duration-300 "
                    src={`https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/3/product-${
                      index + 5
                    }.png`}
                    alt=""
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
                    className={`text-sm md:text-base capitalize font-bold text-gray-900 mt-2 flex-1 transition-all duration-200 overflow-hidden text-ellipsis`}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: "2.5rem", // This reserves space for two lines
                    }}
                  >
                    Product Name
                  </h3>

                  <div className="flex items-center  flex-shrink-0 my-1  md:my-2">
                    <p
                      className={`text-sm md:text-lg font-semibold text-gray-500 italic`}
                    >
                      Price : &#8377;5000
                    </p>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0 bg-black px-2 py-3">
                  <div className=" flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center py-2 px-4 text-sm  font-bold text-black bg-white rounded-md transition duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      <IoBag className="w-4 h-4 mr-2" /> Buy Now
                    </button>
                    <Tooltip content="Add to cart" placement="bottom">
                      <button className="hover:bg-gray-200 rounded-md p-2 text-white hover:text-black">
                        <FaShoppingCart size={20} />
                      </button>
                    </Tooltip>
                    <Tooltip content="Add to wishlist" placement="bottom">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="hover:bg-gray-200 rounded-md p-2"
                      >
                        <FaHeart size={20} color="red" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 gap-4 mt-8 sm:mt-12 sm:gap-6 lg:grid-cols-4">
            {/* Reusable Card Component */}
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col overflow-hidden bg-white rounded-xl group"
              >
                {/* Top-left Pin Icon */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>

                {/* Image with Hover Effect */}
                <div className="relative flex-shrink-0 overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                    src={`https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/3/product-${
                      index + 5
                    }.png`}
                    alt=""
                  />

                  {/* Icons on Right (Cart, Wishlist, View) */}
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaEye
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Product Information */}
                <div className="flex flex-col flex-1 px-4 py-5 sm:px-5 sm:py-6">
                  <p className="text-xs font-bold tracking-wide text-gray-400 uppercase">
                    Winter Collection
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 flex-1 mt-2.5">
                    <a href="#" title="">
                      Product Name
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 font-bold mt-2.5">
                    $23.88
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2crad */}

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 mt-12 text-center sm:grid-cols-2 lg:gap-5 lg:grid-cols-4 sm:mt-16">
            {/* First Card */}
            <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col ">
              {/* Pin icon in the top-left corner */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-5 left-5 z-10"
              >
                <FaThumbtack className="text-gray-600" />
              </motion.div>

              {/* Product Image */}
              <div className="relative group">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-1.png"
                    alt="Arion 30 Smart Light"
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 mt-2">
                  <a href="#" title="Arion 30 Smart Light">
                    Arion 30 Smart Light
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <p className="mt-2 text-sm font-bold text-gray-500">$79.00</p>
              </div>

              {/* Buy Now, Cart, Wishlist buttons */}
              <div className="relative flex items-center justify-between w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                {/* Background animation */}
                <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>

                {/* Buy Now button */}
                <button className="relative z-10 group-hover:text-white">
                  Buy Now
                </button>

                {/* Cart Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaShoppingCart className="h-6 w-6" />
                </button>

                {/* Wishlist Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaHeart className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Repeat the same structure for other cards */}
            <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-5 left-5 z-10"
              >
                <FaThumbtack className="text-gray-600" />
              </motion.div>
              <div className="relative group">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-2.png"
                    alt="Beoplay M5 Bluetooth Speaker"
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 mt-2">
                  <a href="#" title="Beoplay M5 Bluetooth Speaker">
                    Beoplay M5 Bluetooth Speaker
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <p className="mt-2 text-sm font-bold text-gray-500">$49.00</p>
              </div>
              <div className="relative flex items-center justify-between w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                {/* Background animation */}
                <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>

                {/* Buy Now button */}
                <button className="relative z-10 group-hover:text-white">
                  Buy Now
                </button>

                {/* Cart Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaShoppingCart className="h-6 w-6" />
                </button>

                {/* Wishlist Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaHeart className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Third Card */}
            <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col ">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-5 left-5 z-10"
              >
                <FaThumbtack className="text-gray-600" />
              </motion.div>
              <div className="relative group">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-3.png"
                    alt="Beylob 90 Speaker"
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 mt-2">
                  <a href="#" title="Beylob 90 Speaker">
                    Beylob 90 Speaker
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <p className="mt-2 text-sm font-bold text-gray-500">
                  $19.00-$29.00
                </p>
              </div>
              <div className="relative flex items-center justify-between w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                {/* Background animation */}
                <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>

                {/* Buy Now button */}
                <button className="relative z-10 group-hover:text-white">
                  Buy Now
                </button>

                {/* Cart Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaShoppingCart className="h-6 w-6" />
                </button>

                {/* Wishlist Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaHeart className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col ">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-5 left-5 z-10"
              >
                <FaThumbtack className="text-gray-600" />
              </motion.div>

              <div className="relative group">
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                  <img
                    class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-4.png"
                    alt=""
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 mt-2">
                  <a href="#" title="Beylob 90 Speaker">
                    Apple Smart Watch 6 Edition
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <p className="mt-2 text-sm font-bold text-gray-500">$259.00</p>
              </div>
              <div className="relative flex items-center justify-between w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                {/* Background animation */}
                <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>

                {/* Buy Now button */}
                <button className="relative z-10 group-hover:text-white">
                  Buy Now
                </button>

                {/* Cart Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaShoppingCart className="h-6 w-6" />
                </button>

                {/* Wishlist Icon */}
                <button className="relative z-10 text-gray-400 group-hover:text-white">
                  <FaHeart className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3rd card */}
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-4 sm:mt-10">
            <div class="relative overflow-hidden bg-white border border-gray-200 rounded-xl group">
              <div class="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class=" relative aspect-w-1 aspect-h-1">
                  <img
                    class="object-cover w-full h-full p-4"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/1/product-1.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                <div class="px-6 py-4">
                  <p class="text-xs font-medium tracking-widest text-gray-500 uppercase">
                    Dove
                  </p>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">
                    <a href="#" title="">
                      Body Wash with Pump with Skin Natural
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <div class="flex items-center mt-2.5">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-500 ml-1.5">
                      (431)
                    </p>
                  </div>
                  <p class="mt-5 text-sm font-bold text-gray-900">$19.93</p>
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0">
                <button
                  type="button"
                  class="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gray-900"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div class="relative overflow-hidden bg-white border border-gray-200 rounded-xl group">
              <div class="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class=" relative aspect-w-1 aspect-h-1">
                  <img
                    class="object-cover w-full h-full p-4"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/1/product-2.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                <div class="px-6 py-4">
                  <p class="text-xs font-medium tracking-widest text-gray-500 uppercase">
                    Cerave
                  </p>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">
                    <a href="#" title="">
                      Cerave Hyaluronic Acid Serum for Face
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <div class="flex items-center mt-2.5">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-500 ml-1.5">
                      (114)
                    </p>
                  </div>
                  <p class="mt-5 text-sm font-bold text-gray-900">$7.49</p>
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0">
                <button
                  type="button"
                  class="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gray-900"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div class="relative overflow-hidden bg-white border border-gray-200 rounded-xl group">
              <div class="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class="relative aspect-w-1 aspect-h-1">
                  <img
                    class="object-cover w-full h-full p-4"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/1/product-3.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                <div class="px-6 py-4">
                  <p class="text-xs font-medium tracking-widest text-gray-500 uppercase">
                    NewYorkBiology
                  </p>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">
                    <a href="#" title="">
                      New York Biology Dead Sea Mud Mask for Face
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <div class="flex items-center mt-2.5">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-500 ml-1.5">
                      (249)
                    </p>
                  </div>
                  <p class="mt-5 text-sm font-bold text-gray-900">$11.99</p>
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0">
                <button
                  type="button"
                  class="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gray-900"
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div class="relative overflow-hidden bg-white border border-gray-200 rounded-xl group">
              <div class="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class=" relative aspect-w-1 aspect-h-1">
                  <img
                    class="object-cover w-full h-full p-4"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/1/product-4.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                <div class="px-6 py-4">
                  <p class="text-xs font-medium tracking-widest text-gray-500 uppercase">
                    Aveeno
                  </p>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">
                    <a href="#" title="">
                      Positively Radiant Skin Brightening Facial Scrub
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </h3>
                  <div class="flex items-center mt-2.5">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-gray-500 ml-1.5">
                      (358)
                    </p>
                  </div>
                  <p class="mt-5 text-sm font-bold text-gray-900">$11.99</p>
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0">
                <button
                  type="button"
                  class="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gray-900"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4th card */}
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="grid grid-cols-2 gap-3 mt-8 sm:gap-6 lg:gap-8 xl:gap-12 sm:mt-12 lg:grid-cols-4">
            <div class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl group">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class="relative flex-shrink-0 aspect-w-3 aspect-h-2 ">
                  <img
                    class="object-contain w-full h-full p-8"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-1.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div class="flex flex-col flex-1 p-4">
                <div class="flex items-center flex-shrink-0">
                  <p class="text-sm font-bold text-gray-900">$56.93</p>
                  <p class="text-sm text-gray-400 font-bold ml-2.5">$79.49</p>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                  <a href="#" title="">
                    {" "}
                    Columbia Men's Bahama Vent PFG Boat Shoe{" "}
                  </a>
                </h3>
                <div class="flex items-center justify-between mt-8">
                  <div class="sm:flex sm:items-center lg:flex-col xl:flex-row lg:items-start xl:items-center">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="mt-1 text-xs font-medium text-gray-400 sm:text-sm sm:mt-0 sm:ml-2 lg:ml-0 lg:mt-1 xl:ml-2 xl:mt-0">
                      15 Reviews
                    </p>
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-blue-600"
                  >
                    <FaEye size={30} className="text-white p-2 rounded-full" />
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl group">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class="relative flex-shrink-0 aspect-w-3 aspect-h-2">
                  <img
                    class="object-contain w-full h-full p-8"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-2.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div class="flex flex-col flex-1 p-4">
                <div class="flex items-center flex-shrink-0">
                  <p class="text-sm font-bold text-gray-900">$24.49</p>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                  <a href="#" title="">
                    {" "}
                    New Balance Men's 481 V3 Trail Running Shoe{" "}
                  </a>
                </h3>
                <div class="flex items-center justify-between mt-8">
                  <div class="sm:flex sm:items-center lg:flex-col xl:flex-row lg:items-start xl:items-center">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="mt-1 text-xs font-medium text-gray-400 sm:text-sm sm:mt-0 sm:ml-2 lg:ml-0 lg:mt-1 xl:ml-2 xl:mt-0">
                      39 Reviews
                    </p>
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-blue-600"
                  >
                    <FaEye size={30} className="text-white p-2 rounded-full" />
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl group">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class="relative flex-shrink-0 aspect-w-3 aspect-h-2">
                  <img
                    class="object-contain w-full h-full p-8"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-3.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div class="flex flex-col flex-1 p-4">
                <div class="flex items-center flex-shrink-0">
                  <p class="text-sm font-bold text-gray-900">$49.93</p>
                  <p class="text-sm text-gray-400 font-bold ml-2.5">$69.19</p>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                  <a href="#" title="">
                    {" "}
                    Under Armour Men's Shadow Running Shoe{" "}
                  </a>
                </h3>
                <div class="flex items-center justify-between mt-8">
                  <div class="sm:flex sm:items-center lg:flex-col xl:flex-row lg:items-start xl:items-center">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="mt-1 text-xs font-medium text-gray-400 sm:text-sm sm:mt-0 sm:ml-2 lg:ml-0 lg:mt-1 xl:ml-2 xl:mt-0">
                      22 Reviews
                    </p>
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-blue-600"
                  >
                    <FaEye size={30} className="text-white p-2 rounded-full" />
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl group">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <FaThumbtack className="text-gray-600" />
                </motion.div>
                <div class="relative flex-shrink-0 aspect-w-3 aspect-h-2">
                  <img
                    class="object-contain w-full h-full p-8"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-4.png"
                    alt=""
                  />
                  <motion.div className="absolute bottom-3 right-3 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaShoppingCart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart
                        size={30}
                        className="text-white bg-gray-400 p-2 rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div class="flex flex-col flex-1 p-4">
                <div class="flex items-center flex-shrink-0">
                  <p class="text-sm font-bold text-gray-900">$89.39</p>
                  <p class="text-sm text-gray-400 font-bold ml-2.5">$119.99</p>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
                  <a href="#" title="">
                    {" "}
                    Adidas Men's Kaptir Super Trail Running Shoe{" "}
                  </a>
                </h3>
                <div class="flex items-center justify-between mt-8">
                  <div class="sm:flex sm:items-center lg:flex-col xl:flex-row lg:items-start xl:items-center">
                    <div class="flex items-center space-x-px">
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p class="mt-1 text-xs font-medium text-gray-400 sm:text-sm sm:mt-0 sm:ml-2 lg:ml-0 lg:mt-1 xl:ml-2 xl:mt-0">
                      28 Reviews
                    </p>
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-blue-600"
                  >
                    <FaEye size={30} className="text-white p-2 rounded-full" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
