import { createContext, type ReactNode, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CsrfContextType = {
  csrf: string;
};

const CsrfContext = createContext<CsrfContextType | null>(null);

function CsrfProvider({ children }: { children: ReactNode }) {
  const [csrf, setCsrf] = useLocalStorage("csrfToken", "");

  useEffect(() => {
    async function loadCsrf() {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/csrf-token",
        {
          credentials: "include",
          method: "GET",
        },
      );
      const data = await res.json();
      setCsrf(data.csrfToken); // whatever your backend returns
    }
    loadCsrf();
  }, [setCsrf]);

  return (
    <CsrfContext.Provider value={{ csrf }}>{children}</CsrfContext.Provider>
  );
}

export { CsrfContext, CsrfProvider };
