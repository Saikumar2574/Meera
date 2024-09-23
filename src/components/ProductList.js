"use client";
import React, { useEffect, useState } from "react";

import ProductDetails from "./ProductDetails";
import { addCart, addWishlistItem, getProductDetails } from "./service/getData";
import { IoIosGitCompare, IoMdCart } from "react-icons/io";
import { FaPlusCircle, FaStar } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder, MdPushPin } from "react-icons/md";
import { IoBag } from "react-icons/io5";
import { Drawer, Toast, Tooltip } from "flowbite-react";
import { InView } from "./ui/in-view";
import { motion } from "framer-motion";
import "../app/globals.css";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import WishlistModal from "./model/WishlistModal";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIds } from "@/lib/redux/reducer/productReducer";
import Skeleton from "react-loading-skeleton";

export default function ProductList({
  products,
  loading,
  // selectedItems,
  // setSelectedItems,
}) {
  debugger;
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [product, setProduct] = useState(null);
  const [cardStyle, setCardStyle] = useState(1);
  const [openConsideration, setOpenConsideration] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productView, setProductView] = useState(null);

  useEffect(() => {
    // Function to check window size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Set initial state
    handleResize();

    // Listen to window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (card) => {
    setSelectedItems((prevSelectedCards) => {
      if (
        prevSelectedCards.some(
          (prevCard) => prevCard.productId === card.productId
        )
      ) {
        // If the card is already selected, remove it
        return prevSelectedCards.filter(
          (prevCard) => prevCard.productId !== card.productId
        );
      } else {
        // If the card is not selected, add it
        return [...prevSelectedCards, card];
      }
    });
  };

  useEffect(() => {
    dispatch(setSelectedIds(selectedItems));
  }, [selectedItems]);

  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      console.log(res);
      setIsDetail(true);
      setProduct(res?.product);
    }
  };

  const addToCart = async (e, id) => {
    e.stopPropagation();
    const res = await addCart({ product_id: id, quantity: 1 });
    if (res) {
      setToast({
        show: true,
        message: "Successfully Added",
        type: "success",
      });
    }
  };

  useEffect(() => {
    let timer;
    if (toast.show) {
      // Set a timer to hide the toast after 5 seconds
      timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [toast.show]);

  // if (!products || products.length === 0) {
  //   return <div>No products available</div>;
  // }

  const ProductCard = ({ card }) => {
    return (
      <div
        onClick={() => setProductView(card)}
        className={`flex flex-col overflow-hidden bg-white  relative rounded-md  transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
          selectedItems?.some(
            (selectedCard) => selectedCard.productId === card?.productId
          )
            ? " border-2 border-black"
            : "border border-gray-200"
        }`}
      >
        <div className="relative flex-shrink-0 aspect-w-3 aspect-h-2 p-3 md:p-5 group ">
          <div className="block md:hidden">
            <div
              className={`flex ${
                cardStyle === 1 || cardStyle === 2 ? " justify-between" : ""
              } items-center mb-2`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(card);
                }}
                className="inline-flex items-center justify-center"
              >
                <MdPushPin
                  style={{
                    color: selectedItems?.some(
                      (selectedCard) =>
                        selectedCard.productId === card?.productId
                    )
                      ? "blue"
                      : "gray", // Change color based on state
                  }}
                  className={`md:w-6 md:h-6  ${
                    cardStyle === 3 ? "w-6 h-6" : "sm:w-4 sm:h-4"
                  }`}
                />
              </button>
              <span
                className={` ${
                  cardStyle === 1 || cardStyle === 2 ? "" : "ml-4"
                } font-bold text-[16px]`}
              >
                A2B7
              </span>
              {cardStyle !== 1 && cardStyle !== 2 && card.recommended && (
                <span
                  className={`ml-auto font-bold text-[16px] italic`}
                  style={{
                    textShadow: "0px 0px 8px yellow",
                  }}
                >
                  Top Pick
                </span>
              )}

              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className={`${
                  cardStyle === 1 || cardStyle === 2 ? "block" : "hidden"
                } inline-flex items-center justify-center text-gray-400`}
              >
                <MdFavorite
                  className="md:w-6 md:h-6 lg:w-6 lg:h-6 sm:w-4 sm:h-4"
                  color="red"
                />
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center mb-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(card);
                }}
                className="inline-flex items-center justify-center"
              >
                <MdPushPin
                  className="md:w-5 md:h-5 sm:w-4 sm:h-4"
                  style={{
                    color: selectedItems?.some(
                      (selectedCard) =>
                        selectedCard.productId === card?.productId
                    )
                      ? "black"
                      : "gray", // Change color based on state
                  }}
                />
              </button>
              <span className="ml-4 font-bold text-[16px] text-black">
                A2B7
              </span>
              {/* {card.recommended && (
              <span
                className="ml-auto font-bold text-[16px] italic"
                style={{
                  textShadow: "0px 0px 8px yellow", // Adds a blurred yellow shadow behind the text
                }}
              >
                Top Pick
              </span>
            )} */}
              <p className="ml-auto hidden text-sm font-semibold text-gray-500 italic group-hover:block">
                Price : &#8377;{card?.price}
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              className="object-cover w-full h-full rounded-md transition-opacity duration-300 delay-500 group-hover:opacity-0"
              src={card?.image}
              alt="img"
              width={300}
              height={300}
              onError={(e) => {
                e.target.src = "https://dummyimage.com/300/09f/fff.png";
              }}
            />
            <Image
              className="object-cover w-full h-full rounded-md absolute top-0 left-0 opacity-0 transition-opacity duration-300 delay-500 group-hover:opacity-100"
              src={card?.image || "https://dummyimage.com/300/09f/fff.png"}
              alt="img-hover"
              width={300}
              height={300}
              onError={(e) => {
                e.target.src = "https://dummyimage.com/300/09f/fff.png";
              }}
            />
            {cardStyle !== 3 && (
              <>
                {card.recommended && (
                  <span
                    className={`block md:hidden absolute bottom-2 ${
                      cardStyle === 1
                        ? "left-2"
                        : "left-1/2 transform -translate-x-1/2"
                    } font-semibold italic text-sm md:text-lg`}
                  >
                    Top Pick
                  </span>
                )}

                <div
                  className={`block md:hidden absolute bottom-2 right-2 ${
                    cardStyle !== 1 && "hidden"
                  } `}
                >
                  <div className="relative flex items-center justify-center">
                    <FaStar className="text-yellow-500 w-6 h-6 md:w-8 md:h-8 " />
                    <span className="absolute text-sm md:text-lg font-bold text-black">
                      4
                    </span>
                  </div>
                </div>
              </>
            )}
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
              className={`${
                cardStyle === 3 ? "text-[16px]" : "text-sm"
              } md:text-[16px] font-bold text-gray-900 mt-2 flex-1 transition-all duration-200 overflow-hidden text-ellipsis`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                minHeight: "2.5rem", // This reserves space for two lines
              }}
              dangerouslySetInnerHTML={{
                __html: card.name,
              }}
            ></h3>

            <div className="flex items-center  flex-shrink-0 my-2">
              <p
                className={`${
                  cardStyle === 3 ? "text-[16px]" : "text-sm"
                } md:text-lg font-semibold text-gray-500 italic`}
              >
                {/* {card?.currency_symbol +
                      "" +
                      card?.sale_price} */}
                Price : &#8377;{card?.price}
              </p>

              {cardStyle === 3 && (
                <div className="block md:hidden ml-auto">
                  <div className="flex items-center space-x-px">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={`${
                          cardStyle === 3
                            ? "w-4 h-4"
                            : cardStyle === 2
                            ? "w-3 h-3"
                            : "w-3 h-3"
                        } text-yellow-400`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}
              <div
                className={`${
                  cardStyle === 1 ? "block" : "hidden"
                } md:hidden ml-auto`}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  type="button"
                  className="inline-flex items-center justify-center  w-6 h-6 md:w-8 md:h-8 text-xs font-bold text-white transition-all duration-200 bg-gray-900 rounded-full"
                >
                  <IoBag className="sm:w-4 sm:h-4 " />
                </button>
              </div>
            </div>

            <div
              className={`${cardStyle !== 1 ? "block" : "hidden"} md:hidden`}
            >
              <div className=" flex items-center justify-between mt-2 md:mt-6">
                <button
                  type="button"
                  onClick={(e) => fetchProductDetails(e, card.productId)}
                  className="inline-flex items-center justify-center py-2 px-4 text-sm md:text-lg font-bold text-white bg-gray-900 rounded-md transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                >
                  <IoBag className="w-4 h-4 mr-2" />{" "}
                  {/* Adjusted icon size and added spacing */}
                  Buy Now
                </button>

                {/* <button
            onClick={(e) => e.stopPropagation()}
            type="button"
            className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 text-xs font-bold text-white transition-all duration-200 bg-gray-900 rounded-full"
          >
            <IoBag className="sm:w-4 sm:h-4 " />
          </button> */}
                {cardStyle == 2 && (
                  <div className={`relative flex items-center justify-center`}>
                    <FaStar className="text-yellow-500 w-6 h-6 md:w-8 md:h-8 " />
                    <span className="absolute text-sm md:text-lg font-bold text-black">
                      4
                    </span>
                  </div>
                )}
                {cardStyle === 3 && (
                  <>
                    <button
                      onClick={(e) => addToCart(e, card.productId)}
                      className="bg-[#e8e8e8] rounded-full p-2"
                    >
                      <IoMdCart size={20} />
                    </button>
                    <button className="bg-[#e8e8e8] rounded-full p-2">
                      <MdFavorite
                        onClick={(e) => {
                          e.stopPropagation();
                          setProductId(card.productId);
                          setShowWishlistModal(true);
                        }}
                        size={20}
                        color="red"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0 rounded-t-lg bg-black px-2 py-3">
            <div className=" flex items-center justify-between">
              <button
                type="button"
                // onClick={(e) => e.stopPropagation()}
                onClick={(e) => fetchProductDetails(e, card.productId)}
                className="inline-flex items-center justify-center py-2 px-4 text-sm  font-bold text-black bg-white rounded-md transition duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
              >
                <IoBag className="w-4 h-4 mr-2" />{" "}
                {/* Adjusted icon size and added spacing */}
                Buy Now
              </button>
              <Tooltip content="Add to cart" placement="bottom">
                <button
                  onClick={(e) => addToCart(e, card.productId)}
                  className="hover:bg-gray-200 rounded-md p-2 text-white hover:text-black"
                >
                  <IoMdCart size={20} />
                </button>
              </Tooltip>
              <Tooltip content="Add to wishlist" placement="bottom">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductId(card.productId);
                    setShowWishlistModal(true);
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
    );
  };

  return (
    <>
      {toast.show && (
        <div className="fixed bottom-4 right-2 transform z-50">
          <div className="relative w-full">
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiX className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">{toast.message}</div>
              <Toast.Toggle
                onClick={() => setToast({ show: false, message: "", type: "" })}
              />
            </Toast>
            {/* Timer line indicator */}

            <div
              className="absolute left-0 top-1 h-1 bg-green-500 animate-timer"
              style={{ animationDuration: `${5000}ms` }}
            ></div>
          </div>
        </div>
      )}
      {showWishlistModal && (
        <WishlistModal
          showModal={showWishlistModal}
          setShowModal={setShowWishlistModal}
          productId={productId}
          setProductId={setProductId}
        />
      )}

      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full h-full flex flex-col relative ml-0">
          <section className="h-full pt-10">
            <div
              className={`flex items-center ${
                selectedItems?.length > 0 ? "justify-between" : "justify-end"
              } `}
            >
              {selectedItems?.length > 0 && (
                <span className="text-md text-gray-600 font-semibold ml-2 mb-4">
                  {selectedItems?.length} Selected
                </span>
              )}
            </div>
            <div className="relative">
              <h3 className="text-2xl font-bold my-5">Good Match</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
                {loading
                  ? [...Array(4)].map((_, index) => (
                      <div key={index} className="relative group">
                        <Skeleton height={250} />
                      </div>
                    ))
                  : products?.good_match?.length > 0 ? 
                    products?.good_match.map((card, index) => (
                      <div key={index} className="relative group">
                        <ProductCard card={card} />
                      </div>
                    )): <>No good match found</>}
              </div>

              <h3 className="text-2xl font-bold my-5">Partial Match</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
                {loading
                  ? [...Array(4)].map((_, index) => (
                      <div key={index} className="relative group">
                        <Skeleton height={250} />
                      </div>
                    ))
                  : products?.partial_match?.length>0?products?.partial_match.map((card, index) => (
                      <div key={index} className="relative group">
                        <ProductCard card={card} />
                      </div>
                    )):<>No partial match found</> }
              </div>

              {isDetail && (
                <ProductDetails
                  open={isDetail}
                  close={() => setIsDetail(false)}
                  data={product}
                />
              )}
            </div>
            {/* )} */}
            <div className="block md:hidden">
              <button
                onClick={() => setOpenConsideration(true)}
                className="inline-flex items-center text-sm justify-center bg-gray-300 rounded-full p-2 font-semibold"
              >
                <FaPlusCircle className={`w-4 h-4 mr-1`} />
                Considerations
              </button>
            </div>
          </section>
        </div>
      </div>
      {/* </InView> */}
      <div className="fixed block md:hidden bottom-[78px] w-full bg-white z-10">
        <div className="relative w-full">
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={cardStyle}
            onChange={(event) => setCardStyle(Number(event.target.value))}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            onTouchMove={() => setIsActive(true)}
            style={{
              WebkitAppearance: "none",
              width: "100%",
              height: "8px",
              background: isActive ? "#ececec" : "#fff",
              outline: "none",
              position: "relative",
              transition: "background-color 0.3s ease",
            }}
            className="slider cursor-pointer"
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #000000;
              cursor: pointer;
              position: relative;
              z-index: 1;
            }

            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #000000;
              cursor: pointer;
            }

            .slider::-ms-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #000000;
              cursor: pointer;
            }
          `}</style>
        </div>
      </div>
      <Drawer
        open={productView !== null}
        onClose={() => setProductView(null)}
        position="left"
        className="w-full md:w-[380px] p-14 pb-20  bg-gray-200 hidden md:block"
      >
        <Drawer.Items>
          <div className="p-3">
            <h4 className="text-2xl italic font-bold text-center mb-4">
              Dynamic Inference
            </h4>
            <div
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl"
              style={{ boxShadow: "10px 5px 20px  #83838336" }}
            >
              <p className="text-5xl italic font-bold mb-3">70%</p>
              <p className="text-xl  font-bold">Store Match</p>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-lg italic font-bold text-center mb-2">
              Fulfilment
            </h4>
            <div
              className="flex flex-col px-10 py-4 bg-black text-white rounded-xl"
              style={{ boxShadow: "10px 5px 20px  #83838336" }}
            >
              <ul className="space-y-2">
                {["Colour", "Size", "Texture", "Shipping", "In Stock"].map(
                  (item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-gray-500" />{" "}
                      {/* Circle */}
                      <span>{item}</span> {/* Item text */}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg italic font-bold text-center mb-2">
              Actions
            </h4>
            <button className="w-full bg-black text-white mb-2 px-6 py-3 rounded-xl">
              Shortlist This Item
            </button>
            <button className="w-full bg-black text-white px-6 py-3 rounded-xl">
              Move to Cart
            </button>
          </div>
        </Drawer.Items>
      </Drawer>
      {openConsideration && (
        <Drawer
          open={openConsideration}
          onClose={() => setOpenConsideration(false)}
          position={isMobile ? "bottom" : "right"}
          className={`bg-[#04102f] w-full md:w-[25%]`}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {
                opacity: 0,
                x: isMobile ? 0 : "100%",
                y: isMobile ? "100%" : 0,
              },
              visible: { opacity: 1, x: 0, y: 0 },
              exit: {
                opacity: 0,
                x: isMobile ? 0 : "100%",
                y: isMobile ? "100%" : 0,
              },
            }}
            transition={{ duration: 0.5 }}
            className="h-full"
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
                  Hey there, welcome to the interactive store of **GEAR N
                  RIDE**! We specialize in offering high-quality motorcycle gear
                  and accessories to enhance your riding experience.
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
          </motion.div>
        </Drawer>
      )}
    </>
  );
}
