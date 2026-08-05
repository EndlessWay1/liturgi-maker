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
      console.log(import.meta.env.VITE_BACKEND_URL + "/api/csrf-token");
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/csrf-token",
        {
          credentials: "include",
          method: "GET",
        },
      );
      // console.log(await res.text());
      console.log(res.status);
      console.log(res.ok);
      console.log(res.headers.get("content-type"));
      const data = await res.json();
      console.log(data);
      setCsrf(data.csrfToken); // whatever your backend returns
    }
    loadCsrf();
  }, [setCsrf]);

  return (
    <CsrfContext.Provider value={{ csrf }}>{children}</CsrfContext.Provider>
  );
}

export { CsrfContext, CsrfProvider };
