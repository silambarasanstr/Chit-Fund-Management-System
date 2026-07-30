import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import App from "./App.jsx";
import AppProviders from "./app/AppProviders";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <Toaster position="top-right" richColors closeButton duration={3000} />
    </AppProviders>
  </StrictMode>,
);
