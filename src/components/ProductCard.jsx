import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const ProductCard = ({ product, view }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const HeartIcon = getIcon('Heart');
  const StarIcon = getIcon('Star');
  const EyeIcon = getIcon('Eye');
  const ShoppingCartIcon = getIcon('ShoppingCart');
  
  const { name, price, category, rating, reviewCount, isOnSale, originalPrice, image } = product;
  
  const handleAddToCart = (e) => {
    try {
      e.preventDefault();
      dispatch(addToCart(product));
      toast.success(`${name} added to cart!`);
      // Removed navigation to cart to allow users to continue shopping
    } catch (error) {
      toast.error(`Could not add ${name} to cart. Please try again.`);
    }
  };
  
  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5).fill().map((_, i) => (
      <StarIcon 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-surface-300'}`} 
      />
    ));
   };

  return (
    <div className={`card card-hover group relative ${view === 'list' ? 'flex gap-4' : ''}`}>
      {/* Favorite icon */}
      <button className="absolute top-3 right-3 z-10 bg-white dark:bg-surface-800 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <HeartIcon className="w-4 h-4 text-primary" />
      </button>
      
      {/* Product image */}
      <div className={`relative overflow-hidden rounded-lg mb-3 ${view === 'list' ? 'w-1/3' : 'w-full'}`}>
        <img 
          src={image} 
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy" 
          alt={name}
        />

        {/* Quick view button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowQuickView(true)}
            className="btn bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-100 hover:bg-surface-100 flex items-center gap-1"
          >
            <EyeIcon className="h-4 w-4" />
            Quick View
          </button>
        </div>

        {isOnSale && originalPrice && (
          <div className="absolute bottom-0 left-0 bg-surface-800/70 text-white text-xs px-2 py-1 rounded-tr-lg backdrop-blur-sm capitalize">
            Sale
          </div>
        )}
      </div>
      
      {/* Product details */}
      <div className={view === 'list' ? 'w-2/3' : ''}>
        {/* Category and badges */}
        <div className="flex items-center gap-1 mb-1">
          <span className="badge bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{category}</span>
          {isOnSale && <span className="badge bg-accent/20 text-accent-dark text-xs px-2 py-0.5 rounded-full">Sale</span>}
        </div>
        
        {/* Product name */}
        <h3 className="font-medium text-lg mb-1 leading-tight">{name}</h3>
        
        {/* Ratings */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex mr-2">
            {renderStars(rating)}
          </div>
          <span className="text-xs text-surface-500">({reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-lg">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-surface-500 line-through text-sm">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        {/* Add to cart button */}
        <button 
          onClick={handleAddToCart}
          className="btn-primary flex items-center justify-center gap-2 w-full"
        >
          <ShoppingCartIcon className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;