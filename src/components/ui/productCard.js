import { Toast, Tooltip } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoBag } from "react-icons/io5";
import { MdFavorite, MdPushPin } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { usePathname, useRouter } from "next/navigation";
import {
  addCart,
  addToShortList,
  checkout,
  deleteShortListedItem,
} from "../service/getData";
import { RiUnpinFill } from "react-icons/ri";
import WishlistModal from "../model/WishlistModal";
import { useSelector } from "react-redux";
import { fetchShortlistItems } from "@/lib/redux/reducer/productReducer";
import { useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa";
function ProductCard({
  product,
  pinnedProducts,
  togglePin,
  onCardClick,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState("");
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const token = useSelector((state) => state.auth?.token || null);
  const shortList = useSelector((state) => state.products?.shortList || null);
  const toggleMenu = (productId) => {
    setIsOpen(isOpen === productId ? "" : productId); // Toggle the menu for a specific product
  };

  const isPinned = pinnedProducts?.some(
    (item) => item.productId === product.productId
  );

  const menuVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleAddCart = async (e) => {
    e.stopPropagation();
    const res = await addCart({ product_id: product.productId, quantity: 1 });
    if (res) {
      // setIsAddedToCart(true);
      setToast({
        show: true,
        message: "Successfully Added",
        type: "success",
      });
    }
  };

  const handleCheckout = async (e) => {
    e.stopPropagation();
    console.log("Redirecting to checkout...");

    const url = `https://nlp.codetrappers.in/meera-checkout/?${product.id}=1&access-token=${token}`;

    window.location.href = url;
  };

  const handleDeleteShortlist = async (shortlistId, prodId) => {
    await deleteShortListedItem({
      shortlist_id: shortlistId,
      product_id: prodId,
    }).then((res) => {
      dispatch(fetchShortlistItems());
    });
  };

  const handleShortlist = async (id) => {
    await addToShortList({ product_id: id }).then(
      (res) => {
        console.log(res);
        dispatch(fetchShortlistItems());
      }
    );
  };
  useEffect(() => {
    let timer;
    if (toast.show) {
      // Set a timer to hide the toast after 5 seconds
      timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
        close();
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [toast.show]);

  const isShortlisted = shortList?.items.some(
    (list) => list.product_id === product.productId
  );
  return (
    <>
      <div
        className="flex flex-col w-[280px] overflow-hidden bg-white cursor-pointer rounded-md transition-all duration-700 "
        // ref={provided.innerRef}
        onClick={(e) => {
          //  router.push(`${pathname + "/" + product.id}`)
          e.preventDefault();
          onCardClick();
        }}
        // {...provided.draggableProps}
        // {...provided.dragHandleProps}
      >
        <div
          className={`relative p-5 group d-no rounded-lg 
        ${
          pinnedProducts?.some(
            (prevCard) => prevCard?.productId === product?.productId
          )
            ? "border-t-4 border border-t-blue-600"
            : "border border-gray-200"
        }
      `}
        >
          {toast.show && (
            <div className="fixed bottom-4 right-2 transform z-50">
              <div className="relative w-full">
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiX className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    {toast.message}
                  </div>
                  <Toast.Toggle
                    onClick={() =>
                      setToast({ show: false, message: "", type: "" })
                    }
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
          <div className="relative z-[1]">
            <div className="flex items-center mb-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(product);
                }}
                className="inline-flex items-center justify-center"
              >
                <MdPushPin
                  className="w-5 h-5"
                  style={{
                    color: pinnedProducts?.some(
                      (prevCard) => prevCard?.productId === product?.productId
                    )
                      ? "black"
                      : "gray",
                  }}
                />
              </button>
              <span className="ml-4 font-bold text-base text-black">A2B7</span>
            </div>

            {/* Image */}

            <div className="relative">
              <Image
                className="object-cover w-full h-full rounded-md"
                src={
                  product?.images
                    ? product?.images?.[0]?.src
                    : product.image
                    ? product.image
                    : "https://gearnride.in/wp-content/uploads/2023/01/solace-rain-jacket-rain-pro-v2-2.jpg"
                }
                alt="img"
                width={300}
                height={300}
                onError={(e) => {
                  e.target.src = "https://dummyimage.com/300/09f/fff.png";
                }}
              />
            </div>

            {/* Product Name and Price */}
            <div className="flex flex-col flex-1 mt-2">
              <h3
                className="text-base font-bold text-gray-900 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  minHeight: "3rem",
                }}
                dangerouslySetInnerHTML={{ __html: product?.name }}
              ></h3>
              <div className="flex items-center my-2">
                <p className="text-sm font-semibold text-gray-500 italic">
                  Price : &#8377;{product?.price}
                </p>
              </div>
            </div>

            {/* Button Group */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShortlist(product.productId);
                }}
                disabled={isShortlisted}
                className={`inline-flex items-center w-36 justify-center px-3 py-2 text-sm font-semibold    rounded-md transition duration-200 ${
                  isShortlisted
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-black hover:text-white text-black"
                } `}
              >
                 {isShortlisted && <FaCheck className="mr-2"/> }  {isShortlisted ? `Shortlisted` : "Add to shortlist"}
              </button>

              {/* Cart and More Actions */}
              <Tooltip content="Add to cart" placement="bottom">
                <button
                  onClick={handleAddCart}
                  className="bg-gray-200 text-black hover:bg-black hover:text-white rounded-md p-2 "
                >
                  <IoMdCart size={20} />
                </button>
              </Tooltip>

              {/* More Actions Menu */}
              <div
                onMouseEnter={() => toggleMenu(product?.productId)}
                onMouseLeave={() => setIsOpen("")}
                onClick={(e) => {
                  e.stopPropagation();
                  // togglePin(product.id);
                }}
              >
                <button className="bg-gray-200 text-black hover:bg-black hover:text-white rounded-md p-2">
                  <HiOutlineMenuAlt3 size={20} />
                </button>

                {/* Dropdown Menu */}
                {isOpen === product?.productId && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    variants={menuVariants}
                    className="absolute bottom-8 right-0 mt-2 w-50  z-10"
                  >
                    <ul className="py-2 px-1 mb-4 text-sm font-semibold bg-gray-200 border rounded-lg shadow-lg">
                      <div className=" my-2 flex w-full items-center justify-center space-x-px">
                        {[...Array(5)].map((_, starIndex) => (
                          <svg
                            key={starIndex}
                            className={`w-5 h-5 text-[#e1b700]`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <li>
                        <Link
                          href="#"
                          onClick={handleAddCart}
                          className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                        >
                          <IoMdCart size={20} /> Add to Cart
                          {/* <FaArrowRightLong size={22}/> */}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          onClick={handleCheckout}
                          className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                        >
                          <IoBag size={20} /> Buy Now
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowWishlistModal(true);
                          }}
                          className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                        >
                          <MdFavorite size={20} color="red" />
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          onClick={() => togglePin(product)}
                          className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                        >
                          {isPinned ? (
                            <RiUnpinFill size={20} />
                          ) : (
                            <MdPushPin size={20} />
                          )}

                          {isPinned ? "Unpin" : "Pin"}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          onClick={() =>
                            isShortlisted
                              ? handleDeleteShortlist(
                                  shortList._id,
                                  product.productId
                                )
                              : handleShortlist(product.productId)
                          }
                          className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                        >
                          <FaRectangleList size={20} />
                          {isShortlisted
                            ? "Remove from Shortlist"
                            : "Shortlist"}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${pathname + "/" + product.productId}`}
                          className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                        >
                          <HiMiniViewfinderCircle size={20} />
                          More Details
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWishlistModal && (
        <WishlistModal
          showModal={showWishlistModal}
          setShowModal={setShowWishlistModal}
          productId={product.productId}
        />
      )}
    </>
  );
}

export default ProductCard;
