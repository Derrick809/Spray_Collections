import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';

const HeroCarousel = () => (
  <section className="relative overflow-hidden bg-slate-950">
    <Carousel fade interval={4200} controls indicators className="landing-carousel">
      {products.map((item) => (
        <Carousel.Item key={item.id} className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">
          <div className="absolute inset-0 bg-black/40" />
          <img 
            className="w-full h-full object-cover" 
            src={item.image} 
            alt={item.name} 
          />
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
            <div className="relative z-10 max-w-2xl sm:max-w-3xl text-center text-white">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber-300 mb-2 sm:mb-4 block">{item.category}</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight leading-tight mb-4 sm:mb-6">{item.name}</h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-2xl mx-auto mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-3">{item.description}</p>
              <Link to="/menu" className="inline-flex items-center justify-center bg-amber-300 text-slate-950 px-6 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase rounded-sm shadow-lg hover:bg-white transition">
                Discover Collection
              </Link>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </section>
);

export default HeroCarousel;
