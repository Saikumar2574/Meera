"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import {
  Carousel as CustomCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { Button, Card, Drawer } from "flowbite-react";
import { HiCheck, HiShoppingCart } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosGitCompare, IoMdAddCircleOutline } from "react-icons/io";
import Categories from "./Categories";
import FAQSection from "./Faq";
import ProductDetails from "./ProductDetails";
import { RiShoppingBasketLine } from "react-icons/ri";
import CompareList from "./CompareList";

export default function ChatWindow({ products }) {
  const colors = [
    { value: "#000000", label: "Black" },
    { value: "#0000FF", label: "Blue" },
    { value: "#FF0000", label: "Red" },
  ];
  const sizes = ["S", "M", "L", "XL"];

  const [expandedCard, setExpandedCard] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.value);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [mainImage, setMainImage] = useState("");
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);
  const [openConsideration, setOpenConsideration] = useState(false);
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleCardClick = (card) => {
    setExpandedCard(card);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setExpandedCard(null);
  };

  const handleOutsideClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      handleCloseDrawer();
    }
  };

  useEffect(() => {
    if (drawerOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = ""; // Enable scrolling
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = ""; // Ensure scrolling is enabled on cleanup
    };
  }, [drawerOpen]);

  useEffect(() => {
    setMainImage(expandedCard?.images?.[0]?.src);
  }, [expandedCard]);

  // const getProducts = async (text) => {
  //   try {
  //     const username = "ck_86c5a53a797841fa5d183820f96e17afdc55cf76";
  //     const password = "cs_45ca218ca515a53650831ad96465cc7f0cdee24f";
  //     const basicAuth = btoa(`${username}:${password}`);
  //     const response = await axios.get(
  //       `https://gearnride.in/wp-json/wc/v3/products?status=publish&search=${text}`,
  //       {
  //         headers: {
  //           Authorization: `Basic ${basicAuth}`,
  //         },
  //       }
  //     );
  //     setSearchText("");
  //     setProducts(response.data);
  //     console.log(response.data); // Handle the response data
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // const onSubmitText = (text) => {
  //   getProducts(text);
  // };

  const customTheme = {
    root: {
      children: "flex h-full flex-col justify-center gap-4 p-3",
    },
  };

  const categoryProd = [
    {
      img: "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-1.png",
      title: "Columbia Men's Bahama Vent PFG Boat",
      sale_price: 56.93,
      regular_prire: 72.03,
      reviewCount: 20,
      rating: 5,
    },
    {
      img: "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-2.png",
      title: "New Balance Men's 481 V3 Trail Running Shoe",
      sale_price: 24.49,
      regular_prire: null,
      reviewCount: 20,
      rating: 5,
    },
    {
      img: "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-1.png",
      title: " Under Armour Men's Shadow Running Shoe",
      sale_price: 79.53,
      regular_prire: 85.99,
      reviewCount: 20,
      rating: 5,
    },
    {
      img: "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-4.png",
      title: " Adidas Men's Kaptir Super Trail Running Shoe",
      sale_price: 56.93,
      regular_prire: 72.03,
      reviewCount: 20,
      rating: 5,
    },
    {
      img: "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-2.png",
      title: "New Balance Men's 481 V3 Trail Running Shoe",
      sale_price: 24.49,
      regular_prire: null,
      reviewCount: 20,
      rating: 5,
    },
    {
      img: "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/2/product-1.png",
      title: "Columbia Men's Bahama Vent PFG Boat Shoe",
      sale_price: 56.93,
      regular_prire: 72.03,
      reviewCount: 20,
      rating: 5,
    },
  ];

  return (
    <>
      <div className="max-w-[1100px] w-full h-full p-6 flex flex-col relative ">
        <h2 className="mt-30 text-xl font-bold sm:text-5xl dark:text-white text-black">
          Welcome to Gear N Rides
        </h2>
        <p className="mt-[40px] mb-8 text-left lg:w-[900px] sm:w-full  text-gray-500 text-[20px]">
          Hey there, welcome to the interactive store of **GEAR N RIDE**! We
          specialize in offering high-quality motorcycle gear and accessories to
          enhance your riding experience.
        </p>

        {products?.length > 0 && (
          <section className=" mt-[40px]">
            <div className="mx-auto max-w-7xl">
              <CustomCarousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {products?.map((card, index) => (
                    <CarouselItem
                      key={index}
                      onClick={() => handleCardClick(card)}
                      className="md:basis-1/2 lg:basis-1/4"
                    >
                      <Card
                        className="max-w-sm"
                        imgAlt="img"
                        imgSrc={card.images?.[0]?.src}
                        theme={customTheme}
                      >
                        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 overflow-hidden">
                          {card.name}
                        </h5>
                        <div className="mt-1 flex items-center">
                          <svg
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {/* Repeat the svg elements as needed */}
                          <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                            5.0
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            &#8377;{card.price}
                          </span>
                          <a
                            href="#"
                            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-md font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                          >
                            Add to cart
                          </a>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </CustomCarousel>
            </div>
          </section>
        )}

        <Categories />
        <button
          type="button"
          onClick={() => setOpenConsideration(true)}
          class="inline-flex w-56 items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
        >
          Show Considerations
        </button>
        <Drawer
          open={openConsideration}
          onClose={() => setOpenConsideration(false)}
          position="right"
          className="bg-[#04102f] w-[25%]"
        >
          <Drawer.Items className="p-4">
            <h2 className="text-2xl font-bold italic text-white">
              RIDING JACKETS for my trip with cousins
            </h2>
            <div className="mt-5">
              <h5 className="text-2xl font-bold text-orange-300 ">
                Considerations:
              </h5>
              <p className="font-medium text-gray-400 text-lg">
                Hey there, welcome to the interactive store of **GEAR N RIDE**!
                We specialize in offering high-quality motorcycle gear and
                accessories to enhance your riding experience.
              </p>
            </div>
            <div className="mt-10">
              <h5 className="text-2xl font-bold text-orange-300 ">
                Recommandations:
              </h5>
              <p className="font-medium text-gray-400 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Eleifend nullam consectetur. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Eleifend nullam consectetur.
              </p>
            </div>
          </Drawer.Items>
        </Drawer>

        <section class="mt-10 ">
          <div class="mx-auto max-w-7xl">
            <div class="text-center lg:text-left">
              <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                Shoes for men
              </h2>
            </div>
            <CustomCarousel opts={{ align: "start" }} className="w-full mt-8">
              <CarouselContent>
                {categoryProd?.map((card, index) => (
                  <CarouselItem
                    key={index}
                    className=" basis-[50%] md:basis-1/2 lg:basis-1/3"
                  >
                    <div class=" flex flex-col overflow-hidden transition-all duration-300  border bg-white border-gray-200 rounded-md hover:shadow-xl">
                      <div class=" relative flex-shrink-0 aspect-w-3 aspect-h-2">
                        <img
                          class="object-contain w-full h-full p-8"
                          src={card?.img}
                          alt=""
                        />
                        <div class="absolute z-10 top-3 right-3">
                          <button
                            type="button"
                            class="inline-flex items-center justify-center text-gray-400 hover:text-rose-500"
                          >
                            <svg
                              class="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>

                        <div class="absolute z-10 top-3 left-3">
                          <button
                            type="button"
                            onClick={() => setOpenCompare(true)}
                            class="inline-flex items-center justify-center text-gray-400 hover:text-rose-500"
                          >
                            <IoIosGitCompare />
                          </button>
                        </div>

                        <div class="absolute z-10 bottom-0 right-2">
                          <div class="inline-flex items-center justify-center text-xs font-bold text-white bg-orange-400 rounded-full w-9 h-9">
                            Sale
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-col flex-1 p-4">
                        <div class="flex items-center flex-shrink-0">
                          <p class="text-md font-bold text-gray-900">
                            &#8377;{card.sale_price}
                          </p>
                          {card.regular_prire && (
                            <p class="text-md text-gray-400 font-bold ml-2.5">
                              &#8377;{card.regular_prire}
                            </p>
                          )}
                        </div>
                        <h3 class="text-md sm:text-xl font-bold text-gray-900 mt-2.5 flex-1 transition-all duratin-200">
                          <a
                            href="#"
                            title=""
                            onClick={() => setOpenProductDetails(true)}
                          >
                            {" "}
                            {card?.title}
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
                            <p class="mt-1 text-xs font-medium text-gray-400 sm:text-md sm:mt-0 sm:ml-2 lg:ml-0 lg:mt-1 xl:ml-2 xl:mt-0">
                              {card?.reviewCount} Reviews
                            </p>
                          </div>

                          <button
                            type="button"
                            class="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-blue-600"
                          >
                            <svg
                              class="w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </CustomCarousel>
          </div>
        </section>

        <CompareList
          isOpen={openCompare}
          onClose={() => setOpenCompare(false)}
        />

        <section class="mt-10">
          <div class="mx-auto max-w-7xl">
            <div class="text-center lg:text-left flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                Best Combinations
              </h2>
            </div>
            <div class="flex-1 px-4 py-6 sm:p-6 lg:p-8 bg-gray-200 rounded-md mt-10">
              <ul class="space-y-7">
                <li class="relative flex pb-10 sm:pb-0">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover rounded-lg w-28 h-28"
                      src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                      alt=""
                    />
                  </div>

                  <div class="flex flex-col justify-between flex-1 ml-5">
                    <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p class="text-xl font-bold text-gray-900">
                          Apple Watch Series 7
                        </p>
                        <p class="mt-1.5 text-base font-medium text-gray-500">
                          Golden
                        </p>
                      </div>
                      <div class="mt-4 sm:mt-0">
                        <p class="text-base font-bold text-left text-gray-900 sm:text-right">
                          $359
                        </p>
                      </div>
                    </div>

                    <div class="absolute bottom-0 left-0 sm:relative">
                      <div class="flex space-x-5 justify-between">
                        <a
                          href="#"
                          title=""
                          class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          {" "}
                          View Product{" "}
                        </a>
                        <button
                          type="button"
                          class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="relative flex pb-10 sm:pb-0">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover rounded-lg w-28 h-28"
                      src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-2.png"
                      alt=""
                    />
                  </div>

                  <div class="flex flex-col justify-between flex-1 ml-5">
                    <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p class="text-xl font-bold text-gray-900">
                          Beylob 90 Speaker
                        </p>
                        <p class="mt-1.5 text-base font-medium text-gray-500">
                          Space Gray
                        </p>
                      </div>

                      <div class="mt-4 sm:mt-0">
                        <p class="text-base font-bold text-left text-gray-900 sm:text-right">
                          $49
                        </p>
                      </div>
                    </div>

                    <div class="absolute bottom-0 left-0 sm:relative">
                      <div class="flex space-x-5 justify-between">
                        <a
                          href="#"
                          title=""
                          class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          {" "}
                          View Product{" "}
                        </a>
                        <button
                          type="button"
                          class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <hr class="mt-8 border-gray-200" />

              <div class="flex items-end mt-8 space-x-5 justify-between">
                <button
                  type="button"
                  class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                >
                  Add Combination to Cart
                </button>
                <p className="text-xl font-bold">Combination Total : $320</p>
              </div>
            </div>
            <div class="flex-1 px-4 py-6 sm:p-6 lg:p-8 bg-gray-200 rounded-md mt-10">
              <ul class="space-y-7">
                <li class="relative flex pb-10 sm:pb-0">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover rounded-lg w-28 h-28"
                      src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                      alt=""
                    />
                  </div>

                  <div class="flex flex-col justify-between flex-1 ml-5">
                    <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p class="text-xl font-bold text-gray-900">
                          Apple Watch Series 7
                        </p>
                        <p class="mt-1.5 text-base font-medium text-gray-500">
                          Golden
                        </p>
                      </div>
                      <div class="mt-4 sm:mt-0">
                        <p class="text-base font-bold text-left text-gray-900 sm:text-right">
                          $359
                        </p>
                      </div>
                    </div>

                    <div class="absolute bottom-0 left-0 sm:relative">
                      <div class="flex space-x-5 justify-between">
                        <a
                          href="#"
                          title=""
                          class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          {" "}
                          View Product{" "}
                        </a>
                        <button
                          type="button"
                          class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="relative flex pb-10 sm:pb-0">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover rounded-lg w-28 h-28"
                      src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-2.png"
                      alt=""
                    />
                  </div>

                  <div class="flex flex-col justify-between flex-1 ml-5">
                    <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p class="text-xl font-bold text-gray-900">
                          Beylob 90 Speaker
                        </p>
                        <p class="mt-1.5 text-md font-medium text-gray-500">
                          Space Gray
                        </p>
                      </div>

                      <div class="mt-4 sm:mt-0">
                        <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                          $49
                        </p>
                      </div>
                    </div>

                    <div class="absolute bottom-0 left-0 sm:relative">
                      <div class="flex space-x-5 justify-between">
                        <a
                          href="#"
                          title=""
                          class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          {" "}
                          View Product{" "}
                        </a>
                        <button
                          type="button"
                          class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="relative flex pb-10 sm:pb-0">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover rounded-lg w-28 h-28"
                      src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                      alt=""
                    />
                  </div>

                  <div class="flex flex-col justify-between flex-1 ml-5">
                    <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p class="text-xl font-bold text-gray-900">
                          Apple Watch Series 7
                        </p>
                        <p class="mt-1.5 text-md font-medium text-gray-500">
                          Golden
                        </p>
                      </div>
                      <div class="mt-4 sm:mt-0">
                        <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                          $359
                        </p>
                      </div>
                    </div>

                    <div class="absolute bottom-0 left-0 sm:relative">
                      <div class="flex space-x-5 justify-between">
                        <a
                          href="#"
                          title=""
                          class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          {" "}
                          View Product{" "}
                        </a>
                        <button
                          type="button"
                          class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="relative flex pb-10 sm:pb-0">
                  <div class="flex-shrink-0">
                    <img
                      class="object-cover rounded-lg w-28 h-28"
                      src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                      alt=""
                    />
                  </div>

                  <div class="flex flex-col justify-between flex-1 ml-5">
                    <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                      <div>
                        <p class="text-xl font-bold text-gray-900">
                          Apple Watch Series 7
                        </p>
                        <p class="mt-1.5 text-md font-medium text-gray-500">
                          Golden
                        </p>
                      </div>
                      <div class="mt-4 sm:mt-0">
                        <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                          $359
                        </p>
                      </div>
                    </div>

                    <div class="absolute bottom-0 left-0 sm:relative">
                      <div class="flex space-x-5 justify-between">
                        <a
                          href="#"
                          title=""
                          class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                          {" "}
                          View Product{" "}
                        </a>
                        <button
                          type="button"
                          class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <hr class="mt-8 border-gray-200" />

              <div class="flex items-end mt-8 space-x-5 justify-between">
                <button
                  type="button"
                  class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                >
                  Add Combination to Cart
                </button>
                <p className="text-xl font-bold">Combination Total : $320</p>
              </div>
            </div>
          </div>
        </section>

        <ProductDetails
          open={openProductDetails}
          close={() => setOpenProductDetails(false)}
        />

        <section class="mt-10 ">
          <div class="m-auto max-w-7xl">
            <div class="max-w-6xl mx-auto">
              <div>
                <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Order Details
                </h1>
                <p class="mt-2 text-md font-normal text-gray-600">
                  Check the status of recent and old orders & discover more
                  products
                </p>
              </div>
              <CustomCarousel opts={{ align: "start" }} className="w-full mt-8">
                <CarouselContent>
                  <CarouselItem
                    //   onClick={() => handleCardClick(card)}
                    className="md:basis-[100%] flex bg-gray-200 rounded-md"
                  >
                    <div class="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
                      <div class="px-4 py-6 sm:p-6 lg:p-8">
                        <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Order ID
                            </p>
                            <p class="text-md font-bold text-gray-900 mt-0.5">
                              #46199271460087
                            </p>
                          </div>

                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Date
                            </p>
                            <p class="text-md font-bold text-gray-900 mt-0.5">
                              14 January, 2022
                            </p>
                          </div>

                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Total Amount
                            </p>
                            <p class="text-md font-bold text-gray-900 mt-0.5">
                              $499
                            </p>
                          </div>

                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Order Status
                            </p>
                            <div class="mt-0.5 flex items-center">
                              <div class="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-amber-400 mr-1.5">
                                <svg
                                  class="w-2 h-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <span class="text-md font-bold text-gray-900">
                                {" "}
                                Pending{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 px-4 py-6 sm:p-6 lg:p-8">
                      <ul class="space-y-7">
                        <li class="relative flex pb-10 sm:pb-0">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover rounded-lg w-28 h-28"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                              alt=""
                            />
                          </div>

                          <div class="flex flex-col justify-between flex-1 ml-5">
                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                              <div>
                                <p class="text-xl font-bold text-gray-900">
                                  Apple Watch Series 7
                                </p>
                                <p class="mt-1.5 text-md font-medium text-gray-500">
                                  Golden
                                </p>
                              </div>

                              <div class="mt-4 sm:mt-0">
                                <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                                  $359
                                </p>
                              </div>
                            </div>

                            <div class="absolute bottom-0 left-0 sm:relative">
                              <div class="flex space-x-5">
                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  View Product{" "}
                                </a>

                                <span class="text-gray-200"> | </span>

                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  Similar Product{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li class="relative flex pb-10 sm:pb-0">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover rounded-lg w-28 h-28"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-2.png"
                              alt=""
                            />
                          </div>

                          <div class="flex flex-col justify-between flex-1 ml-5">
                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                              <div>
                                <p class="text-xl font-bold text-gray-900">
                                  Beylob 90 Speaker
                                </p>
                                <p class="mt-1.5 text-md font-medium text-gray-500">
                                  Space Gray
                                </p>
                              </div>

                              <div class="mt-4 sm:mt-0">
                                <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                                  $49
                                </p>
                              </div>
                            </div>

                            <div class="absolute bottom-0 left-0 sm:relative">
                              <div class="flex space-x-5">
                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  View Product{" "}
                                </a>

                                <span class="text-gray-200"> | </span>

                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  Similar Product{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>

                      <hr class="mt-8 border-gray-200" />

                      <div class="flex items-center mt-8 space-x-5">
                        <button
                          type="button"
                          class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                        >
                          View Order
                        </button>

                        <button
                          type="button"
                          class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                        >
                          View Invoice
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem
                    //   onClick={() => handleCardClick(card)}
                    className="md:basis-[100%] flex bg-gray-200 rounded-md"
                  >
                    <div class="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
                      <div class="px-4 py-6 sm:p-6 lg:p-8">
                        <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Order ID
                            </p>
                            <p class="text-md font-bold text-gray-900 mt-0.5">
                              #46199271460087
                            </p>
                          </div>

                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Date
                            </p>
                            <p class="text-md font-bold text-gray-900 mt-0.5">
                              14 January, 2022
                            </p>
                          </div>

                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Total Amount
                            </p>
                            <p class="text-md font-bold text-gray-900 mt-0.5">
                              $299
                            </p>
                          </div>

                          <div>
                            <p class="text-md font-medium text-gray-500">
                              Order Status
                            </p>
                            <div class="mt-0.5 flex items-center">
                              <div class="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-green-500 mr-1.5">
                                <svg
                                  class="w-2 h-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span class="text-md font-bold text-gray-900">
                                {" "}
                                Delivered{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex-1 px-4 py-6 sm:p-6 lg:p-8">
                      <ul class="space-y-7">
                        <li class="relative flex pb-10 sm:pb-0">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover rounded-lg w-28 h-28"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                              alt=""
                            />
                          </div>

                          <div class="flex flex-col justify-between flex-1 ml-5">
                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                              <div>
                                <p class="text-xl font-bold text-gray-900">
                                  Apple Watch Series 7
                                </p>
                                <p class="mt-1.5 text-md font-medium text-gray-500">
                                  Golden
                                </p>
                              </div>

                              <div class="mt-4 sm:mt-0">
                                <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                                  $359
                                </p>
                              </div>
                            </div>

                            <div class="absolute bottom-0 left-0 sm:relative">
                              <div class="flex space-x-5">
                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  View Product{" "}
                                </a>

                                <span class="text-gray-200"> | </span>

                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  Similar Product{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li class="relative flex pb-10 sm:pb-0">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover rounded-lg w-28 h-28"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-2.png"
                              alt=""
                            />
                          </div>

                          <div class="flex flex-col justify-between flex-1 ml-5">
                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                              <div>
                                <p class="text-xl font-bold text-gray-900">
                                  Beylob 90 Speaker
                                </p>
                                <p class="mt-1.5 text-md font-medium text-gray-500">
                                  Space Gray
                                </p>
                              </div>

                              <div class="mt-4 sm:mt-0">
                                <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                                  $49
                                </p>
                              </div>
                            </div>

                            <div class="absolute bottom-0 left-0 sm:relative">
                              <div class="flex space-x-5">
                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  View Product{" "}
                                </a>

                                <span class="text-gray-200"> | </span>

                                <a
                                  href="#"
                                  title=""
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  Similar Product{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>

                      <hr class="mt-8 border-gray-200" />

                      <div class="flex items-center mt-8 space-x-5">
                        <button
                          type="button"
                          class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                        >
                          View Order
                        </button>

                        <button
                          type="button"
                          class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                        >
                          View Invoice
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </CustomCarousel>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* buttom section */}
        <section class="mt-10">
          <div class=" mx-auto max-w-7xl">
            <div class="grid grid-cols-1 mt-8 lg:grid-rows-1 gap-y-12 lg:mt-12 lg:grid-cols-5 lg:gap-y-16 lg:gap-x-12 xl:gap-x-16">
              <div class="lg:col-span-3 lg:row-end-1">
                <div class="lg:flex lg:items-start">
                  <div class="lg:order-2 lg:ml-5">
                    <div class="overflow-hidden border-2 border-transparent rounded-lg">
                      <img
                        class="object-cover w-full h-full"
                        src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-1.png"
                        alt=""
                      />
                    </div>
                  </div>

                  <div class="w-full lg:w-32 mt-2.5 lg:mt-0 lg:flex-shrink-0 lg:order-1">
                    <div class="flex flex-row items-stretch lg:flex-col lg:space-y-5 space-x-2.5 lg:space-x-0">
                      <button type="button" class="flex-1">
                        <div class="overflow-hidden border-2 border-gray-900 rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                          <img
                            class="object-cover w-full h-full"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-2.png"
                            alt=""
                          />
                        </div>
                      </button>

                      <button type="button" class="flex-1">
                        <div class="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                          <img
                            class="object-cover w-full h-full"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-3.png"
                            alt=""
                          />
                        </div>
                      </button>

                      <button type="button" class="flex-1">
                        <div class="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                          <img
                            class="object-cover w-full h-full"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-4.png"
                            alt=""
                          />
                        </div>
                      </button>

                      <button type="button" class="flex-1">
                        <div class="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                          <img
                            class="object-cover w-full h-full"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-5.png"
                            alt=""
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-2 lg:row-end-2 lg:row-span-2">
                <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Jenny’s Closets - The winter top for female, green
                </h1>

                <div class="flex items-center mt-5">
                  <div class="flex items-center space-x-px">
                    <svg
                      class="w-4 h-4 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <p class="ml-2 text-md font-medium text-gray-400">
                    157 Reviews
                  </p>
                </div>

                <div class="flex items-center mt-8">
                  <p class="text-3xl font-bold text-gray-900">$49</p>
                  <p class="ml-2 text-2xl font-bold text-gray-500">
                    <del> $99 </del>
                  </p>
                </div>

                <h2 class="mt-8 text-xl font-bold text-gray-900">Colors</h2>
                <div class="flex items-center mt-5 space-x-3">
                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                    <input
                      type="radio"
                      name="color"
                      value="Green"
                      class="sr-only"
                    />
                    <p class="sr-only">Green</p>
                    <span
                      aria-hidden="true"
                      class="w-8 h-8 rounded bg-emerald-600"
                    ></span>
                  </label>

                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                    <input
                      type="radio"
                      name="color"
                      value="Red"
                      class="sr-only"
                    />
                    <p class="sr-only">Red</p>
                    <span
                      aria-hidden="true"
                      class="w-8 h-8 bg-orange-600 rounded"
                    ></span>
                  </label>

                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                    <input
                      type="radio"
                      name="color"
                      value="Blue"
                      class="sr-only"
                    />
                    <p class="sr-only">Blue</p>
                    <span
                      aria-hidden="true"
                      class="w-8 h-8 bg-indigo-500 rounded"
                    ></span>
                  </label>

                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                    <input
                      type="radio"
                      name="color"
                      value="Gray"
                      class="sr-only"
                    />
                    <p class="sr-only">Gray</p>
                    <span
                      aria-hidden="true"
                      class="w-8 h-8 bg-gray-700 rounded"
                    ></span>
                  </label>
                </div>

                <div class="flex items-center mt-10 space-x-4">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center px-12 py-3 text-xl font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                  >
                    Add to cart
                  </button>

                  <button
                    type="button"
                    class="
                            inline-flex
                            items-center
                            justify-center
                            px-4
                            py-3.5
                            text-gray-900
                            transition-all
                            duration-200
                            bg-transparent
                            border-2 border-gray-300
                            rounded-md
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:border-gray-900 hover:bg-gray-100
                            focus:border-gray-900
                        "
                  >
                    <svg
                      class="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section class="py-12 sm:py-16 lg:py-20">
            <div class="mx-auto max-w-7xl">
              <div class="max-w-3xl">
                <div class="grid grid-cols-1 gap-y-8 sm:grid-cols-2 gap-x-16">
                  <div>
                    <h3 class="text-xl font-bold text-gray-900">
                      Customer reviews & ratings
                    </h3>
                    <div class="flex items-center mt-6">
                      <div class="flex items-center space-x-px">
                        <svg
                          class="w-5 h-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          class="w-5 h-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          class="w-5 h-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          class="w-5 h-5 text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          class="w-5 h-5 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span class="ml-3 text-md font-medium text-gray-600">
                        {" "}
                        (4.7 out of 5){" "}
                      </span>
                    </div>
                    <p class="text-md font-medium text-gray-600 mt-2.5">
                      Based on 3,498 reviews
                    </p>
                  </div>

                  <div>
                    <ul class="space-y-2.5">
                      <li class="grid items-center grid-cols-5 gap-x-4">
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          5 stars{" "}
                        </span>
                        <div class="col-span-3 relative w-full bg-gray-200 rounded-full h-1.5">
                          <div class="absolute inset-y-0 left-0 w-[80%] bg-gray-900 rounded-full"></div>
                        </div>
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          2,388{" "}
                        </span>
                      </li>

                      <li class="grid items-center grid-cols-5 gap-x-4">
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          4 stars{" "}
                        </span>
                        <div class="col-span-3 relative w-full bg-gray-200 rounded-full h-1.5">
                          <div class="absolute inset-y-0 left-0 w-[30%] bg-gray-900 rounded-full"></div>
                        </div>
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          785{" "}
                        </span>
                      </li>

                      <li class="grid items-center grid-cols-5 gap-x-4">
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          3 stars{" "}
                        </span>
                        <div class="col-span-3 relative w-full bg-gray-200 rounded-full h-1.5">
                          <div class="absolute inset-y-0 left-0 w-[15%] bg-gray-900 rounded-full"></div>
                        </div>
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          239{" "}
                        </span>
                      </li>

                      <li class="grid items-center grid-cols-5 gap-x-4">
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          2 stars{" "}
                        </span>
                        <div class="col-span-3 relative w-full bg-gray-200 rounded-full h-1.5">
                          <div class="absolute inset-y-0 left-0 w-[10%] bg-gray-900 rounded-full"></div>
                        </div>
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          18{" "}
                        </span>
                      </li>

                      <li class="grid items-center grid-cols-5 gap-x-4">
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          1 star{" "}
                        </span>
                        <div class="col-span-3 relative w-full bg-gray-200 rounded-full h-1.5">
                          <div class="absolute inset-y-0 left-0 w-[20%] bg-gray-900 rounded-full"></div>
                        </div>
                        <span class="text-md font-medium text-gray-600 whitespace-nowrap">
                          {" "}
                          472{" "}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <hr class="mt-10 border-gray-200" />

                <div class="flow-root mt-10">
                  <ul class="divide-y divide-gray-200 -my-9 gap-x-16">
                    <li class="grid grid-cols-1 py-8 gap-y-8 md:grid-cols-7 gap-x-8">
                      <div class="md:col-span-2">
                        <div class="flex items-center space-x-px">
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div class="flex items-start mt-5 md:flex-col">
                          <div class="flex-shrink-0">
                            <p class="text-md font-bold text-gray-900">
                              Bessie Cooper
                            </p>
                            <p class="mt-1 text-md font-normal text-gray-500">
                              March 14, 2021
                            </p>
                          </div>
                          <div class="flex items-center ml-4 text-md font-medium text-gray-600 md:ml-0 md:mt-4">
                            <svg
                              class="h-5 text-green-500 flex-shrink-0 mr-1.5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Verified
                          </div>
                        </div>
                      </div>

                      <div class="md:col-span-5">
                        <p class="text-base font-bold text-gray-900">
                          Great product, smooth purchase
                        </p>
                        <blockquote class="mt-4">
                          <p class="text-md font-normal leading-6 text-gray-900">
                            Almost completed building my replacement website and
                            very pleased with the result. Although the
                            customization is great the theme's features and
                            Customer Support have also been great..
                          </p>
                        </blockquote>
                      </div>
                    </li>

                    <li class="grid grid-cols-1 py-8 gap-y-8 md:grid-cols-7 gap-x-8">
                      <div class="md:col-span-2">
                        <div class="flex items-center space-x-px">
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div class="flex items-start mt-5 md:flex-col">
                          <div class="flex-shrink-0">
                            <p class="text-md font-bold text-gray-900">
                              Floyd Miles
                            </p>
                            <p class="mt-1 text-md font-normal text-gray-500">
                              March 14, 2021
                            </p>
                          </div>
                          <div class="flex items-center ml-4 text-md font-medium text-gray-600 md:ml-0 md:mt-4">
                            <svg
                              class="h-5 text-green-500 flex-shrink-0 mr-1.5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Verified
                          </div>
                        </div>
                      </div>

                      <div class="md:col-span-5">
                        <p class="text-base font-bold text-gray-900">
                          Super fast, easy to use
                        </p>
                        <blockquote class="mt-4">
                          <p class="text-md font-normal leading-6 text-gray-900">
                            Really nicely designed theme and quite fast loading.
                            The quickness of page loads you can really
                            appreciate once you turn off page transition
                            preloader in theme options.
                            <br />
                            <br />
                            Custom support was really quick to respond to all my
                            questions and resolve all my issue, very satisfied
                            with this theme, VERY good value for money.
                          </p>
                        </blockquote>
                      </div>
                    </li>

                    <li class="grid grid-cols-1 py-8 gap-y-8 md:grid-cols-7 gap-x-8">
                      <div class="md:col-span-2">
                        <div class="flex items-center space-x-px">
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            class="w-5 h-5 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p class="mt-5 text-md font-bold text-gray-900">
                          Robert Fox
                        </p>
                        <p class="mt-1 text-md font-normal text-gray-500">
                          March 14, 2021
                        </p>
                      </div>

                      <div class="md:col-span-5">
                        <p class="text-base font-bold text-gray-900">
                          High quality design
                        </p>
                        <blockquote class="mt-4">
                          <p class="text-md font-normal leading-6 text-gray-900">
                            Very high quality theme and perfect for any modern
                            business that wants to showcase it's products or
                            services. Great work!
                          </p>
                        </blockquote>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        position="right"
        className="z-50 min-w-[30vw] flex flex-col p-2"
        ref={drawerRef}
      >
        <Drawer.Header titleIcon={() => <></>} title="" />

        <div className="flex-grow overflow-y-auto p-2">
          <Drawer.Items className="mb-10">
            <div className="relative">
              <img
                src={mainImage}
                alt="Main"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Carousel of Thumbnails */}
            <div className="mt-4 overflow-x-auto">
              <CustomCarousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {expandedCard?.images?.map((item, index) => (
                    <CarouselItem
                      key={index}
                      onClick={() => setMainImage(item?.src)}
                      className="relative cursor-pointer md:basis-[23%] lg:basis-[23%] xl:basis-[20%]"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          className={`w-24 h-24 object-cover border  rounded-md transition-transform ${
                            item?.src === mainImage
                              ? "border-2 border-black border-solid"
                              : "border-gray-300"
                          }`}
                          src={item?.src}
                          alt={item?.alt}
                        />
                        {item?.src === mainImage && (
                          <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                            {/* <div className="absolute inset-0 bg-gray-800 bg-opacity-50 rounded-md" /> */}
                            <HiCheck className="text-white text-2xl z-50" />
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {expandedCard?.images?.length > 5 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </CustomCarousel>
              {/* <FlowbiteCarousel
                slide={false}
                theme={{
                  indicators: {
                    active: {
                      on: "bg-white dark:bg-gray-800 border-2 border-solid border-black dark:border-black h-4 w-4",
                    },
                    wrapper:
                      "bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 items-center",
                  },
                }}
                className="flex space-x-4"
              >
                {expandedCard?.images.map((item) => (
                  <div
                    key={item?.id}
                    className="cursor-pointer flex-shrink-0"
                    onClick={() => setMainImage(item?.src)}
                    style={{ width: "100px" }} // Adjust width to control number of visible items
                  >
                    <img
                      className="w-full h-24 object-cover border border-gray-300 rounded-md"
                      src={item?.src}
                      alt={item?.alt}
                    />
                  </div>
                ))}
              </FlowbiteCarousel> */}
            </div>

            <p className="mt-2 font-bold text-2xl">{expandedCard?.name}</p>
            <div className="mt-5 flex justify-between items-center">
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl font-bold text-gray-500 line-through">
                  &#8377;{expandedCard?.regular_price}
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  &#8377;{expandedCard?.sale_price}
                </p>
              </div>
              <Button>
                <HiShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            <div
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: expandedCard?.short_description || "",
              }}
            />
            {/* Color selection */}
            <div className="mt-3">
              <label className="block text-lg font-bold text-gray-700">
                Color
              </label>
              <div className="mt-1 flex space-x-4">
                {colors.map((color) => (
                  <div
                    key={color.value}
                    className={`relative cursor-pointer flex items-center ${
                      selectedColor === color.value ? "p-1 rounded" : ""
                    }`}
                    onClick={() => handleColorChange(color.value)}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color.value}
                      className="hidden"
                      checked={selectedColor === color.value}
                      onChange={() => handleColorChange(color.value)}
                    />
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    {selectedColor === color.value && (
                      <div className="absolute inset-0 border-2 border-indigo-600 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mt-3">
              <label className="block text-lg font-bold text-gray-700">
                Size
              </label>
              <div className="mt-1 flex space-x-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-md text-md font-medium ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    } transition duration-150 ease-in-out`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selection */}
            <div className="mt-3">
              <label
                htmlFor="quantity"
                className="block text-lg font-bold text-gray-700"
              >
                Quantity
              </label>
              <select
                id="quantity"
                name="quantity"
                defaultValue="1"
                className="mt-1 block w-30 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md rounded-md"
              >
                {[...Array(5).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4 mt-4">
              <Button
                outline
                gradientDuoTone="purpleToPink"
                className="flex items-center justify-center rounded-md transition duration-150 ease-in-out"
              >
                <IoIosGitCompare className="mr-2 h-5 w-5" />
                Compare
              </Button>
              <Button
                outline
                gradientDuoTone="pinkToOrange"
                className="flex items-center justify-center rounded-md transition duration-150 ease-in-out"
              >
                <AiOutlineHeart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
            </div>
            <h3 className="font-bold text-2xl mt-5">Description</h3>
            <div
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: expandedCard?.description || "",
              }}
            />
          </Drawer.Items>
        </div>

        <div className="p-2">
          <Button
            outline
            size="lg"
            gradientDuoTone="redToYellow"
            className="w-full font-bold"
            onClick={handleCloseDrawer}
          >
            Buy Now
          </Button>
        </div>
      </Drawer>
    </>
  );
}
