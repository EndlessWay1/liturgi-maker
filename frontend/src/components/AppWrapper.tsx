import Header from "./Header";
import Footer from ".//Footer";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect } from "react";
import { About } from "./contents/About";
import { Surat } from "./contents/Surat";
import Liturgi from "./contents/Liturgi";
import { Home } from "./contents/Home";
import LiturgiExp from "./contents/LiturgiExp";

export default function AppWrapper() {
  const { isDark } = useDarkMode();

  useEffect(() => {
    console.log(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header />
      <main>
        <Home key={"home"} />
        <LiturgiExp />
        <Liturgi key={"liturgi"} />
        <Surat key={"surat"} />
        <About key={"about"} />
      </main>

      <div className='h-dvh bg-colors' />
      <Footer />
    </div>
  );
}
