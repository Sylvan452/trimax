import Link from "next/link";
import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  iconColor?: "trimax" | "accent" | "primary";
  features?: string[];
  price?: {
    amount: string;
    period?: string;
    currency?: string;
  };
  href?: string;
  buttonText?: string;
  featured?: boolean;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  iconColor = "trimax",
  features = [],
  price,
  href,
  buttonText = "Learn More",
  featured = false,
  className = "",
}: ServiceCardProps) {
  const iconColorClasses = {
    trimax: "bg-trimax text-trimax-foreground",
    accent: "bg-accent text-accent-foreground",
    primary: "bg-primary text-primary-foreground",
  };

  const cardContent = (
    <div
      className={`
        relative p-6 rounded-xl border transition-all duration-300 hover:shadow-lg group
        ${featured 
          ? "bg-trimax text-trimax-foreground border-trimax shadow-lg scale-105" 
          : "bg-card border-border hover:border-trimax/50"
        }
        ${className}
      `}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Most Popular
          </span>
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
          featured ? "bg-trimax-foreground/10" : iconColorClasses[iconColor]
        }`}>
          {icon}
        </div>
      )}

      {/* Price */}
      {price && (
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">
              {price.currency || "$"}{price.amount}
            </span>
            {price.period && (
              <span className={`ml-1 text-sm ${featured ? "text-trimax-foreground/70" : "text-muted-foreground"}`}>
                /{price.period}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className={`text-xl font-semibold mb-3 ${featured ? "text-trimax-foreground" : "text-foreground"}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`mb-6 leading-relaxed ${featured ? "text-trimax-foreground/80" : "text-muted-foreground"}`}>
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                  featured ? "text-trimax-foreground" : "text-trimax"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={`text-sm ${featured ? "text-trimax-foreground/90" : "text-foreground"}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Button */}
      <div className="mt-auto">
        {href ? (
          <Link
            href={href}
            className={`
              inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${featured 
                ? "bg-trimax-foreground text-trimax hover:bg-trimax-foreground/90" 
                : "bg-trimax text-trimax-foreground hover:bg-trimax/90"
              }
            `}
          >
            {buttonText}
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <button
            className={`
              inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${featured 
                ? "bg-trimax-foreground text-trimax hover:bg-trimax-foreground/90" 
                : "bg-trimax text-trimax-foreground hover:bg-trimax/90"
              }
            `}
          >
            {buttonText}
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );

  return cardContent;
}

// Preset service card variants
export function PricingCard(props: ServiceCardProps) {
  return <ServiceCard {...props} />;
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  href 
}: { 
  title: string; 
  description: string; 
  icon?: ReactNode; 
  href?: string;
}) {
  return (
    <ServiceCard
      title={title}
      description={description}
      icon={icon}
      href={href}
      buttonText="Explore"
    />
  );
}