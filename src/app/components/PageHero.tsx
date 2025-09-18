import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  overlay?: boolean;
  children?: ReactNode;
  size?: "small" | "medium" | "large";
  alignment?: "left" | "center" | "right";
}

export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  overlay = true,
  children,
  size = "medium",
  alignment = "center",
}: PageHeroProps) {
  const sizeClasses = {
    small: "py-16 md:py-20",
    medium: "py-20 md:py-28",
    large: "py-28 md:py-36",
  };

  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <section
      className={`relative ${sizeClasses[size]} ${
        backgroundImage ? "bg-cover bg-center bg-no-repeat" : "bg-gradient-to-br from-background to-muted"
      }`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl ${alignment === "center" ? "mx-auto" : ""} ${alignmentClasses[alignment]}`}>
          {/* Subtitle */}
          {subtitle && (
            <p className="text-trimax font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
              {subtitle}
            </p>
          )}

          {/* Title */}
          <h1 className="hide-page-title text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}

          {/* Custom Content */}
          {children && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-trimax/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

// Preset hero variants for common use cases
export function SimpleHero({ title, description }: { title: string; description?: string }) {
  return (
    <PageHero
      title={title}
      description={description}
      size="small"
      alignment="center"
    />
  );
}

export function FeatureHero({ 
  title, 
  subtitle, 
  description, 
  children 
}: { 
  title: string; 
  subtitle?: string; 
  description?: string; 
  children?: ReactNode;
}) {
  return (
    <PageHero
      title={title}
      subtitle={subtitle}
      description={description}
      size="large"
      alignment="center"
    >
      {children}
    </PageHero>
  );
}