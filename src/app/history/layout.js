import React, { Suspense } from "react";
import Footer from "@/components/Footer";
import ProductSidebar from "@/components/productSidebar";
import Sidebar from "@/components/Sidebar";

function layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar - fixed on the left */}
      <aside className="hidden lg:block w-16 fixed left-0 top-0 bottom-0 z-40 bg-[#04102f]">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16">
        {/* Sticky Header */}
        {/* <header className="sticky top-0 z-50">
        <Header />
      </header> */}

        {/* Main Section with Overflow */}
        <main className="flex-1 flex flex-col overflow-auto relative">
          <div className={`flex h-full flex-1 overflow-hidden`}>
            <ProductSidebar />
            <div className="flex-1 w-full flex flex-col transition-all duration-300 ">
              <main className=" ml-10 h-full overflow-y-auto  mt-10 px-3">
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
        </main>
      </div>
    </div>
  );
}

export default layout;
