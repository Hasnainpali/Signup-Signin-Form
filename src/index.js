import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import DataContext from "./context/DataContext";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <BrowserRouter>
        <DataContext>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </DataContext>
    </BrowserRouter>
)   