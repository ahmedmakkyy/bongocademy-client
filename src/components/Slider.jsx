import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
const Slider = () => {
  useEffect(() => {
    Aos.init();
}, [])
  const quotes = [
    "Sports is the ultimate teacher.",
    "Success is where preparation and opportunity meet.",
    "The difference between the impossible and the possible lies in determination.",
    "Don't watch the clock; do what it does. Keep going."
  ];

  return (
    <div className="" data-aos="zoom-in">
      <div className="carousel w-full" style={{ height: '600px' }}>
        <div id="item1" className="carousel-item w-full relative">
          <img src="./slide-1.jpg" className="w-full" alt="Slide 1" />
          <div className="quote-overlay">
            <div className="quote">{quotes[0]}</div>
          </div>
        </div>
        <div id="item2" className="carousel-item w-full relative">
          <img src="./slide-2.jpg" className="w-full" alt="Slide 2" />
          <div className="quote-overlay">
            <div className="quote">{quotes[1]}</div>
          </div>
        </div>
        <div id="item3" className="carousel-item w-full relative">
          <img src="./slide-3.jpg" className="w-full" alt="Slide 3" />
          <div className="quote-overlay">
            <div className="quote">{quotes[2]}</div>
          </div>
        </div>
        <div id="item4" className="carousel-item w-full relative">
          <img src="./slide-4.jpg" className="w-full" alt="Slide 4" />
          <div className="quote-overlay">
            <div className="quote">{quotes[3]}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
        <a href="#item4" className="btn btn-xs">4</a>
      </div>
    </div>
  );
};

export default Slider;
