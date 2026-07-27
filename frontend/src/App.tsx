import Header from "./components/Header";
import { AllRoutes } from "./components/AllRoutes";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Main>
          <AllRoutes />
        </Main>
        <div className='h-dvh bg-black' />
        <Footer />
      </BrowserRouter>
    </>
  );
}
