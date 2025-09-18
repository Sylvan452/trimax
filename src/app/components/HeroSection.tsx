'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on component mount
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-110"
        style={{
          backgroundImage: 'url(/trimax_hero.jpg)',
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16 lg:px-16 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Headline with Fade-in Animation */}
            <h1 
              className={`text-4xl md:text-5xl xl:text-6xl font-bold leading-tight transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ color: '#2d46d6' }}
            >
              Transform Your Digital Presence with{' '}
              <span className="text-white">Trimax Media</span>
            </h1>
            
            {/* Subtitle with Delayed Fade-in */}
            <p 
              className={`text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl transition-all duration-1000 ease-out delay-300 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              We create stunning websites, powerful web applications, and comprehensive digital solutions that drive results for modern businesses.
            </p>
            
            {/* CTA Buttons with Delayed Fade-in */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Primary CTA Button */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                style={{ backgroundColor: '#2d46d6' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(45, 70, 214, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                Start Your Project
                <svg 
                  className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              {/* Secondary CTA Button */}
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50"
                style={{ 
                  borderColor: '#b31e37',
                  color: '#b31e37'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b31e37';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(179, 30, 55, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#b31e37';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                View Our Work
                <svg 
                  className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div 
              className={`flex flex-wrap items-center gap-6 pt-4 transition-all duration-1000 ease-out delay-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">5.0 Rating</span>
              </div>
              <div className="text-gray-300 text-sm">
                <span className="font-semibold">150+</span> Projects Completed
              </div>
              <div className="text-gray-300 text-sm">
                <span className="font-semibold">98%</span> Client Satisfaction
              </div>
            </div>
          </div>
          
          {/* Right Side - Hero Image */}
          <div className="relative flex items-start justify-center">
            <div 
              className={`relative rounded-2xl overflow-hidden transition-all duration-1000 ease-out delay-300 ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <img 
                src="/obah_dev.jpg" 
                alt="Trimax Media Development Team" 
                className="w-full h-auto object-cover rounded-2xl shadow-2xl max-h-[500px]"
              />
              
              {/* Floating Elements for Visual Interest */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/40 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/40 rounded-full animate-pulse delay-1000" />
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-pink-500/40 rounded-full animate-pulse delay-500" />
            </div>
            
            {/* Background Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl -z-10 blur-xl" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out delay-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}