"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  href?: string;
  client?: string;
  year?: string;
  featured?: boolean;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  categories?: string[];
  showFilter?: boolean;
  columns?: 2 | 3 | 4;
  showLoadMore?: boolean;
  initialItemsCount?: number;
}

export default function PortfolioGrid({
  items,
  categories = [],
  showFilter = true,
  columns = 3,
  showLoadMore = false,
  initialItemsCount = 6,
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(initialItemsCount);

  // Extract categories from items if not provided
  const allCategories = categories.length > 0 
    ? categories 
    : ["All", ...Array.from(new Set(items.map(item => item.category)))];

  // Filter items based on active category
  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  // Get visible items for load more functionality
  const displayedItems = showLoadMore 
    ? filteredItems.slice(0, visibleItems)
    : filteredItems;

  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + initialItemsCount);
  };

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      {showFilter && allCategories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleItems(initialItemsCount);
              }}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${activeCategory === category
                  ? "bg-trimax text-trimax-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-trimax/10 hover:text-trimax"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Portfolio Grid */}
      <div className={`grid ${gridClasses[columns]} gap-6 mb-8`}>
        {displayedItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && visibleItems < filteredItems.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-trimax text-trimax-foreground px-6 py-3 rounded-lg hover:bg-trimax/90 transition-colors duration-200 font-medium"
          >
            Load More Projects
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

// Individual Portfolio Card Component
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const cardContent = (
    <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300">
      {/* Featured Badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-trimax text-trimax-foreground p-3 rounded-full">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Year */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-trimax text-sm font-medium">
            {item.category}
          </span>
          {item.year && (
            <span className="text-muted-foreground text-sm">
              {item.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-trimax transition-colors duration-200">
          {item.title}
        </h3>

        {/* Client */}
        {item.client && (
          <p className="text-muted-foreground text-sm mb-2">
            Client: {item.client}
          </p>
        )}

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-muted-foreground text-xs px-2 py-1">
                +{item.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}