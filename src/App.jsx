import { Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Shop from './pages/Shop'
import ErrorBoundary from './components/ErrorBoundary'
import Cart from './pages/Cart'
import getIcon from './utils/iconUtils' 

function App() {
  const currentYear = new Date().getFullYear()
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  // Icon component declarations
  const SunIcon = getIcon('Sun')
  const MoonIcon = getIcon('Moon')
  const GiftIcon = getIcon('Gift')
  const InstagramIcon = getIcon('Instagram')
  const FacebookIcon = getIcon('Facebook')
  const TwitterIcon = getIcon('Twitter')
  const SendIcon = getIcon('Send')
  const ShoppingCartIcon = getIcon('ShoppingCart')
  const { useSelector } = require('react-redux')
  const ShoppingBagIcon = getIcon('ShoppingBag')

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white dark:bg-surface-800 shadow-sm dark:shadow-md backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GiftIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">GiftHarbor</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center">
              <ShoppingBagIcon className="h-4 w-4 mr-1" />
              Shop
            </Link>
            <Link to="/cart" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors flex items-center">
              <div className="relative">
                <ShoppingCartIcon className="h-4 w-4 mr-1" />
                {useSelector(state => state.cart.totalQuantity) > 0 && (
                  <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {useSelector(state => state.cart.totalQuantity)}
                  </div>
                )}
              </div>
              Cart
            </Link>
          </nav>


          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-surface-600" />
            )}
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={
            <ErrorBoundary><Shop /></ErrorBoundary>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 pt-10 pb-6 mt-12">
        <div className="container mx-auto px-4 space-y-8">
          {/* Main footer sections */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GiftIcon className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-primary">GiftHarbor</h2>
              </div>
              <p className="text-surface-600 dark:text-surface-400 text-sm max-w-xs">
                Your destination for unique and thoughtful gifts for every occasion. Discover perfect presents that create lasting memories.
              </p>
            </div>
            
            {/* Quick links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-surface-800 dark:text-surface-200">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                    Categories
                  </Link>
                </li>
                  <Link to="/cart" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                    Cart
                  </Link>
                </li>
                <li>
                <li>
                  <Link to="/occasions" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                    Occasions
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-surface-800 dark:text-surface-200">Customer Support</h3>
              <ul className="space-y-2">
                <li className="text-surface-600 dark:text-surface-400 text-sm">
                  <span className="block">Mon-Fri: 9am-5pm EST</span>
                </li>
                <li>
                  <Link to="tel:+1-555-123-4567" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                    +1-555-123-4567
                  </Link>
                </li>
                <li>
                  <Link to="mailto:support@giftharbor.com" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                    support@giftharbor.com
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-surface-800 dark:text-surface-200">Stay Updated</h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Subscribe for exclusive offers and gift ideas.
              </p>
              <form className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="input text-sm py-2 rounded-r-none"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit" 
                  className="btn-primary !rounded-l-none !py-2 flex items-center justify-center"
                  aria-label="Subscribe to newsletter"
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6 py-4 border-t border-surface-200 dark:border-surface-700">
            <Link to="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors">
              <FacebookIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors">
              <InstagramIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary transition-colors">
              <TwitterIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </footer>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        toastClassName="bg-white dark:bg-surface-800 shadow-soft rounded-lg"
      />
    </div>
  )
}

export default App