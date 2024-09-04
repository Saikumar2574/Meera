"use client";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { MdClose } from "react-icons/md";

export default function ChatInput() {
  const summaryRef = useRef(null); // Reference to the Summary section
  const inputRef = useRef(null); // Reference to the Input section
  const mainContainerRef = useRef(null); // Reference to the main container for scrolling
  const [activeSection, setActiveSection] = useState("summary");

  // Function to scroll to a specific section within the content
  const handleScroll = (section) => {
    if (mainContainerRef.current) {
      const targetRef = section === "summary" ? summaryRef : inputRef;
      if (targetRef.current) {
        const targetOffsetTop = targetRef.current.offsetTop;
        mainContainerRef.current.scrollTo({
          top: targetOffsetTop,
          behavior: "smooth",
        });
        setActiveSection(section); // Set the active section
      }
    }
  };

  // Scroll to the summary section by default on initial render
  useEffect(() => {
    handleScroll("summary");
  }, []);

  return (
    <div className="bg-white w-full h-full flex pl-10">
      <div className="w-[20%] h-screen flex flex-col sticky top-0 bg-white z-10">
        <video
          src="/inputVedio.mp4"
          alt="Animated Video"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        />
        <button
          onClick={() => handleScroll("summary")}
          className={`px-4 py-2 rounded ${
            activeSection === "summary"
              ? "text-white bg-blue-500"
              : "text-gray-700 bg-gray-200 hover:bg-blue-500 hover:text-white"
          } my-5`}
        >
          Summary
        </button>
        <button
          onClick={() => handleScroll("input")}
          className={`px-4 py-2 rounded ${
            activeSection === "input"
              ? "text-white bg-blue-500"
              : "text-gray-700 bg-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Input
        </button>
      </div>
      <div
        ref={mainContainerRef}
        className="flex-1 overflow-y-auto ml-10"
      >
        <div className="tab-content">
          <div ref={summaryRef} id="summary" className="tab-pane my-4">
            <h2 className="text-xl font-bold">Summary Content</h2>
            <p className="mb-80">This is the summary content area.</p>
            <p className="mb-80">This is the summary content area.</p>
            {/* Summary content here */}
          </div>
          <div ref={inputRef} id="input" className="tab-pane">
            <h2 className="text-xl font-bold">Input Content</h2>
            <p>This is the input content area.</p>
            {/* Input content here */}
          </div>
        </div>
      </div>
    </div>
  );
}
