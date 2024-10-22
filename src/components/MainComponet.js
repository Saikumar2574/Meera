"use client";
import { ThemeProvider } from "next-themes";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";

function MainComponent({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <div className="h-screen flex flex-col overflow-hidden">
          <main className="flex-1 flex flex-col overflow-hidden relative">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  Loading...
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          {/* You might have a footer or other elements that need styling here */}
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default MainComponent;
