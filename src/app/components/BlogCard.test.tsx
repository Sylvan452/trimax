import { render, screen } from '@testing-library/react'
import BlogCard, { FeaturedBlogCard, HorizontalBlogCard, MinimalBlogCard } from './BlogCard'

// Mock Next.js components
interface MockImageProps {
  src: string;
  alt: string;
  [key: string]: unknown;
}

interface MockLinkProps {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: MockImageProps) => (
    <div data-testid="mock-image" data-src={src} data-alt={alt} {...props} />
  ),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: MockLinkProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const mockBlogCardProps = {
  title: 'Test Blog Post Title',
  excerpt: 'This is a test excerpt for the blog post that should be displayed.',
  image: '/test-image.jpg',
  author: {
    name: 'John Doe',
    avatar: '/author-avatar.jpg',
  },
  publishedAt: '2024-01-15T10:00:00Z',
  readTime: '5 min read',
  category: 'Technology',
  tags: ['React', 'Next.js', 'Testing'],
  href: '/blog/test-post',
}

describe('BlogCard', () => {
  it('renders default variant with all props', () => {
    render(<BlogCard {...mockBlogCardProps} />)
    
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt for the blog post that should be displayed.')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText('#React')).toBeInTheDocument()
    expect(screen.getByText('#Next.js')).toBeInTheDocument()
    expect(screen.getByText('#Testing')).toBeInTheDocument()
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-post')
    
    const image = screen.getByAltText('Test Blog Post Title')
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    
    const authorAvatar = screen.getByAltText('John Doe')
    expect(authorAvatar).toHaveAttribute('src', '/author-avatar.jpg')
  })

  it('renders featured badge when featured prop is true', () => {
    render(<BlogCard {...mockBlogCardProps} featured={true} />)
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders without optional props', () => {
    const minimalProps = {
      title: 'Minimal Post',
      excerpt: 'Minimal excerpt',
      author: { name: 'Author' },
      publishedAt: '2024-01-15T10:00:00Z',
      href: '/blog/minimal',
    }
    
    render(<BlogCard {...minimalProps} />)
    
    expect(screen.getByText('Minimal Post')).toBeInTheDocument()
    expect(screen.getByText('Minimal excerpt')).toBeInTheDocument()
    expect(screen.getByText('Author')).toBeInTheDocument()
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    
    // Should not render optional elements
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
    expect(screen.queryByText('#')).not.toBeInTheDocument()
  })

  it('limits tags display to 3 and shows more indicator', () => {
    const propsWithManyTags = {
      ...mockBlogCardProps,
      tags: ['React', 'Next.js', 'Testing', 'TypeScript', 'Jest'],
    }
    
    render(<BlogCard {...propsWithManyTags} />)
    
    expect(screen.getByText('#React')).toBeInTheDocument()
    expect(screen.getByText('#Next.js')).toBeInTheDocument()
    expect(screen.getByText('#Testing')).toBeInTheDocument()
    expect(screen.getByText('+2 more')).toBeInTheDocument()
    expect(screen.queryByText('#TypeScript')).not.toBeInTheDocument()
    expect(screen.queryByText('#Jest')).not.toBeInTheDocument()
  })

  it('formats date correctly', () => {
    const propsWithDifferentDate = {
      ...mockBlogCardProps,
      publishedAt: '2023-12-25T15:30:00Z',
    }
    
    render(<BlogCard {...propsWithDifferentDate} />)
    
    expect(screen.getByText('December 25, 2023')).toBeInTheDocument()
  })
})

describe('BlogCard Horizontal Variant', () => {
  it('renders horizontal variant correctly', () => {
    render(<BlogCard {...mockBlogCardProps} variant="horizontal" />)
    
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt for the blog post that should be displayed.')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('January 15, 2024 • 5 min read')).toBeInTheDocument()
    
    // Should not show tags in horizontal variant
    expect(screen.queryByText('#React')).not.toBeInTheDocument()
  })

  it('renders horizontal variant without image', () => {
    const propsWithoutImage = {
      ...mockBlogCardProps,
      image: undefined,
    }
    
    render(<BlogCard {...propsWithoutImage} variant="horizontal" />)
    
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.queryByAltText('Test Blog Post Title')).not.toBeInTheDocument()
  })

  it('renders horizontal variant without author avatar', () => {
    const propsWithoutAvatar = {
      ...mockBlogCardProps,
      author: { name: 'John Doe' },
    }
    
    render(<BlogCard {...propsWithoutAvatar} variant="horizontal" />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument()
  })
})

describe('BlogCard Minimal Variant', () => {
  it('renders minimal variant correctly', () => {
    render(<BlogCard {...mockBlogCardProps} variant="minimal" />)
    
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    
    // Should not show excerpt, image, or tags in minimal variant
    expect(screen.queryByText('This is a test excerpt')).not.toBeInTheDocument()
    expect(screen.queryByAltText('Test Blog Post Title')).not.toBeInTheDocument()
    expect(screen.queryByText('#React')).not.toBeInTheDocument()
  })

  it('renders minimal variant without read time', () => {
    const propsWithoutReadTime = {
      ...mockBlogCardProps,
      readTime: undefined,
    }
    
    render(<BlogCard {...propsWithoutReadTime} variant="minimal" />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    expect(screen.queryByText('5 min read')).not.toBeInTheDocument()
  })

  it('renders minimal variant without category', () => {
    const propsWithoutCategory = {
      ...mockBlogCardProps,
      category: undefined,
    }
    
    render(<BlogCard {...propsWithoutCategory} variant="minimal" />)
    
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.queryByText('Technology')).not.toBeInTheDocument()
  })
})

describe('BlogCard Preset Components', () => {
  it('renders FeaturedBlogCard with featured prop set to true', () => {
    render(<FeaturedBlogCard {...mockBlogCardProps} />)
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders HorizontalBlogCard with horizontal variant', () => {
    render(<HorizontalBlogCard {...mockBlogCardProps} />)
    
    // Check for horizontal variant specific content
    expect(screen.getByText('January 15, 2024 • 5 min read')).toBeInTheDocument()
    expect(screen.queryByText('#React')).not.toBeInTheDocument()
  })

  it('renders MinimalBlogCard with minimal variant', () => {
    render(<MinimalBlogCard {...mockBlogCardProps} />)
    
    // Check for minimal variant specific content
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.queryByText('This is a test excerpt')).not.toBeInTheDocument()
  })
})

describe('BlogCard Accessibility', () => {
  it('has proper link structure for screen readers', () => {
    render(<BlogCard {...mockBlogCardProps} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-post')
    
    // The entire card should be clickable
    expect(link).toContainElement(screen.getByText('Test Blog Post Title'))
  })

  it('has proper alt text for images', () => {
    render(<BlogCard {...mockBlogCardProps} />)
    
    const postImage = screen.getByAltText('Test Blog Post Title')
    expect(postImage).toBeInTheDocument()
    
    const authorImage = screen.getByAltText('John Doe')
    expect(authorImage).toBeInTheDocument()
  })
})