"use client";
import React, { Suspense, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Footer from "@/components/Footer";
import ProductSidebar from "@/components/productSidebar";

function layout({ children }) {
  const [dragStarted, setDragStarted] = useState(false);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
   
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={() => setDragStarted(true)}
    >
      <div className={`flex h-full flex-1 overflow-hidden`}>
        <ProductSidebar />
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
