"use client";
import React, { useState } from "react";
import { CiShoppingTag } from "react-icons/ci";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";
import StoreOverview from "./StoreOverview";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetState } from "@/lib/redux/reducer/storeReducer";

function HomePage(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isStoreView, setIsStoreView] = useState(false);
  const [action, setAction] = useState(null);

  const handleActionClick = (text) => {
    if (text === action) {
      setAction(null);
    } else {
      setAction(text);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center  w-full relative overflow-y-auto p-4 md:p-0">
      <div className="max-w-[600px] md:max-w-[900px] w-full h-full relative flex flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs italic bg-yellow-300 py-2 px-4 rounded-lg font-bold mb-2">
            Interactive Store
          </p>
          <h3
            className="font-bold text-4xl lg:text-6xl text-center italic"
            style={{ letterSpacing: "2px" }}
          >
            Gear N Ride
          </h3>
          <span className="mt-1 text-sm md:text-lg italic text-center font-bold text-gray-600">
            Powered By Meera
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 w-full mt-10">
            <div
              className={`${
                action === "Looking for something specific"
                  ? "bg-black text-white scale-105"
                  : "bg-white text-black"
              } p-6 md:p-8 rounded-lg flex flex-col justify-between cursor-pointer h-60 md:h-80 transition-transform transform border hover:scale-105`}
              style={{ boxShadow: "10px 5px 20px rgba(131, 131, 131, 0.21)" }}
              onClick={() =>
                handleActionClick("Looking for something specific")
              }
            >
              <CiShoppingTag
                size={30}
                style={{ transform: "rotate(270deg)" }}
              />
              <p className="text-lg md:text-xl font-bold italic overflow-hidden">
                Looking for something specific
              </p>
              <p className="text-sm text-gray-500 italic font-semibold">
                When you have something in mind and need to find it.
              </p>
              <p className="text-sm font-semibold italic flex items-center mt-2">
                <span className="mr-2">Start Looking</span>
                <HiOutlineArrowNarrowRight size={20} />
              </p>
            </div>

            <div
              className={`${
                action === "Shopping for a specific purpose or a use case"
                  ? "bg-black text-white scale-105"
                  : "bg-white text-black"
              } p-6 md:p-8 rounded-lg flex flex-col justify-between cursor-pointer  h-60 md:h-80 transition-transform transform border hover:scale-105`}
              style={{ boxShadow: "10px 5px 20px rgba(131, 131, 131, 0.21)" }}
              onClick={() =>
                handleActionClick(
                  "Shopping for a specific purpose or a use case"
                )
              }
            >
              <IoIosSearch size={30} />
              <p className="text-lg md:text-xl font-bold italic overflow-hidden">
                Shopping for a specific purpose or a use case?
              </p>
              <p className="text-sm text-gray-500 italic font-semibold">
                When you need to discuss or plan for it with an expert.
              </p>
              <p className="text-sm font-semibold italic flex items-center mt-2">
                <span className="mr-2">Discuss With Meera</span>
                <HiOutlineArrowNarrowRight size={20} />
              </p>
            </div>

            <div
              className={`${
                action === "Explore the products in the store"
                  ? "bg-black text-white scale-105"
                  : "bg-white text-black"
              } p-6 md:p-8 rounded-lg flex flex-col justify-between cursor-pointer  h-60 md:h-80 transition-transform transform border hover:scale-105`}
              style={{ boxShadow: "10px 5px 20px rgba(131, 131, 131, 0.21)" }}
              onClick={() => {
                dispatch(resetState())
                router.push("/shop");
              }}
            >
              <IoStorefrontOutline size={30} />
              <p className="text-lg md:text-xl font-bold italic overflow-hidden">
                Explore the products in the store.
              </p>
              <p className="text-sm text-gray-500 italic font-semibold">
                When you're just looking around and need a little assistance.
              </p>
              <p className="text-sm font-semibold italic flex items-center mt-2">
                <span className="mr-2">Browse The Store</span>
                <HiOutlineArrowNarrowRight size={20} />
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto pt-3 gap-4 md:gap-8 justify-center mt-8">
            <button
              onClick={() => setIsStoreView(true)}
              className="flex w-full md:w-60 items-center justify-center text-base font-semibold italic px-5 py-2 rounded-md transition-colors duration-300 bg-black text-white hover:scale-110 hover:bg-yellow-300 hover:text-black"
              style={{ boxShadow: "10px 5px 20px rgba(131, 131, 131, 0.21)" }}
            >
              Store Overview
              <HiOutlineArrowNarrowRight size={20} className="ml-4" />
            </button>

            <button
              onClick={() => setIsStoreView(true)}
              className="flex w-full md:w-60 items-center justify-center text-base font-semibold italic px-5 py-2 rounded-md transition-colors duration-300 bg-black text-white hover:scale-110 hover:bg-yellow-300 hover:text-black"
              style={{ boxShadow: "10px 5px 20px rgba(131, 131, 131, 0.21)" }}
            >
              How To Use Meera
              <HiOutlineArrowNarrowRight size={20} className="ml-4" />
            </button>
          </div>
        </div>
      </div>
      {isStoreView && (
        <StoreOverview open={isStoreView} close={() => setIsStoreView(false)} />
      )}
    </div>
  );
}

export default HomePage;
