// animations.js
// This file contains the scroll animation logic

// Function to handle fade-in animations on scroll
export function initScrollAnimations() {
  // If we're in the browser environment
  if (typeof window !== 'undefined') {
    // Get all elements with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Function to check if an element is in viewport
    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };
    
    // Function to handle scroll and add the appear class
    const handleScroll = () => {
      fadeElements.forEach(el => {
        if (isInViewport(el)) {
          el.classList.add('appear');
        }
      });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Run once on load to check for elements already in viewport
    handleScroll();
    
    // Return a cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
  
  // Return a no-op function if not in browser
  return () => {};
} 