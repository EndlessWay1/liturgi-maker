import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const useDarkMode = () => {
  const systemPrefersDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  const [isDark, setIsDark] = useState(systemPrefersDark);

  return {isDark, setIsDark};
};

export default useDarkMode;
