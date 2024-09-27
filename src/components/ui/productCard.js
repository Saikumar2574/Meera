import { Tooltip } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdCart } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoBag } from "react-icons/io5";
import { MdFavorite, MdPushPin } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { BorderBeam } from "../magicui/border-beam";
import ShineBorder from "../magicui/shine-border";
function ProductCard({ product, pinnedProducts, togglePin }) {
  const [isOpen, setIsOpen] = useState("");
  const toggleMenu = (productId) => {
    setIsOpen(isOpen === productId ? "" : productId); // Toggle the menu for a specific product
  };

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
  return (
    <div
      className={`relative p-5 group d-no rounded-lg 
        ${
          pinnedProducts?.some((prevCard) =>
            product?.productId
              ? prevCard?.productId === product?.productId
              : prevCard?.id === product?.id
          )
            ? "border-t-4 border border-t-blue-600"
            : "border border-gray-200"
        }
      `}
      //   className={"relative p-5 group  rounded-lg border border-gray-200"}
      //   hide={pinnedProducts?.some((prevCard) =>
      //       product?.productId
      //         ? prevCard?.productId === product?.productId
      //         : prevCard?.id === product?.id
      //     )}
    >
      <div className="relative z-[1]">
        {/* className={`relative p-5 group d-no rounded-lg 
        ${
        pinnedProducts?.some((prevCard) =>
          product?.productId
            ? prevCard?.productId === product?.productId
            : prevCard?.id === product?.id
        )
          ? "border-2 border-black"
          : "border border-gray-200"
      }
      `} */}
        {/* <BorderBeam
      borderWidth={2.5}
        className={`${
          pinnedProducts?.some((prevCard) =>
            product?.productId
              ? prevCard?.productId === product?.productId
              : prevCard?.id === product?.id
          )
            ? "block"
            : "hidden"
        }`}
      /> */}
        {/* Pin and Title */}

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
                color: pinnedProducts?.some((prevCard) =>
                  product.productId
                    ? prevCard?.productId === product?.productId
                    : prevCard?.id === product?.id
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
              // togglePin(product.id);
            }}
            className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold bg-gray-200 text-black hover:bg-black hover:text-white rounded-md transition duration-200 "
          >
            Add to shortlist
          </button>

          {/* Cart and More Actions */}
          <Tooltip content="Add to cart" placement="bottom">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // togglePin(product.id);
              }}
              className="bg-gray-200 text-black hover:bg-black hover:text-white rounded-md p-2 "
            >
              <IoMdCart size={20} />
            </button>
          </Tooltip>

          {/* More Actions Menu */}
          <div
            onMouseEnter={() => toggleMenu(product?.id)}
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
            {isOpen === product?.id && (
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
                      className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                    >
                      <IoMdCart size={20} /> Add to Cart
                      {/* <FaArrowRightLong size={22}/> */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                    >
                      <IoBag size={20} /> Buy Now
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                    >
                      <MdFavorite size={20} color="red" />
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                    >
                      <MdPushPin size={20} />
                      Pin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" px-4 py-2 flex items-center rounded-md gap-5 hover:bg-white text-gray-700"
                    >
                      <FaRectangleList size={20} />
                      Shortlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
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
  );
}

export default ProductCard;
