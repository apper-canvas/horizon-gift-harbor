import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeFromCart } from '../redux/cartSlice';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const MinusIcon = getIcon('Minus');
  const PlusIcon = getIcon('Plus');
  const TrashIcon = getIcon('Trash2');

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    
    dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
    toast.info(`Updated quantity for ${item.name}`);
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b border-surface-200 dark:border-surface-700">
      <div className="w-24 h-24 flex-shrink-0 bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-lg text-surface-900 dark:text-surface-100">{item.name}</h3>
        <p className="text-surface-600 dark:text-surface-400 text-sm">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600"
          aria-label="Decrease quantity"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600"
          aria-label="Increase quantity"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      
      <button onClick={handleRemove} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2" aria-label="Remove item">
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default CartItem;