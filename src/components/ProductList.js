"use client";
import React, { useEffect, useState } from "react";

import ProductDetails from "./ProductDetails";
import { addCart, addWishlistItem, getProductDetails } from "./service/getData";
import { IoIosGitCompare, IoMdCart } from "react-icons/io";
import { FaPlusCircle, FaStar } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder, MdPushPin } from "react-icons/md";
import { IoBag } from "react-icons/io5";
import { Drawer, Pagination, Toast, Tooltip } from "flowbite-react";
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
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "./ui/productCard";

export default function ProductList({
  isFullList,
  products,
  recomendedProducts,
  loading,
  recommendedLoading,
  // pinnedProducts,
  // setpinnedProducts,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pinnedProducts = useSelector((state) => state.products?.selectedIds);

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

  const handleCardClick = (product) => {
    let updatedPinnedProducts;
    if (
      pinnedProducts.some(
        (prevCard) => prevCard.productId === product.productId
      )
    ) {
      updatedPinnedProducts = pinnedProducts.filter(
        (prevCard) => prevCard.productId !== product.productId
      );
    } else {
      updatedPinnedProducts = [...pinnedProducts, product];
    }

    dispatch(setSelectedIds(updatedPinnedProducts));
  };

  useEffect(() => {
    dispatch(setSelectedIds([]));
  }, []);

  const fetchProductDetails = async (id) => {
    setProduct(null);
    setProductId(id);
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
      {/* {showWishlistModal && (
        <WishlistModal
          showModal={showWishlistModal}
          setShowModal={setShowWishlistModal}
          productId={productId}
          // setProductId={setProductId}
        />
      )} */}

      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full h-full flex flex-col relative ml-0">
          <section className="h-full">
            <div
              className={`flex items-center ${
                pinnedProducts?.length > 0 ? "justify-between" : "justify-end"
              } `}
            >
              {pinnedProducts?.length > 0 && (
                <span className="text-md text-gray-600 font-semibold ml-2 mb-4">
                  {pinnedProducts?.length} Selected
                </span>
              )}
            </div>
            <div className="relative">
              {isFullList ? (
                <>
                  <h3 className="text-3xl font-semibold my-5 italic tracking-wide">
                    The collection below is <br /> the best-match in the store
                  </h3>
                  <div className="flex flex-wrap gap-8">
                    {loading ? (
                      [...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="relative group"
                          style={{ minHeight: "250px" }}
                        >
                          <Skeleton height={250} width={280} />
                        </div>
                      ))
                    ) : products?.length > 0 ? (
                      products?.map((card, index) => (
                        <div key={index} className="relative group">
                          <ProductCard
                            product={card}
                            pinnedProducts={pinnedProducts}
                            togglePin={handleCardClick}
                            onCardClick={() =>
                              fetchProductDetails(card.productId)
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <>No good match found</>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-semibold my-5 italic tracking-wide">
                    The collection below is <br /> the best-match in the store
                  </h3>
                  <div className="flex  flex-wrap gap-8">
                    {recommendedLoading ? (
                      [...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="relative group"
                          style={{ minHeight: "250px" }}
                        >
                          <Skeleton height={250} width={280} />
                        </div>
                      ))
                    ) : recomendedProducts?.good_match?.length > 0 ? (
                      recomendedProducts?.good_match.map((card, index) => (
                        <div key={index} className="relative group">
                          <ProductCard
                            product={card}
                            pinnedProducts={pinnedProducts}
                            togglePin={handleCardClick}
                            onCardClick={() =>
                              fetchProductDetails(card.productId)
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <>No good match found</>
                    )}
                  </div>

                  <h3 className="text-3xl font-semibold my-5 italic tracking-wide">
                    The collection below is <br /> the partial-match in the
                    store
                  </h3>
                  <div className="flex flex-wrap gap-8 mt-10">
                    {recommendedLoading ? (
                      [...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="relative group"
                          style={{ minHeight: "250px" }}
                        >
                          <Skeleton height={250} width={280} />
                        </div>
                      ))
                    ) : recomendedProducts?.partial_match?.length > 0 ? (
                      recomendedProducts?.partial_match.map((card, index) => (
                        <div key={index} className="relative group">
                          <ProductCard
                            product={card}
                            pinnedProducts={pinnedProducts}
                            togglePin={handleCardClick}
                            onCardClick={() =>
                              fetchProductDetails(card.productId)
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <>No partial match found</>
                    )}
                  </div>
                </>
              )}

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
      {/* <Drawer
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
                      <span>{item}</span> 
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
      </Drawer> */}
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
