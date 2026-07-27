import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { DarkModeProvider } from "./context/DarkModeProvider";
import AppWrapper from "./components/AppWrapper";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <DarkModeProvider>
      <AppWrapper/>
    </DarkModeProvider>
  );
}
