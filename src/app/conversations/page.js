"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Drawer, Modal } from "flowbite-react";
import React, { useState } from "react";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoGitCompare } from "react-icons/go";
function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const [searchThread, setSearchThread] = useState(false);

  const handleCardClick = () => {
    setIsOpen(true); // Open the drawer
  };

  const toggleAccordion = () => {
    setSearchThread(!searchThread);
  };

  return (
    <>
      <Header />
      <div className="flex flex-1 items-center justify-center w-full relative">
        <div className="max-w-[1200px] w-full h-full p-6 relative">
          <h2 className="text-2xl font-bold">Conversation History</h2>
          <div className="mt-6">
            <h6 className="text-sm font-semibold">Today</h6>
            <div className="p-4 flex gap-5">
              <div
                className="border rounded-lg h-24 w-52 font-bold flex justify-center items-center cursor-pointer"
                onClick={handleCardClick} // Pass item if needed
              >
                Helmets
              </div>
              <div
                className="border rounded-lg h-24 w-52 font-bold flex justify-center items-center cursor-pointer"
                onClick={handleCardClick} // Pass item if needed
              >
                Pink Helmets
              </div>
              <div
                className="border rounded-lg h-24 w-52 font-bold flex justify-center items-center cursor-pointer"
                onClick={handleCardClick} // Pass item if needed
              >
                Jackets for women
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h6 className="text-sm font-semibold">Yesterday</h6>
            <div className="p-4 flex gap-5">
              <div
                className="border rounded-lg h-24 w-52 font-bold flex justify-center items-center cursor-pointer"
                onClick={handleCardClick} // Pass item if needed
              >
                Helmets
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="md"
        dismissible
        theme={{
          content: {
            inner:
              "relative flex max-h-[90dvh] flex-col rounded-lg bg-[#f2f2f2] shadow",
          },
        }}
        show={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Modal.Header
          theme={{
            title:
              "text-xl font-medium text-gray-900 dark:text-white flex items-center gap-4",
          }}
        >
          {" "}
          <BsChatSquareTextFill /> Helmets
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="font-semibold leading-relaxed ">
              Show me helmets for men
            </p>

            <div className="border border-gray-200 rounded-md bg-white">
              <div
                onClick={toggleAccordion}
                className="cursor-pointer font-semibold p-4 flex justify-between items-center"
              >
                <span>Search thread</span>
                <span
                  className={`transition-transform duration-300 ${
                    searchThread ? "rotate-180" : ""
                  }`}
                >
                 <FiChevronDown />
                </span>
              </div>
              <div
                className={`transition-[max-height] duration-300 overflow-hidden ${
                  searchThread ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-10 pb-4 ">
                  <ol className=" list-disc space-y-2 text-sm font-bold ">
                    <li className="text-gray-700">fullface helmets</li>
                    <li className="text-gray-700">
                      show me red colour helmets
                    </li>
                    <li className="text-gray-700">below 5000</li>
                    <li className="text-gray-700">half face helmets</li>
                  </ol>
                </div>
              </div>
            </div>
            <Button
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Resume Conversation
            </Button>

            <hr />

            <h6 className="font-semibold flex items-center gap-3">
              <GoGitCompare className=" rotate-90" />
              Dynamic Product Conversations
            </h6>
            <div className="flex flex-col gap-2 ">
              <div className="flex group items-center p-3 w-full rounded-lg border bg-white">
                <div className=" flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://gearnride.in/wp-content/uploads/2024/01/Axor-Helmet-Street-Marvel-Wolverine-Black-Yellow-Glossy-5.png"
                      alt="Product 1"
                      className="w-14 h-14 rounded-lg"
                    />
                    <img
                      src="https://gearnride.in/wp-content/uploads/2024/01/SMK-Helmet-Typhoon-Style-Black-Grey-Glossy-GL266.png"
                      alt="Product 2"
                      className="w-14 h-14 rounded-lg"
                    />
                  </div>
                  <p  className="text-sm">compare this two products</p>
                </div>
                <HiOutlineDotsHorizontal
                  size={24}
                  className="hidden group-hover:block ml-auto"
                />
              </div>
              <div className="flex group items-center p-3 w-full rounded-lg border bg-white">
                <div className=" flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://gearnride.in/wp-content/uploads/2024/01/SMK-Helmet-Typhoon-Style-Black-Grey-Glossy-GL266.png"
                      alt="Product 2"
                      className="w-14 h-14 rounded-lg"
                    />
                  </div>
                  <p className="text-sm">How safe it is compare to other</p>
                </div>
                <HiOutlineDotsHorizontal
                  size={24}
                  className="hidden group-hover:block ml-auto"
                />
              </div>
              <div className="flex group items-center p-3 w-full rounded-lg border bg-white">
                <div className=" flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://gearnride.in/wp-content/uploads/2024/01/Axor-Helmet-Street-Marvel-Wolverine-Black-Yellow-Glossy-5.png"
                      alt="Product 1"
                      className="w-14 h-14 rounded-lg"
                    />
                  </div>
                  <p  className="text-sm">more detail about this product</p>
                </div>
                <HiOutlineDotsHorizontal
                  size={24}
                  className="hidden group-hover:block ml-auto"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => setIsOpen(false)}>I accept</Button>
          <Button color="gray" onClick={() => setIsOpen(false)}>
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        className="w-96"
      >
        <Drawer.Header title="" titleIcon={() => <></>} />
        <Drawer.Items>
          <div className="mt-5">
            <h5 className="font-bold text-lg">Helmets</h5>
            <ul className="gap-2 flex flex-col">
              <li className="hover:bg-gray-200 cursor-pointer group rounded-lg p-2 flex item-center justify-between">
                show pink color <HiOutlineDotsHorizontal size={24} className="hidden group-hover:block" />
              </li>
              <li className="hover:bg-gray-200  cursor-pointer group rounded-lg p-2 flex item-center justify-between">
                show full face  <HiOutlineDotsHorizontal size={24} className="hidden group-hover:block" />
              </li>
              <li className="hover:bg-gray-200 cursor-pointer  group rounded-lg p-2 flex item-center justify-between">
                half face helmets  <HiOutlineDotsHorizontal size={24} className="hidden group-hover:block" />
              </li>
              <li className="hover:bg-gray-200 cursor-pointer group  rounded-lg p-2 flex item-center justify-between">
                for men  <HiOutlineDotsHorizontal size={24} className="hidden group-hover:block" />
              </li>
              <li className="hover:bg-gray-200 cursor-pointer group  rounded-lg p-2 flex item-center justify-between">
                for women  <HiOutlineDotsHorizontal size={24} className="hidden group-hover:block" />
              </li>
            </ul>
          </div>
        </Drawer.Items>
      </Drawer> */}
    </>
  );
}

export default Page; // Export the component as Page
