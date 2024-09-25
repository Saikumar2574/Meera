"use client";
import React, { Suspense, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdOutlineAddCircle, MdPushPin } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { BsChatSquareTextFill } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";
import { FaRectangleList } from "react-icons/fa6";
import Image from "next/image";
import Footer from "@/components/Footer";

function layout({children}) {
  const [dragStarted, setDragStarted] = useState(false);
  const [shortListItems, setShortListItems] = useState([]);
  const [isPinnedOpen, setIsPinnedOpen] = useState(true);
  const [isConversationsOpen, setIsConversationsOpen] = useState(true);
  const [isShortListedOpen, setIsShortListedOpen] = useState(true);
  const handleDragEnd = (result) => {
    const { destination, source } = result;
    setDragStarted(false);
    if (!destination) return;
    if (destination.droppableId === "dropedItems") {
      if (shortListItems.some((item) => item.id === source.index.id)) return;
      setShortListItems((prev) => [...prev, source.index]);
    }
  };

  const rotateAnimation = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };
  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={() => setDragStarted(true)}
    >
      <div className={`flex h-full flex-1 overflow-hidden`}>
        <motion.div
          className={`relative h-full transition-transform duration-300  w-[20%] xl:w-[25%] 4xl:w-[20%] overflow-hidden`}
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
              {/* Pinned Items Accordion */}
              <div>
                <div
                  className="font-bold flex justify-between items-center cursor-pointer mr-6"
                  onClick={() => setIsPinnedOpen(!isPinnedOpen)}
                >
                  <MdPushPin size={22} className="mr-2" />
                  Pinned Items
                  <motion.div
                    animate={isPinnedOpen ? "open" : "closed"}
                    variants={rotateAnimation}
                    className="ml-auto"
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isPinnedOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-w-full mb-6">
                    <div className="my-4 flex gap-4 overflow-x-auto hide-scrollbar">
                      <div
                        className={`rounded-md min-w-[60px] p-2 bg-gray-200 w-[60px] h-[60px] flex items-center justify-center border border-dashed border-black`}
                      >
                        <MdOutlineAddCircle size={28} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />

              {/* Conversations Accordion */}
              <div>
                <div
                  className="font-bold flex justify-between items-center cursor-pointer mr-6"
                  onClick={() => setIsConversationsOpen(!isConversationsOpen)}
                >
                  <BsChatSquareTextFill size={22} className="mr-2" />
                  Conversations
                  <motion.div
                    animate={isConversationsOpen ? "open" : "closed"}
                    variants={rotateAnimation}
                    className="ml-auto"
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isConversationsOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
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
                  </div>
                </motion.div>
              </div>

              <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />

              {/* Shortlisted Items Accordion */}
              <div>
                <div
                  className="font-bold flex justify-between items-center cursor-pointer mr-6"
                  onClick={() => setIsShortListedOpen(!isShortListedOpen)}
                >
                  <FaRectangleList size={22} className="mr-2" />
                  Shortlisted Items
                  <motion.div
                    animate={isShortListedOpen ? "open" : "closed"}
                    variants={rotateAnimation}
                    className="ml-auto"
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: isShortListedOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
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
