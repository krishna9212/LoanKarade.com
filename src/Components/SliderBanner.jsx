import React, { useState, useEffect, useRef } from "react";

const SliderBanner = ({ children, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = React.Children.count(children);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Go to a specific slide
  const goToSlide = (index) => setCurrentIndex(index);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [autoPlay, interval, totalSlides, isPaused]);

  // Handle touch swipe for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (swipeDistance > 50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    } else if (swipeDistance < -50) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
    }
  };

  return (
    <div
      className="slider-banner h-min-[71%] md:h-[65%] h-min-full"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Content */}
      <div className="slider-content">
        <div
          className="slides-wrapper transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="slide"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="indicators bg-gray-50 opacity-50 p-1 items-center rounded-full">
        {React.Children.map(children, (_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderBanner;
