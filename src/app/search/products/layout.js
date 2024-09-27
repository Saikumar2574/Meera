"use client";
import React, { Suspense, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdOutlineAddCircle, MdPerson, MdPushPin } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { BsChatSquareTextFill } from "react-icons/bs";
import { RiChat1Line, RiDeleteBinLine } from "react-icons/ri";
import { FaRectangleList } from "react-icons/fa6";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedIds } from "@/lib/redux/reducer/productReducer";
import { logout } from "@/lib/redux/reducer/authReducer";
import Auth from "@/components/Auth";

function layout({ children }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token || null);
  const [dragStarted, setDragStarted] = useState(false);
  const [shortListItems, setShortListItems] = useState([]);
  const pinnedItems = useSelector((state) => state.products?.selectedIds);
  const [showAuth, setShowAuth] = useState(false);

  const [openSection, setOpenSection] = useState("");

  // Function to toggle sections
  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? "" : section)); // Close if same section clicked again
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
  const handleRemovePinnedItem = (id) => {
    const resetProsucts = pinnedItems.filter((item) => {
      if (item?.productId) {
        return item.productId !== id;
      }
    });
    dispatch(setSelectedIds(resetProsucts));
  };
  const rotateAnimation = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };
  // Effect to expand Pinned Items section if a new item is added
  useEffect(() => {
    if (pinnedItems && pinnedItems.length > 0) {
      setOpenSection("pinned");
    }
  }, [pinnedItems]);

  // Effect to expand Shortlisted Items section if a new item is added
  useEffect(() => {
    if (shortListItems && shortListItems.length > 0) {
      setOpenSection("shortlisted");
    }
  }, [shortListItems]);
  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={() => setDragStarted(true)}
    >
      <Auth openModal={showAuth} onCloseModal={() => setShowAuth(false)} />
      <div className={`flex h-full flex-1 overflow-hidden`}>
        <motion.div
          className={`relative h-full transition-transform duration-300  w-[20%] xl:w-[25%] 4xl:w-[20%] overflow-hidden`}
        >
          <div className="bg-[#fcfcfc] rounded-tr-[20px] h-full w-full rounded-br-[20px]  pb-4 pt-2 flex flex-col">
            <div className="px-8">
              <div className="flex justify-between items-center mb-6">
                <Link href="/" prefetch={false}>
                  <img
                    src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
                    className="w-28 md:w-32 md:h-16"
                    alt="Shop Logo"
                  />
                </Link>
                {token ? (
                  <button
                    onClick={() => dispatch(logout())}
                    className="rounded-full bg-gray-200"
                  >
                    <img
                      src="/avatar.png"
                      className="w-12 h-12"
                      alt="Shop Logo"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className=" flex text-black  hover:text-gray-600    font-semibold text-lg   rounded-full md:rounded-full"
                  >
                    <MdPerson size={26} />
                    <span className="hidden md:inline ml-3">Login</span>
                  </button>
                )}
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
              {/* Pinned Items Section */}
              <div>
                <div
                  className="font-bold flex justify-between items-center cursor-pointer mr-6"
                  onClick={() => toggleSection("pinned")}
                >
                  <MdPushPin size={22} className="mr-2" />
                  Pinned Items ({pinnedItems?.length || 0})
                  <motion.div
                    animate={openSection === "pinned" ? "open" : "closed"}
                    variants={rotateAnimation}
                    className="ml-auto"
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: openSection === "pinned" ? "auto" : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="max-w-full mb-6 mr-5">
                    {/* Pinned Products */}
                    <div
                      className="my-4 flex flex-col gap-4 overflow-y-auto hide-scrollbar"
                      style={{ maxHeight: "300px" }}
                    >
                      {pinnedItems && pinnedItems.length > 0 ? (
                        pinnedItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-md group relative flex-shrink-0 flex w-full h-[80px] bg-gray-200 p-4 gap-2"
                          >
                            <Image
                              width={60}
                              height={60}
                              className="rounded-md w-14 h-14"
                              src={
                                item.image ? item.image : item.images?.[0].src
                              }
                            />
                            <div>
                              <p className="text-sm font-semibold line-clamp-2 overflow-hidden text-ellipsis w-full">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-400 italic font-semibold">
                                &#8377;{item.price}
                              </p>
                            </div>
                            <button
                              className="hidden group-hover:block"
                              onClick={() =>
                                handleRemovePinnedItem(item.productId)
                              }
                            >
                              <RiDeleteBinLine color="red" size={18} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No pinned products available.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />

              {/* Conversations Section */}
              <div>
                <div
                  className="font-bold flex  justify-between items-center cursor-pointer mr-6"
                  onClick={() => toggleSection("conversations")}
                >
                  <BsChatSquareTextFill size={22} className="mr-2" />
                  Conversations
                  <motion.div
                    animate={
                      openSection === "conversations" ? "open" : "closed"
                    }
                    variants={rotateAnimation}
                    className="ml-auto"
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: openSection === "conversations" ? "auto" : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="max-w-full mb-6 mr-5">
                    {/* Conversations */}
                    <div
                      className="my-4 flex flex-col gap-4  overflow-y-auto hide-scrollbar"
                      style={{ maxHeight: "300px" }}
                    >
                      <div className="rounded-xl relative group bg-gray-200 p-4 min-w-[200px]">
                        <div className="flex justify-between items-center">
                          <RiChat1Line size={22} />
                          <button className="hidden group-hover:block">
                            <RiDeleteBinLine color="red" size={18} />
                          </button>
                        </div>
                        <p className="font-semibold text-sm mt-3">
                          You can select from board list of categories
                        </p>
                      </div>
                      {/* Add more static items as needed */}
                    </div>
                  </div>
                </motion.div>
              </div>

              <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />

              {/* Shortlisted Items Section */}
              <div>
                <div
                  className="font-bold flex justify-between items-center cursor-pointer mr-6"
                  onClick={() => toggleSection("shortlisted")}
                >
                  <FaRectangleList size={22} className="mr-2" />
                  Shortlisted Items
                  <motion.div
                    animate={openSection === "shortlisted" ? "open" : "closed"}
                    variants={rotateAnimation}
                    className="ml-auto"
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: openSection === "shortlisted" ? "auto" : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className={`my-4 flex flex-col  gap-4  overflow-y-auto hide-scrollbar`}
                    style={{ maxHeight: "300px" }}
                  >
                    {dragStarted && (
                      <>
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
                      </>
                    )}
                    {/* <Droppable droppableId="dropedItems">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{ zIndex: 12 }}
                            >
                              <div
                                className={`rounded-md min-w-[60px] p-2 bg-gray-200 w-[60px] h-[60px] flex items-center justify-center border border-dashed border-black ${
                                  dragStarted && "z-30 bg-[#fff] "
                                }`}
                              >
                                <MdOutlineAddCircle size={28} />
                              </div>
                            </div>
                          )}
                        </Droppable> */}

                    {shortListItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-md group relative flex-shrink-0 flex w-full h-[80px] bg-gray-200 p-4 gap-2"
                      >
                        <Image
                          width={60}
                          height={60}
                          className="rounded-md w-14 h-14"
                          src="https://gearnride.in/wp-content/uploads/2023/01/solace-rain-jacket-rain-pro-v2-2.jpg"
                        />
                        <div>
                          <p className="text-sm font-semibold line-clamp-2 overflow-hidden text-ellipsis w-full">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-400 italic font-semibold">
                            &#8377;{item.price}
                          </p>
                        </div>
                        <button
                          className="hidden group-hover:block"
                          onClick={() => {
                            const resetList = shortListItems.filter(
                              (list) => list.id !== item.id
                            );
                            setShortListItems(resetList);
                          }}
                        >
                          <RiDeleteBinLine color="red" size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="flex-1 w-full flex flex-col transition-all duration-300 ">
          <main className=" ml-10 h-full overflow-y-auto lg:10 2xl:px-10">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <p>Loading...</p>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </DragDropContext>
  );
}

export default layout;
