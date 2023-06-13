"use client";
import React, { useEffect, useState } from "react";

interface CarouselItem {
  imageUrl: string;
  title: string;
  description: string;
}

interface VerticalCarouselProps {
  items: CarouselItem[];
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000); // Change the duration to adjust the slide interval

    return () => {
      clearInterval(interval);
    };
  }, [items]);

  return (
    <div className="relative overflow-hidden h-96">
      <div
        className="absolute top-0 left-0 w-full h-full transition duration-500"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-10 bg-red-400 "
          >
            <h1 className="text-4xl font-bold">{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
