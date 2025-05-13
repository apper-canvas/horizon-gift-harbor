import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import getIcon from '../utils/iconUtils'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Icon component declarations
  const ShoppingBagIcon = getIcon('ShoppingBag')
  const GiftIcon = getIcon('Gift')
  const HeartIcon = getIcon('Heart')
  const TruckIcon = getIcon('Truck')
  const TagIcon = getIcon('Tag')
  
  useEffect(() => {
    // Simulate API fetch for featured products
    const fetchFeaturedProducts = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockProducts = [
        {
          id: '1',
          name: 'Handcrafted Ceramic Mug',
          description: 'A beautiful handcrafted ceramic mug, perfect for your morning coffee or evening tea.',
          price: 24.99,
          salePrice: null,
          image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          categories: ['Home', 'Kitchen'],
          tags: ['handmade', 'ceramic', 'kitchen'],
          inventory: 15
        },
        {
          id: '2',
          name: 'Scented Soy Candle Set',
          description: 'Set of 3 natural soy wax candles with relaxing scents to create the perfect ambiance.',
          price: 34.99,
          salePrice: 29.99,
          image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          categories: ['Home', 'Decor'],
          tags: ['candles', 'aromatherapy', 'relaxation'],
          inventory: 8
        },
        {
          id: '3',
          name: 'Artisan Chocolate Box',
          description: 'Luxury box of 12 handcrafted chocolates with unique flavor combinations.',
          price: 28.99,
          salePrice: null,
          image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          categories: ['Food', 'Sweets'],
          tags: ['chocolate', 'gourmet', 'gift box'],
          inventory: 20
        },
        {
          id: '4',
          name: 'Personalized Journal',
          description: 'High-quality leather journal that can be personalized with initials or a short message.',
          price: 39.99,
          salePrice: 32.99,
          image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          categories: ['Stationery', 'Personalized'],
          tags: ['journal', 'leather', 'personalized'],
          inventory: 12
        }
      ]
      
      setFeaturedProducts(mockProducts)
      setIsLoading(false)
    }
    
    fetchFeaturedProducts()
  }, [])
  
  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
    })
  }
  
  const handleAddToWishlist = (product) => {
    toast.info(`${product.name} added to wishlist!`, {
      icon: '❤️',
    })
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find the Perfect Gift for Every Occasion
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-md">
                Discover unique and thoughtful gifts that will delight your loved ones, all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn bg-white text-primary hover:bg-surface-100 hover:text-primary-dark flex items-center gap-2">
                  <ShoppingBagIcon className="w-5 h-5" />
                  <span>Shop Now</span>
                </button>
                <button className="btn border-2 border-white text-white hover:bg-white/20">
                  Explore Categories
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Collection of beautiful gifts" 
                className="rounded-lg shadow-2xl object-cover h-[400px] w-full"
              />
              <div className="absolute -bottom-5 -right-5 bg-accent text-surface-800 p-4 rounded-lg shadow-lg font-bold">
                <span className="text-xl">Special Offers!</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: GiftIcon, 
                title: "Unique Selection", 
                description: "Carefully curated gifts you won't find anywhere else" 
              },
              { 
                icon: HeartIcon, 
                title: "Made With Love", 
                description: "Support small businesses and artisans with every purchase" 
              },
              { 
                icon: TruckIcon, 
                title: "Fast Delivery", 
                description: "Quick shipping and gift-ready packaging" 
              },
              { 
                icon: TagIcon, 
                title: "Best Value", 
                description: "Quality gifts at reasonable prices" 
              }
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card card-hover flex flex-col items-center text-center p-8"
                >
                  <div className="w-14 h-14 mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <FeatureIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Gifts</h2>
            <a href="#" className="text-primary hover:text-primary-dark font-medium flex items-center gap-1">
              View All
              <span className="text-lg">→</span>
            </a>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-lg overflow-hidden animate-pulse">
                  <div className="bg-surface-200 dark:bg-surface-700 h-64 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4"></div>
                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2"></div>
                    <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="card card-hover overflow-hidden group"
                >
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg -mx-6 -mt-6">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.salePrice && (
                      <span className="absolute top-2 right-2 bg-primary text-white text-sm font-bold px-2 py-1 rounded">
                        SALE
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="p-2 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                          aria-label="Add to cart"
                        >
                          <ShoppingBagIcon className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleAddToWishlist(product)}
                          className="p-2 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                          aria-label="Add to wishlist"
                        >
                          <HeartIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-2">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-primary">${product.salePrice.toFixed(2)}</span>
                          <span className="text-surface-500 line-through text-sm">${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <span className="text-xs text-surface-500 dark:text-surface-400">
                      {product.inventory > 10 ? 'In Stock' : `Only ${product.inventory} left`}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Main Feature: Gift Finder */}
      <MainFeature />
    </div>
  )
}

export default Home