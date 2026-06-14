import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/App.css";
import RouterConfig from "./config/RouterConfig";
import { Toaster } from "sonner";
import AuthProvider from "./lib/provider/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <RouterConfig />
    </AuthProvider>
  </StrictMode>,
);
