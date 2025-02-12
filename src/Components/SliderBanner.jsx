import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const SliderBanner = ({ children, spaceBetween = 2, slidesPerView = 1, autoplayDelay = 5000 }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={{ clickable: true }}
      autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
      className="custom-swiper"
    >
      {React.Children.toArray(children).map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderBanner;
