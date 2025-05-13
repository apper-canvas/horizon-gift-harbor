import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import getIcon from '../utils/iconUtils'

const NotFound = () => {
  const navigate = useNavigate()
  
  // Icon component declarations
  const ArrowLeftIcon = getIcon('ArrowLeft')
  const HomeIcon = getIcon('Home')
  const SearchIcon = getIcon('Search')
  
  useEffect(() => {
    // Set the document title
    document.title = 'Page Not Found - GiftHarbor'
    
    // Optional: Auto-redirect after delay
    // const timer = setTimeout(() => navigate('/'), 10000)
    // return () => clearTimeout(timer)
  }, [navigate])
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center">
          <SearchIcon className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track to find the perfect gift.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound