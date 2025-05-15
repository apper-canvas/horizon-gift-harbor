import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import getIcon from '../utils/iconUtils';

  const dispatch = useDispatch();
  const ShoppingCartIcon = getIcon('ShoppingCart');
  const StarIcon = getIcon('Star');

const ProductCard = ({ product, view }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  
  const HeartIcon = getIcon('Heart');
  const StarIcon = getIcon('Star');
  const EyeIcon = getIcon('Eye');
    reviewCount,
    isOnSale,
    originalPrice
  // Render stars based on rating
  const renderStars = (rating) => {
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${name} added to cart!`);
  };
  
    return Array(5).fill().map((_, i) => (
      <StarIcon 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-surface-300'}`} 
      />
    ));
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy" 

  return (
    <div className={`card card-hover group relative ${view === 'list' ? 'flex gap-4' : ''}`}>
      {/* Favorite icon */}
      <button className="absolute top-3 right-3 z-10 bg-white dark:bg-surface-800 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <HeartIcon className="w-4 h-4 text-surface-500 dark:text-surface-400 hover:text-primary dark:hover:text-primary" />
        <div className="absolute bottom-0 left-0 bg-surface-800/70 text-white text-xs px-2 py-1 rounded-tr-lg backdrop-blur-sm capitalize">

      {/* Product image */}
      <div className={`relative overflow-hidden rounded-lg mb-3 ${view === 'list' ? 'w-1/3' : 'w-full'}`}>
        <img 
          src={product.image} 
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center text-yellow-400">
            <StarIcon className="h-4 w-4 fill-current" />
        
        {/* Quick view button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setShowQuickView(true)}
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            {isOnSale && originalPrice && (
              <span className="text-surface-500 dark:text-surface-400 line-through text-sm mr-2">${originalPrice.toFixed(2)}</span>
            )}
            <span className="font-semibold text-lg">${price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="btn-primary !py-1.5 !px-3 flex items-center gap-1 text-sm"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Add
          </button>
        </div>
            className="btn bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-100 hover:bg-surface-100 flex items-center gap-1"
      <div className={view === 'list' ? 'w-2/3' : 'w-full'}>
    name: PropTypes.string.isRequired,
        <div className="flex items-center gap-2 mb-2">
          <span className="badge bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{product.category}</span>
          {product.isOnSale && <span className="badge bg-accent/20 text-accent-dark text-xs px-2 py-0.5 rounded-full">Sale</span>}
        </div>

        {/* Product name */}
        <h3 className="font-medium text-lg mb-1 leading-tight">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-surface-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-surface-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to cart button */}
        <button className="btn-primary flex items-center justify-center gap-2 w-full">
          <ShoppingCartIcon className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;