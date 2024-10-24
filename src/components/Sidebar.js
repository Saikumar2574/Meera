"use client";
import React, { useEffect, useState } from "react";
import {
  HiOutlineExclamationCircle,
  HiOutlineHeart,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiViewGrid,
} from "react-icons/hi";
import Cart from "./Cart";
import { Label, Modal, Select, Tooltip } from "flowbite-react";
import {
  getCartDetails,
  getHistory,
  getWhishlistDetails,
} from "./service/getData";
import Whishlist from "./Whishlist";
import { FaCirclePlus ,FaPlus } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BsChatSquareText } from "react-icons/bs";

const Sidebar = ({ component, setComponent, setIsSearch, setModel }) => {
  const route = useRouter();
  const [openCart, setOpenCart] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [openWishList, setOpenWishList] = useState(false);
  const [wishtList, setWishtList] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const pathname = usePathname();
  const toggleCart = async () => {
    const res = await getCartDetails();
    if (res) {
      setCartDetails(res);
      setOpenCart(true);
    }
  };

  const getWishList = async () => {
    const res = await getWhishlistDetails();
    if (res?.wishlists) {
      setWishtList(res?.wishlists);
      setOpenWishList(true);
    }
  };

  const fetchHistory = async () => {
    const res = await getHistory();
    if (res) {
      setIsSearch(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("speech-lang", language);
    }
  }, [language]);

  return (
    <div className="fixed p-3 flex justify-center items-center h-full flex-col gap-y-8 lg:gap-y-10">
      <div>
        <Tooltip
          content={<>New&nbsp;Conversation</>}
          placement="right"
          className="absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm ml-4"
        >
          <button
            className={`p-2 hover:bg-gray-200 rounded-md transition-colors group ${
              (pathname.startsWith("/search") || pathname === "/") &&
              "bg-gray-200"
            }`}
            onClick={() => route.push("/")}
          >
            <FaPlus
              size={20}
              className={`${
                pathname.startsWith("/search") || pathname === "/"
                  ? "text-black"
                  : "text-gray-400 group-hover:text-black"
              } `}
            />
          </button>
        </Tooltip>
      </div>

      {/* <div>
        <Tooltip content="Menu" placement="right">
          <button
            className="p-2 rounded-full hover:bg-gray-200 hover:rounded-md transition-colors group"
            onClick={() => {
              setComponent(null);
              setIsSearch(false);
            }}
          >
            <HiViewGrid
              size={22}
              className={`${
                component === null
                  ? "text-black"
                  : "text-gray-400 group-hover:text-black"
              } `}
            />
          </button>
        </Tooltip>
      </div> */}
      <div>
        <Tooltip content={<>Browse&nbsp;the&nbsp;store</>} placement="right" className="absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm ml-4">
          <button
            className={`p-2  hover:bg-gray-200 rounded-md transition-colors group ${
              pathname.startsWith("/shop") && "bg-gray-200"
            }`}
            onClick={() => {
              route.push("/shop");
            }}
          >
            <IoStorefrontOutline
              size={22}
              className={`${
                pathname.startsWith("/shop")
                  ? "text-black"
                  : "text-gray-400 group-hover:text-black"
              } `}
            />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Wishlist" placement="right" className="absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm ml-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 hover:rounded-md  transition-colors group"
            onClick={getWishList}
          >
            <HiOutlineHeart
              size={22}
              className={`${
                component === "wishlist"
                  ? "text-black"
                  : "text-gray-400 group-hover:text-black"
              } `}
            />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Cart" placement="right" className="absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm ml-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 hover:rounded-md  transition-colors group"
            onClick={toggleCart}
          >
            <HiOutlineShoppingCart
              size={22}
              className="text-gray-400 group-hover:text-black"
            />
          </button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content={<>All&nbsp;Conversations</>} placement="right" className="absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm ml-4">
          <button
             className={`p-2  hover:bg-gray-200 rounded-md transition-colors group ${
              pathname.startsWith("/conversations") && "bg-gray-200"
            }`}
            onClick={() => {
              route.push("/conversations");
            }}
          >
            <BsChatSquareText
              size={22}
              className={`${
                component === "search"
                  ? "text-black"
                  : "text-gray-400 group-hover:text-black"
              }`}
            />
          </button>
        </Tooltip>
      </div>
      {/* <div>
        <Tooltip content="Language" placement="right">
          <button
            className="p-2 rounded-full hover:bg-gray-200 hover:rounded-md  transition-colors group"
            onClick={() => setOpenModal(true)}
          >
            <FaCog
              size={22}
              className={`${
                component === "search"
                  ? "text-black"
                  : "text-gray-400 group-hover:text-black"
              }`}
            />
          </button>
        </Tooltip>
      </div> */}
      {/* <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="mb-2 block">
              <Label htmlFor="lang" value="Select Speech Language" />
            </div>
            <Select
              id="lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish (Spain)</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="zh-CN">Chinese (Mandarin)</option>
              <option value="kn-IN">Kannada (India)</option>
              <option value="te-IN">Telugu (India)</option>
            </Select>
          </div>
        </Modal.Body>
      </Modal> */}
      {/* {openCart && ( */}
      <Cart
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
        cartDetails={cartDetails}
        getCartDetails={toggleCart}
      />
      <Whishlist
        isOpen={openWishList}
        onClose={() => setOpenWishList(false)}
        data={wishtList}
        getWishList={getWishList}
      />
      {/* )} */}
    </div>
  );
};

export default Sidebar;
