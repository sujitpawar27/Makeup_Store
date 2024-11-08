import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import ProductCard from "../components/ProducCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState([
    "Blush", "Bronzer", "Eyebrow", "Eyeliner", "Eyeshadow", 
    "Foundation", "Lip liner", "Lipstick", "Mascara", "Nail Polish"
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios
      .get("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then((response) => {
        console.log(response.data); 
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter((product) => 
        product.product_type && product.product_type.toLowerCase() === category.toLowerCase()
      );
      console.log(filtered);
      
      setFilteredProducts(filtered);
    }
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, product]));
  };

  return (
    <div className="HomeContainer">
      <h1 className="App-header">Makeup Store</h1>

      
      <div className="category-filter">
        <button onClick={() => handleCategoryChange("")}>All</button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={category === selectedCategory ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

    
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <ProductCard key={product.id} product={product} />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
