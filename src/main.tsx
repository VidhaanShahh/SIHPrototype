import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";   // Tailwind base styles
import "./global.css";  // 👈 Your custom global styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);