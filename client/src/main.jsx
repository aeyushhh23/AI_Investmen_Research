import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

      <ThemeProvider>

    <App />

</ThemeProvider>

        <Toaster
            position="top-right"
            toastOptions={{
                style:{
                    background:"#0f172a",
                    color:"#fff",
                    border:"1px solid #334155"
                }
            }}
        />

    </React.StrictMode>

);