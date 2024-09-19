import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "next-themes";
import React from "react";

function Home(props) {
  return (
    <>
      <Header />
      <div className="flex flex-1 overflow-hidden w-full  ">
        <aside className="hidden lg:block w-20 bg-transparent z-40">
          {/* Sidebar Component */}
          <Sidebar />
        </aside>
        <HomePage />
      </div>
      <Footer />
    </>
  );
}

export default Home;
