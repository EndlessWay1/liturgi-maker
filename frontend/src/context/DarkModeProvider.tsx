import { createContext, type ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocalStorage } from "../hooks/useLocalStorage";

type DarkModeContextType = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const DarkModeContext = createContext<DarkModeContextType | null>(null);

function DarkModeProvider({ children }: { children: ReactNode }) {
  const systemPrefersDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  const [isDark, setIsDark] = useLocalStorage("theme", systemPrefersDark);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
