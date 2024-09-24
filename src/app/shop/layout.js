"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useRouter, usePathname } from "next/navigation";
import Cart from "@/components/Cart";
import Whishlist from "@/components/Whishlist";
import {
  getCartDetails,
  getHistory,
  getWhishlistDetails,
} from "@/components/service/getData";
import { MdOutlineAddCircle, MdOutlinePerson, MdPushPin } from "react-icons/md";
import { Drawer } from "flowbite-react";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { BsChatSquareTextFill } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";
import Image from "next/image";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FaRectangleList, FaRegRectangleList } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

const ShopLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSidebarOpen = true;
  const [breadcrumbArray, setBreadcrumbArray] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [openWishList, setOpenWishList] = useState(false);
  const [wishtList, setWishtList] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [shortListItems, setShortListItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Relevence");
  const dropdownRef = useRef(null); // Reference for the dropdown

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const options = [
    "Price : High-Low",
    "Price : Low-High",
    "Relevence",
    "Sort By Latest",
  ];
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Generate breadcrumbs based on the current route
  useEffect(() => {
    const pathSegments = pathname.split("/").filter((segment) => segment);

    const generatedBreadcrumb = pathSegments.map((segment, index) => ({
      name: capitalizeWords(segment),
      level:
        index === 0
          ? "root"
          : index === 1
          ? "parent"
          : index === 2
          ? "child"
          : "grandchild",
      url: "/" + pathSegments.slice(0, index + 1).join("/"),
    }));

    setBreadcrumbArray(generatedBreadcrumb);
  }, [pathname]);

  // Breadcrumb Click Logic
  const handleBreadcrumbClick = (item) => {
    router.push(item.url); // Navigate to the clicked breadcrumb's URL
  };

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

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    setDragStarted(false);
    if (!destination) return;
    if (destination.droppableId === "dropedItems") {
      if (shortListItems.some((item) => item.id === source.index.id)) return;
      setShortListItems((prev) => [...prev, source.index]);
    }
  };

  return (
    <div className="w-full flex h-full">
      <aside className="hidden lg:block w-16 fixed left-0 top-0 bottom-0 z-40 bg-[#04102f]">
        <Sidebar />
      </aside>
      <DragDropContext
        onDragEnd={handleDragEnd}
        onDragStart={() => setDragStarted(true)}
      >
        <div className={`flex flex-1 overflow-hidden ml-16  `}>
          <motion.div
            className={`relative h-full transition-transform duration-300 ${
              isSidebarOpen ? " w-[20%] xl:w-[25%] 4xl:w-[20%] h-full" : "w-0"
            } overflow-hidden`}
          >
            <div className="bg-[#f4f4f4] rounded-tr-[20px] h-full w-full rounded-br-[20px]  pb-4 pt-2 flex flex-col">
              <div className="px-8">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" prefetch={false}>
                    <img
                      src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
                      className="w-28 md:w-32 md:h-16"
                      alt="Shop Logo"
                    />
                  </Link>
                  <button className="rounded-full bg-gray-200">
                    <img
                      src="/avatar.png"
                      className="w-12 h-12"
                      alt="Shop Logo"
                    />
                  </button>
                </div>
                <div>
                  <h6 className="italic text-gray-500 font-bold text-sm mb-2">
                    Meera insights
                  </h6>
                  <p className="font-bold text-xl italic">
                    You can select from board list of categories
                  </p>
                </div>
              </div>

              <div className="mt-auto pl-8 pr-1">
                <div className="max-w-full mb-6">
                  <h6 className="font-bold flex gap-3 items-center">
                    {" "}
                    <MdPushPin size={22} />
                    Pinned Items
                  </h6>
                  <div
                    className={`my-4 flex gap-4 overflow-x-auto hide-scrollbar`}
                  >
                
                    <div
                      className={`rounded-md min-w-[60px] p-2 bg-gray-200 w-[60px] h-[60px] flex items-center justify-center border border-dashed border-black`}
                    >
                      <MdOutlineAddCircle size={28} />
                    </div>
                  </div>
                  {/* Add more items if needed */}
                </div>
                <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />
                {/* Conversations Section with Horizontal Scroll */}
                <div className="max-w-full ">
                  <h6 className="font-bold flex gap-3 items-center">
                    <BsChatSquareTextFill size={22} />
                    Conversations
                  </h6>
                  <div className="my-4 flex gap-4 overflow-x-auto hide-scrollbar">
                    <div className="rounded-xl bg-gray-200 p-4 min-w-[200px]">
                      <RiChat1Line size={22} />
                      <p className="font-semibold text-sm mt-3">
                        You can select from board list of categories
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-200 p-4 min-w-[200px]">
                      <RiChat1Line size={22} />
                      <p className="font-semibold text-sm mt-3">
                        Another category option here
                      </p>
                    </div>
                    {/* Add more items if needed */}
                  </div>
                </div>

                <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />

                {/* ShortListed Items Section with Horizontal Scroll */}
                <div className="max-w-full">
                  <h6 className="font-bold flex gap-3 items-center">
                    <FaRectangleList size={22} />
                    Shortlisted Items
                  </h6>
                  <div
                    className={`my-4 flex gap-4 overflow-x-auto hide-scrollbar`}
                  >
                    {dragStarted && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
                          zIndex: 11,
                        }}
                      />
                    )}
                    <Droppable droppableId="dropedItems">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{ zIndex: 12 }}
                        >
                          <div
                            className={`rounded-md min-w-[60px] p-2 bg-gray-200 w-[60px] h-[60px] flex items-center justify-center border border-dashed border-black ${
                              dragStarted && "z-30 bg-[#fff]"
                            }`}
                          >
                            <MdOutlineAddCircle size={28} />
                          </div>
                        </div>
                      )}
                    </Droppable>
                    {shortListItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-md min-w-[60px] bg-gray-200 w-[60px] h-[60px]"
                      >
                        <Image
                          width={60}
                          height={60}
                          className="rounded-md"
                          src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Add more items if needed */}
                </div>
              </div>
            </div>
          </motion.div>
          <div className="flex-1 w-full flex flex-col transition-all duration-300 ">
            <main
              id="scrollableDiv"
              className=" ml-10 h-full overflow-y-auto lg:10 2xl:px-10"
            >
              <div className="sticky top-0 bg-white w-full z-20 px-3">
                <div className="flex justify-between items-end mb-5 py-4">
                  {/* Breadcrumb */}
                  <div className=" capitalize text-base font-semibold italic ">
                    <h6 className="italic font-bold text-gray-500  text-sm">
                      Breadcrub
                    </h6>
                    {breadcrumbArray.map((item, index) => {
                      const decodedName = decodeURIComponent(
                        item.name === "Shop" ? "Home" : item.name
                      );

                      return (
                        <React.Fragment key={index}>
                          <span
                            className={`cursor-pointer capitalize ${
                              index < breadcrumbArray.length - 1
                                ? "text-blue-500"
                                : "text-black"
                            }`}
                            onClick={() => handleBreadcrumbClick(item)}
                          >
                            {decodedName}
                          </span>
                          {index < breadcrumbArray.length - 1 && " | "}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={toggleDropdown}
                  >
                    <input
                      type="text"
                      value={selectedOption}
                      readOnly
                      className="border rounded-xl py-3 px-6 bg-[#04102f] text-sm font-semibold text-white w-full cursor-pointer focus:outline-none focus:ring-0"
                      placeholder="Select an option"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                      <motion.span
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IoFilterSharp size={22} color="white" />
                      </motion.span>
                    </div>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10  w-full "
                      >
                        <div className="bg-gray-200 border rounded mt-2 shadow-lg p-2">
                          {options.map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="p-2 hover:bg-white rounded-md cursor-pointer text-sm font-semibold"
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-10 px-3">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-full">
                      <p>Loading...</p>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </div>
            </main>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </DragDropContext>
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
      <Drawer
        className="w-96"
        open={isSearch}
        onClose={() => setIsSearch(false)}
      >
        <Drawer.Header title="" titleIcon={() => <></>} />
        <Drawer.Items className="p-4">
          <Search />
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default ShopLayout;
