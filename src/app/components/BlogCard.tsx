import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  href: string;
  featured?: boolean;
  variant?: "default" | "horizontal" | "minimal";
}

export default function BlogCard({
  title,
  excerpt,
  image,
  author,
  publishedAt,
  readTime,
  category,
  tags = [],
  href,
  featured = false,
  variant = "default",
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (variant === "horizontal") {
    return (
      <Link href={href} className="block group">
        <article className="flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-trimax/50">
          {/* Image */}
          {image && (
            <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Category */}
            {category && (
              <span className="text-trimax text-sm font-medium">
                {category}
              </span>
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-trimax transition-colors duration-200 line-clamp-2">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {author.avatar && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-sm">
                  <p className="text-foreground font-medium">{author.name}</p>
                  <p className="text-muted-foreground">
                    {formatDate(publishedAt)}
                    {readTime && ` • ${readTime}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "minimal") {
    return (
      <Link href={href} className="block group">
        <article className="py-4 border-b border-border last:border-b-0">
          {/* Category */}
          {category && (
            <span className="text-trimax text-sm font-medium">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-trimax transition-colors duration-200">
            {title}
          </h3>

          {/* Meta */}
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{author.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(publishedAt)}</span>
            {readTime && (
              <>
                <span className="mx-2">•</span>
                <span>{readTime}</span>
              </>
            )}
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={href} className="block group">
      <article className={`
        bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-trimax/50
        ${featured ? "ring-2 ring-trimax/20" : ""}
      `}>
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Image */}
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          {category && (
            <span className="text-trimax text-sm font-medium">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-trimax transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-muted-foreground text-xs px-2 py-1">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {author.avatar && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-sm">
                <p className="text-foreground font-medium">{author.name}</p>
                <p className="text-muted-foreground">
                  {formatDate(publishedAt)}
                </p>
              </div>
            </div>

            {readTime && (
              <span className="text-muted-foreground text-sm">
                {readTime}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

// Preset blog card variants
export function FeaturedBlogCard(props: Omit<BlogCardProps, "featured">) {
  return <BlogCard {...props} featured={true} />;
}

export function HorizontalBlogCard(props: Omit<BlogCardProps, "variant">) {
  return <BlogCard {...props} variant="horizontal" />;
}

export function MinimalBlogCard(props: Omit<BlogCardProps, "variant">) {
  return <BlogCard {...props} variant="minimal" />;
}