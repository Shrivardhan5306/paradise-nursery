import { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {page === "home" && (
        <main className="landing">
          <div className="landing-overlay">
            <p className="eyebrow">BRING NATURE HOME</p>
            <h1>Paradise Nursery</h1>
            <p className="tagline">Where Green Meets Serenity</p>
            <p className="hero-description">
              Discover beautiful houseplants that make your home feel fresh,
              peaceful, and alive.
            </p>
            <button className="primary-button" onClick={() => setPage("plants")}>
              Get Started
            </button>
          </div>
          <AboutUs />
        </main>
      )}

      {page === "plants" && (
        <ProductList
          totalItems={totalItems}
          onHomeClick={() => setPage("home")}
          onCartClick={() => setPage("cart")}
        />
      )}

      {page === "cart" && (
        <CartItem
          totalItems={totalItems}
          onHomeClick={() => setPage("home")}
          onContinueShopping={() => setPage("plants")}
          onCartClick={() => setPage("cart")}
        />
      )}
    </div>
  );
}