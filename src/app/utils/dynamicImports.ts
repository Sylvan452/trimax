import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

// Dynamic imports with loading states for better performance
export const DynamicHeroSection = dynamic(
  () => import('../components/HeroSection'),
  {
    loading: () => 
      React.createElement('div', { className: "min-h-screen flex items-center justify-center" },
        React.createElement('div', { className: "animate-pulse" },
          React.createElement('div', { className: "h-8 bg-gray-300 rounded w-48 mb-4" }),
          React.createElement('div', { className: "h-4 bg-gray-300 rounded w-64" })
        )
      ),
    ssr: true,
  }
);



// Utility function for creating dynamic components with consistent loading states
export function createDynamicComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    loadingComponent?: () => React.ReactElement;
    ssr?: boolean;
    minHeight?: string;
  } = {}
) {
  const { loadingComponent, ssr = false, minHeight = '200px' } = options;

  return dynamic(importFn, {
    loading: loadingComponent || (() => 
      React.createElement('div', { 
        className: 'flex items-center justify-center', 
        style: { minHeight } 
      },
        React.createElement('div', { className: 'animate-pulse' },
          React.createElement('div', { className: 'h-4 bg-gray-300 rounded w-32' })
        )
      )
    ),
    ssr,
  });
}