import React, { useState, useEffect } from "react";

const SliderBanner = ({ children, autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // State to track hover pause
  const totalSlides = React.Children.count(children);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isPaused) return; // Stop autoplay when hovered
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [autoPlay, interval, totalSlides, isPaused]);

  return (
    <div
      className="slider-banner h-[71%] md:h-[75%] h-min-full" 
      onMouseEnter={() => setIsPaused(true)}  // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      {/* Left Button */}
      <button className="nav-button left text-black hover:text-gray-500  dark:text-gray-400" onClick={handlePrev}>❮</button>

      {/* Slide Content */}
      <div className="slider-content">
        <div
          className="slides-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="slide">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <button className="nav-button right text-black hover:text-gray-500  dark:text-gray-400" onClick={handleNext}>❯</button>

      {/* Slide Indicators */}
      <div className="indicators">
        {React.Children.map(children, (_, index) => (
          <span
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderBanner;
