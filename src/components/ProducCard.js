import './ProductCard.css'

const ProductCard = ({ product }) => {
    const getLimitedDescription = (text, wordLimit) => {
      if (!text) return ''; 
      const words = text.split(' ');
      return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(' ') + '...';
    };
  
      return (
        <div className="product-card">
          <img src={product.image_link} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{getLimitedDescription(product.description, 15)}</p>
          <p><strong>{product.price} {product.price_sign}</strong></p>
        </div>
      );
};
    
export default ProductCard;
