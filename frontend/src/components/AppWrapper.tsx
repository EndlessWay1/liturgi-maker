import Header from "./Header";
import { AllRoutes } from ".//AllRoutes";
import Footer from ".//Footer";
import { BrowserRouter } from "react-router-dom";
import {useDarkMode} from "../context/DarkModeContext";
import { useEffect } from "react";

export default function AppWrapper() {
  const { isDark } = useDarkMode();

  useEffect(() => {
    console.log(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header />
      <BrowserRouter>
        <AllRoutes />

        <div className='h-dvh bg-colors' />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
