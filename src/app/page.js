import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";



const HomePage = dynamic(() => import( "@/components/HomePage"), {
  suspense: true,  
  ssr: false, 
});

function Home(props) {
  return (
    <div className="flex h-screen">
      {/* Sidebar - fixed on the left */}
      <aside className="hidden md:block w-16 fixed left-0 top-0 bottom-0 z-40 bg-[#04102f]">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50">
          <Header />
        </header>

        {/* Main Section with Overflow */}
        <main className="flex-1 overflow-auto relative py-10">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                Loading...
              </div>
            }
          >
            <HomePage />
          </Suspense>
        </main>

        {/* Sticky Footer */}
        <footer className="sticky bottom-0 z-50">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Home;
