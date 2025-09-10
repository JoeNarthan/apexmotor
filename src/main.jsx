// src/main.jsx
import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";
import { SoldProvider } from "./context/SoldContext";
import './utils/i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <FilterProvider>
                  <SoldProvider>
                    <App />
                  </SoldProvider>
                </FilterProvider>
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
