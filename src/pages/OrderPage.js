import React, { useState, useEffect } from "react";
import "./order.css";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryCharges = 0;
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
    calculatePriceDetails(cartItems);
  }, []);

  const calculatePriceDetails = (items) => {
    let price = 0;
    items.forEach((item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      price += itemTotal;
    });

    setTotalPrice(price - + deliveryCharges);
   
  };

  const placeOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    setCart([]);
    setTotalPrice(0);
    navigate("/");
  }

  return (
    <div className="order-page">
      <h1>Order Summary</h1>
      <div className="price-details">
        <h2>TOTAL PRICE</h2>
        <div className="price-row">
          <span>Price ({cart.length} items)</span>
          <span>{totalPrice} $</span>
        </div>
        <div className="price-row total">
          <span>Total Amount</span>
          <span>{totalPrice.toFixed(2)} $</span>
        </div>
        
        <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default OrderPage;
