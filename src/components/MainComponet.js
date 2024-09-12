import { ThemeProvider } from "next-themes";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import HomePage from "./Home";
import Footer from "./Footer";

function MainComponet({ children }) {
//  const router = useRouter()

 

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-full flex flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden w-full  ">
          <aside className="hidden lg:block w-20 bg-transparent z-40">
            {/* Sidebar Component */}
            <Sidebar />
          </aside>
          {children}
          {/* <HomePage /> */}
          <Footer/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MainComponet;
