import HomePage from "@/components/Home";
import { ThemeProvider } from "next-themes";
import React from "react";

function Home(props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HomePage />
    </ThemeProvider>
  );
}

export default Home;
