import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

export default function CartItem({
  totalItems,
  onHomeClick,
  onContinueShopping,
  onCartClick,
}) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="shop-page">
      <nav className="navbar">
        <button className="brand" onClick={onHomeClick}>Paradise Nursery</button>
        <div className="nav-links">
          <button onClick={onHomeClick}>Home</button>
          <button onClick={onContinueShopping}>Plants</button>
          <button onClick={onCartClick}>Cart 🛒 ({totalItems})</button>
        </div>
      </nav>

      <header className="shop-heading">
        <p className="eyebrow">YOUR GREEN COLLECTION</p>
        <h1>Shopping Cart</h1>
        <p>Review your plants and make your space greener.</p>
      </header>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is waiting to grow</h2>
          <p>You haven't added any plants yet.</p>
          <button className="primary-button" onClick={onContinueShopping}>
            Start Shopping
          </button>
        </section>
      ) : (
        <section className="cart-content">
          {cart.map((item) => (
            <article className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-product-details">
                <h3>{item.name}</h3>
                <p>Unit price: ${item.price.toFixed(2)}</p>
                <p className="line-total">
                  Item total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="quantity-controls">
                <button
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() =>
                    dispatch(updateQuantity({
                      id: item.id,
                      quantity: item.quantity - 1,
                    }))
                  }
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() =>
                    dispatch(updateQuantity({
                      id: item.id,
                      quantity: item.quantity + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>

              <button
                className="delete-button"
                onClick={() => dispatch(removeItem(item.id))}
              >
                Delete
              </button>
            </article>
          ))}

          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>
            <p>{totalItems} item(s) in your cart</p>
            <div className="cart-actions">
              <button className="secondary-button" onClick={onContinueShopping}>
                Continue Shopping
              </button>
              <button
                className="primary-button"
                onClick={() => window.alert("Checkout Coming Soon!")}
              >
                Checkout
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}