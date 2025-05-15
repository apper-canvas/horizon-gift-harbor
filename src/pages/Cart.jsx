import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import CartItem from '../components/CartItem';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const Cart = () => {
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  const ShoppingCartIcon = getIcon('ShoppingCart');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CreditCardIcon = getIcon('CreditCard');
  const TrashIcon = getIcon('Trash');

  const handleClearCart = () => {
    if (items.length > 0) {
      dispatch(clearCart());
      toast.info('Cart has been cleared');
    }
  };

  const handleCheckout = () => {
    if (items.length > 0) {
      toast.success('Order placed successfully!');
      dispatch(clearCart());
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <ShoppingCartIcon className="h-6 w-6 text-primary" />
          Shopping Cart
        </h1>
        <Link 
          to="/shop" 
          className="text-primary hover:text-primary-dark flex items-center gap-1 text-sm"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-xl shadow-sm">
          <ShoppingCartIcon className="h-16 w-16 mx-auto text-surface-400" />
          <h2 className="mt-4 text-xl font-medium">Your cart is empty</h2>
          <p className="mt-2 text-surface-600 dark:text-surface-400">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/shop" className="btn-primary mt-6 inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-surface-200 dark:divide-surface-700">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="p-4 flex justify-end">
              <button 
                onClick={handleClearCart}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
              >
                <TrashIcon className="h-4 w-4" />
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-surface-600 dark:text-surface-400">Items ({totalQuantity})</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-surface-200 dark:border-surface-700 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button onClick={handleCheckout} className="btn-primary w-full flex items-center justify-center gap-2">
              <CreditCardIcon className="h-4 w-4" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;