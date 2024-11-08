import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./cart.css";

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleQuantity = (id, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (action === "increment") {
          item.quantity += 1;
        } else if (action === "decrement" && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const goToOrderPage = () => {
    navigate("/order");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-page-item">
          {cart.map((item) => (
            <div key={item.id} className="cart-product-card">
              <div className="cart-product-img">
                <img
                  src={item.image_link}
                  alt="product-img"
                  className="cart-image"
                />
              </div>
              <div className="cart-product-details">
                <div className="cart-product-name bold-font-weight">
                  {item.name}
                </div>
                <div className="cart-product-price bold-font-weight">
                  {item.price} {item.currency}
                </div>

                <div className="product-quantity flex">
                  <div className="product-quantity-label">Quantity :</div>
                  <button
                    className="cart-product-btn"
                    onClick={() => handleQuantity(item.id, "decrement")}
                  >
                    -
                  </button>
                  <div className="cart-product-number">
                    {item.quantity || 1}
                  </div>
                  <button
                    className="cart-product-btn"
                    onClick={() => handleQuantity(item.id, "increment")}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn cart-remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="place-order" onClick={goToOrderPage}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
