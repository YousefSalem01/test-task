import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #e2e8f0",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        },
        success: {
          iconTheme: {
            primary: "#4361EE",
            secondary: "#FFFFFF"
          }
        }
      }}
    />
  </React.StrictMode>
);
