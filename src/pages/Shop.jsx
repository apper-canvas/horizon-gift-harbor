import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { products } from "../data/products";
import getIcon from "../utils/iconUtils";
import axios from "axios";
import dayjs from "dayjs";

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    occasion: "",
    searchQuery: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("grid"); // 'grid' or 'list'

  const GridIcon = getIcon("Grid");
  const ListIcon = getIcon("List");
  const SearchIcon = getIcon("Search");

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let results = [...products];

    // Category filter
    if (filters.category) {
      results = results.filter(
        (product) => product.category === filters.category
      );
    }

    // Price range filter
    results = results.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Occasion filter
    if (filters.occasion) {
      results = results.filter((product) =>
        product.occasions.includes(filters.occasion)
      );
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(results);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };

  //sample api call
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log("response from fetchProducts", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const now = dayjs();

  return (
    <div className="min-h-screen">
      {`Date: ${now.format("DD/MM/YYYY")}`}
      {/* Shop Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white rounded-xl mb-8 p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Gift Shop</h1>
        <p className="text-lg opacity-90 max-w-2xl">
          Discover unique gifts for every occasion. From handcrafted treasures
          to personalized presents that show how much you care.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {/* Search and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search gifts..."
                className="input pl-10 pr-4 py-2 w-full sm:w-64"
                value={filters.searchQuery}
                onChange={(e) =>
                  handleFilterChange({ searchQuery: e.target.value })
                }
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
            </form>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-surface-500">View:</span>
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 rounded ${
                  view === "grid" ? "bg-surface-200 dark:bg-surface-700" : ""
                }`}
              >
                <GridIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded ${
                  view === "list" ? "bg-surface-200 dark:bg-surface-700" : ""
                }`}
              >
                <ListIcon className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={`grid ${
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}
          >
            {isLoading ? (
              // Skeleton loading state
              Array(6)
                .fill()
                .map((_, index) => (
                  <div key={index} className="card animate-pulse">
                    <div className="bg-surface-200 dark:bg-surface-700 h-48 mb-4 rounded-lg"></div>
                    <div className="bg-surface-200 dark:bg-surface-700 h-4 w-3/4 mb-2 rounded"></div>
                    <div className="bg-surface-200 dark:bg-surface-700 h-4 w-1/2 mb-4 rounded"></div>
                    <div className="bg-surface-200 dark:bg-surface-700 h-8 w-1/3 rounded"></div>
                  </div>
                ))
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-3xl mb-2">😕</div>
                <h3 className="text-xl font-medium mb-1">No products found</h3>
                <p className="text-surface-500 dark:text-surface-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} view={view} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
