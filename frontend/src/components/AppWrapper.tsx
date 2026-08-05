import Header from "./Header";
import Footer from ".//Footer";
import { useDarkMode } from "../context/DarkModeContext";
import { About } from "./contents/About";
import { Surat } from "./contents/Surat";
import Liturgi from "./contents/Liturgi";
import { Home } from "./contents/Home";
import LiturgiExp from "./contents/LiturgiExp";
import { CsrfProvider } from "../context/CSRFProvider";

export default function AppWrapper() {
  const { isDark } = useDarkMode();

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Header />
      <main>
        <Home key={"home"} />
        <LiturgiExp />
        <CsrfProvider>
          <Liturgi key={"liturgi"} />
          <Surat key={"surat"} />
        </CsrfProvider>
        <About key={"about"} />
      </main>
      <Footer />
    </div>
  );
}
