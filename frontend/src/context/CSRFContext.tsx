// context/DarkModeContext.tsx

import { useContext } from "react";
import { CsrfContext } from "./CSRFProvider";

export function useCsrf() {
  const ctx = useContext(CsrfContext);
  if (!ctx) throw new Error("useCsrf must be used inside a CsrfProvider");
  return ctx;
}
