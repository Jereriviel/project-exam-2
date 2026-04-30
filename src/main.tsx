import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";
import App from "./App.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
