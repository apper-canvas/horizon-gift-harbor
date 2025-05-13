import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import getIcon from '../utils/iconUtils'

const MainFeature = () => {
  // Icon component declarations
  const GiftIcon = getIcon('Gift')
  const SearchIcon = getIcon('Search')
  const HeartIcon = getIcon('Heart')
  const ShoppingBagIcon = getIcon('ShoppingBag')
  const ChevronRightIcon = getIcon('ChevronRight')
  const RefreshCcwIcon = getIcon('RefreshCcw')
  const CopyIcon = getIcon('Copy')
  const CheckIcon = getIcon('Check')
  
  // Form state
  const [giftFinderState, setGiftFinderState] = useState({
    occasion: '',
    recipient: '',
    priceRange: '',
    interests: '',
    step: 1,
    loading: false
  })
  
  // Results state
  const [giftResults, setGiftResults] = useState([])
  const [copiedId, setCopiedId] = useState(null)
  
  // Gift occasions
  const occasions = [
    { id: 'birthday', name: 'Birthday' },
    { id: 'anniversary', name: 'Anniversary' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'graduation', name: 'Graduation' },
    { id: 'housewarming', name: 'Housewarming' },
    { id: 'holiday', name: 'Holiday/Christmas' }
  ]
  
  // Recipients
  const recipients = [
    { id: 'partner', name: 'Partner/Spouse' },
    { id: 'friend', name: 'Friend' },
    { id: 'parent', name: 'Parent' },
    { id: 'sibling', name: 'Sibling' },
    { id: 'coworker', name: 'Coworker' },
    { id: 'child', name: 'Child' }
  ]
  
  // Price ranges
  const priceRanges = [
    { id: 'budget', name: 'Under $25' },
    { id: 'mid', name: '$25-$50' },
    { id: 'premium', name: '$50-$100' },
    { id: 'luxury', name: '$100+' }
  ]
  
  // Interest categories
  const interestCategories = [
    { id: 'cooking', name: 'Cooking & Baking' },
    { id: 'tech', name: 'Technology & Gadgets' },
    { id: 'wellness', name: 'Wellness & Self-care' },
    { id: 'outdoors', name: 'Outdoors & Adventure' },
    { id: 'reading', name: 'Reading & Literature' },
    { id: 'crafts', name: 'Arts & Crafts' },
    { id: 'home', name: 'Home & Décor' },
    { id: 'fashion', name: 'Fashion & Accessories' }
  ]
  
  // Mock gift database
  const giftDatabase = [
    {
      id: 'g1',
      name: 'Personalized Star Map',
      description: 'A custom star map showing the night sky from a specific date and location.',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1534695215921-52f8a19e5459?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['anniversary', 'wedding', 'birthday'],
      recipients: ['partner', 'friend', 'parent'],
      priceRange: 'mid',
      interests: ['home']
    },
    {
      id: 'g2',
      name: 'Gourmet Chocolate Assortment',
      description: 'Luxury box of artisanal chocolates with unique flavor combinations.',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['birthday', 'anniversary', 'holiday'],
      recipients: ['partner', 'friend', 'coworker'],
      priceRange: 'mid',
      interests: ['cooking']
    },
    {
      id: 'g3',
      name: 'Smart Indoor Garden',
      description: 'Self-watering indoor garden that grows herbs, vegetables, and flowers automatically.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1585584556784-18b02d126a13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['housewarming', 'birthday'],
      recipients: ['friend', 'parent', 'partner'],
      priceRange: 'premium',
      interests: ['cooking', 'home', 'tech']
    },
    {
      id: 'g4',
      name: 'Personalized Recipe Cutting Board',
      description: 'Handcrafted wooden cutting board with a custom engraved family recipe.',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1594378444688-326b2c9d0c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['housewarming', 'wedding', 'anniversary'],
      recipients: ['parent', 'partner'],
      priceRange: 'premium',
      interests: ['cooking', 'home']
    },
    {
      id: 'g5',
      name: 'Luxury Scented Candle Set',
      description: 'Set of three premium scented candles in elegant glass containers.',
      price: 38.99,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['holiday', 'housewarming', 'birthday'],
      recipients: ['friend', 'coworker', 'parent'],
      priceRange: 'mid',
      interests: ['home', 'wellness']
    },
    {
      id: 'g6',
      name: 'Wireless Noise Cancelling Headphones',
      description: 'Premium headphones with active noise cancellation and long battery life.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['graduation', 'birthday'],
      recipients: ['sibling', 'friend', 'child'],
      priceRange: 'luxury',
      interests: ['tech']
    },
    {
      id: 'g7',
      name: 'Customized Photo Book',
      description: 'Beautifully bound photo book with your cherished memories.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521206698660-5e077ff6f9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['anniversary', 'birthday', 'holiday'],
      recipients: ['partner', 'parent', 'friend'],
      priceRange: 'mid',
      interests: ['crafts']
    },
    {
      id: 'g8',
      name: 'Artisan Ceramic Mug Set',
      description: 'Set of four handcrafted ceramic mugs, each with unique patterns.',
      price: 48.99,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['housewarming', 'wedding'],
      recipients: ['friend', 'coworker', 'parent'],
      priceRange: 'mid',
      interests: ['home', 'cooking']
    },
    {
      id: 'g9',
      name: 'Deluxe Spa Gift Basket',
      description: 'Luxurious bath and body products arranged in an elegant gift basket.',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1570194065650-d99513979d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['birthday', 'holiday', 'anniversary'],
      recipients: ['partner', 'friend', 'parent'],
      priceRange: 'premium',
      interests: ['wellness']
    },
    {
      id: 'g10',
      name: 'Indoor Herb Garden Kit',
      description: 'Everything needed to grow fresh herbs indoors, including seeds and pots.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      occasions: ['housewarming', 'birthday'],
      recipients: ['friend', 'coworker'],
      priceRange: 'budget',
      interests: ['cooking', 'home']
    }
  ]
  
  const updateForm = (field, value) => {
    setGiftFinderState(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  const nextStep = () => {
    const { step, occasion, recipient, priceRange } = giftFinderState
    
    if (step === 1 && !occasion) {
      toast.error("Please select an occasion")
      return
    }
    
    if (step === 2 && !recipient) {
      toast.error("Please select a recipient")
      return
    }
    
    if (step === 3 && !priceRange) {
      toast.error("Please select a price range")
      return
    }
    
    setGiftFinderState(prev => ({
      ...prev,
      step: prev.step + 1
    }))
  }
  
  const prevStep = () => {
    setGiftFinderState(prev => ({
      ...prev,
      step: prev.step - 1
    }))
  }
  
  const findGifts = () => {
    const { occasion, recipient, priceRange, interests } = giftFinderState
    
    if (!interests) {
      toast.error("Please select at least one interest")
      return
    }
    
    setGiftFinderState(prev => ({ ...prev, loading: true }))
    
    // Simulate API call delay
    setTimeout(() => {
      const interestsArray = interests.split(',')
      
      // Filter gifts based on criteria
      const filteredGifts = giftDatabase.filter(gift => {
        const matchesOccasion = gift.occasions.includes(occasion)
        const matchesRecipient = gift.recipients.includes(recipient)
        const matchesPriceRange = gift.priceRange === priceRange
        const matchesInterests = interestsArray.some(interest => 
          gift.interests.includes(interest)
        )
        
        return matchesOccasion && matchesRecipient && matchesPriceRange && matchesInterests
      })
      
      // If no exact matches, find related gifts
      let results = filteredGifts
      if (results.length === 0) {
        results = giftDatabase.filter(gift => {
          const matchesOccasion = gift.occasions.includes(occasion)
          const matchesRecipient = gift.recipients.includes(recipient)
          
          return matchesOccasion && matchesRecipient
        }).slice(0, 3)
      }
      
      setGiftResults(results)
      setGiftFinderState(prev => ({ 
        ...prev, 
        loading: false,
        step: prev.step + 1 
      }))
      
      if (results.length === 0) {
        toast.info("We couldn't find exact matches. Here are some alternatives.")
      } else {
        toast.success(`Found ${results.length} perfect gift${results.length === 1 ? '' : 's'} for you!`)
      }
    }, 1500)
  }
  
  const resetForm = () => {
    setGiftFinderState({
      occasion: '',
      recipient: '',
      priceRange: '',
      interests: '',
      step: 1,
      loading: false
    })
    setGiftResults([])
    setCopiedId(null)
  }
  
  const handleAddToCart = (gift) => {
    toast.success(`${gift.name} added to your cart!`, {
      icon: '🛍️',
    })
  }
  
  const handleAddToWishlist = (gift) => {
    toast.info(`${gift.name} added to your wishlist!`, {
      icon: '❤️',
    })
  }
  
  const copyGiftLink = (id) => {
    navigator.clipboard.writeText(`https://giftharbor.com/gifts/${id}`)
    setCopiedId(id)
    toast.info("Gift link copied to clipboard!")
    
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }
  
  return (
    <section className="py-12" id="gift-finder">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/5 dark:to-primary/5 rounded-2xl p-6 md:p-10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-secondary/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-surface-800 rounded-full shadow-soft mb-4">
                <GiftIcon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Perfect Gift Finder</h2>
              <p className="text-surface-600 dark:text-surface-400 max-w-xl mx-auto">
                Answer a few questions and we'll help you discover the ideal gift for your special someone.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {/* Progress steps */}
              <div className="flex items-center justify-between mb-8 px-4">
                {[1, 2, 3, 4, 5].map(step => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1
                        ${step < giftFinderState.step 
                          ? 'bg-primary text-white' 
                          : step === giftFinderState.step 
                            ? 'bg-white dark:bg-surface-800 text-primary border-2 border-primary' 
                            : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
                        }`}
                    >
                      {step < giftFinderState.step ? <CheckIcon className="w-4 h-4" /> : step}
                    </div>
                    <span className="text-xs hidden md:block text-surface-500 dark:text-surface-400">
                      {step === 1 && 'Occasion'}
                      {step === 2 && 'Recipient'}
                      {step === 3 && 'Budget'}
                      {step === 4 && 'Interests'}
                      {step === 5 && 'Results'}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Form steps */}
              <AnimatePresence mode="wait">
                {giftFinderState.step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="card"
                  >
                    <h3 className="text-xl font-semibold mb-4">What's the occasion?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {occasions.map(item => (
                        <button
                          key={item.id}
                          onClick={() => updateForm('occasion', item.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center text-center h-24 justify-center
                            ${giftFinderState.occasion === item.id
                              ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                              : 'border-surface-200 dark:border-surface-700 hover:border-primary/50 hover:bg-primary/5'
                            }`}
                        >
                          <span className="font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={nextStep}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <span>Continue</span>
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {giftFinderState.step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="card"
                  >
                    <h3 className="text-xl font-semibold mb-4">Who are you shopping for?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {recipients.map(item => (
                        <button
                          key={item.id}
                          onClick={() => updateForm('recipient', item.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center text-center h-24 justify-center
                            ${giftFinderState.recipient === item.id
                              ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                              : 'border-surface-200 dark:border-surface-700 hover:border-primary/50 hover:bg-primary/5'
                            }`}
                        >
                          <span className="font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={prevStep}
                        className="btn btn-outline"
                      >
                        Back
                      </button>
                      <button
                        onClick={nextStep}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <span>Continue</span>
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {giftFinderState.step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="card"
                  >
                    <h3 className="text-xl font-semibold mb-4">What's your budget?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {priceRanges.map(item => (
                        <button
                          key={item.id}
                          onClick={() => updateForm('priceRange', item.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center text-center h-20 justify-center
                            ${giftFinderState.priceRange === item.id
                              ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                              : 'border-surface-200 dark:border-surface-700 hover:border-primary/50 hover:bg-primary/5'
                            }`}
                        >
                          <span className="font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={prevStep}
                        className="btn btn-outline"
                      >
                        Back
                      </button>
                      <button
                        onClick={nextStep}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        <span>Continue</span>
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {giftFinderState.step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="card"
                  >
                    <h3 className="text-xl font-semibold mb-4">What are their interests?</h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-4 text-sm">
                      Select all that apply
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestCategories.map(item => {
                        const isSelected = giftFinderState.interests
                          .split(',')
                          .includes(item.id)
                          
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              const currentInterests = giftFinderState.interests
                                .split(',')
                                .filter(Boolean)
                                
                              let newInterests
                              if (isSelected) {
                                newInterests = currentInterests
                                  .filter(i => i !== item.id)
                                  .join(',')
                              } else {
                                newInterests = [...currentInterests, item.id].join(',')
                              }
                              
                              updateForm('interests', newInterests)
                            }}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center text-center h-20 justify-center
                              ${isSelected
                                ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                                : 'border-surface-200 dark:border-surface-700 hover:border-primary/50 hover:bg-primary/5'
                              }`}
                          >
                            <span className="font-medium">{item.name}</span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={prevStep}
                        className="btn btn-outline"
                      >
                        Back
                      </button>
                      <button
                        onClick={findGifts}
                        disabled={giftFinderState.loading}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        {giftFinderState.loading ? (
                          <>
                            <RefreshCcwIcon className="w-4 h-4 animate-spin" />
                            <span>Searching...</span>
                          </>
                        ) : (
                          <>
                            <SearchIcon className="w-4 h-4" />
                            <span>Find Gifts</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {giftFinderState.step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="card"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Perfect Gift Suggestions</h3>
                      <button
                        onClick={resetForm}
                        className="text-primary flex items-center gap-1 text-sm"
                      >
                        <RefreshCcwIcon className="w-4 h-4" />
                        <span>Start Over</span>
                      </button>
                    </div>
                    
                    {giftResults.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {giftResults.map((gift, index) => (
                          <motion.div
                            key={gift.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300 border border-surface-200 dark:border-surface-700"
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={gift.image} 
                                alt={gift.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <button
                                  onClick={() => handleAddToWishlist(gift)}
                                  className="p-1.5 rounded-full bg-white/90 hover:bg-white text-primary hover:text-primary-dark transition-colors"
                                  aria-label="Add to wishlist"
                                >
                                  <HeartIcon className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => copyGiftLink(gift.id)}
                                  className="p-1.5 rounded-full bg-white/90 hover:bg-white text-primary hover:text-primary-dark transition-colors"
                                  aria-label="Copy gift link"
                                >
                                  {copiedId === gift.id ? (
                                    <CheckIcon className="w-4 h-4" />
                                  ) : (
                                    <CopyIcon className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold mb-1">{gift.name}</h4>
                              <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">
                                {gift.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-primary">${gift.price.toFixed(2)}</span>
                                <button
                                  onClick={() => handleAddToCart(gift)}
                                  className="btn-primary py-1.5 px-3 text-sm flex items-center gap-1.5"
                                >
                                  <ShoppingBagIcon className="w-4 h-4" />
                                  <span>Add to Cart</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center p-3 bg-surface-100 dark:bg-surface-800 rounded-full mb-4">
                          <SearchIcon className="w-6 h-6 text-surface-400" />
                        </div>
                        <h4 className="text-lg font-medium mb-2">No exact matches found</h4>
                        <p className="text-surface-600 dark:text-surface-400 mb-6">
                          We couldn't find the perfect gift based on your specific criteria.
                          Try adjusting your selections.
                        </p>
                        <button
                          onClick={resetForm}
                          className="btn btn-primary"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeature