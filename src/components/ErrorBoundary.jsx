import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
          <p className="mb-4 text-surface-700 dark:text-surface-300">The component couldn't be displayed due to an error.</p>
          <button onClick={this.resetError} className="btn-primary">Try again</button>
        </div>
      );
    }

    return this.props.children; 
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
};

export default ErrorBoundary;