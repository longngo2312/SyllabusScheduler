import {createRoot} from "react-dom/client"
import React from "react"
import App from "./src/frontend/App.jsx"
import "./src/index.css"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)