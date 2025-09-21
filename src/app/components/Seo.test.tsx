import { generateSeoMetadata, JsonLd } from './Seo'
import { render } from '@testing-library/react'

describe('generateSeoMetadata', () => {
  it('generates default metadata when no props provided', () => {
    const metadata = generateSeoMetadata()
    
    expect(metadata.title).toBe('Trimax - Modern Digital Agency')
    expect(metadata.description).toBe('A modern digital agency providing innovative solutions for your business needs. We specialize in web development, design, and digital marketing.')
    expect(metadata.keywords).toBe('digital agency, web development, design, marketing, trimax')
    expect(metadata.authors).toEqual([{ name: 'Trimax Team' }])
    expect(metadata.creator).toBe('Trimax')
    expect(metadata.publisher).toBe('Trimax')
  })

  it('generates custom metadata with provided props', () => {
    const customProps = {
      title: 'Custom Page Title',
      description: 'Custom page description',
      keywords: ['custom', 'keywords', 'test'],
      image: '/custom-image.jpg',
      url: 'https://trimax.com/custom-page',
      author: 'John Doe',
    }
    
    const metadata = generateSeoMetadata(customProps)
    
    expect(metadata.title).toBe('Custom Page Title | Trimax')
    expect(metadata.description).toBe('Custom page description')
    expect(metadata.keywords).toBe('custom, keywords, test')
    expect(metadata.authors).toEqual([{ name: 'John Doe' }])
  })

  it('does not duplicate site name in title when already included', () => {
    const metadata = generateSeoMetadata({ title: 'Page Title | Trimax' })
    
    expect(metadata.title).toBe('Page Title | Trimax')
  })

  it('generates proper OpenGraph metadata', () => {
    const props = {
      title: 'Test Article',
      description: 'Test description',
      image: '/test-image.jpg',
      url: 'https://trimax.com/test',
      type: 'article' as const,
      publishedTime: '2024-01-15T10:00:00Z',
      modifiedTime: '2024-01-16T10:00:00Z',
      author: 'Test Author',
    }
    
    const metadata = generateSeoMetadata(props)
    
    expect(metadata.openGraph).toEqual({
      type: 'article',
      locale: 'en_US',
      url: 'https://trimax.com/test',
      title: 'Test Article | Trimax',
      description: 'Test description',
      siteName: 'Trimax',
      images: [
        {
          url: '/test-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Test Article',
        },
      ],
      publishedTime: '2024-01-15T10:00:00Z',
      modifiedTime: '2024-01-16T10:00:00Z',
      authors: ['Test Author'],
    })
  })

  it('generates proper Twitter metadata', () => {
    const props = {
      title: 'Twitter Test',
      description: 'Twitter description',
      image: '/twitter-image.jpg',
    }
    
    const metadata = generateSeoMetadata(props)
    
    expect(metadata.twitter).toEqual({
      card: 'summary_large_image',
      title: 'Twitter Test | Trimax',
      description: 'Twitter description',
      images: ['/twitter-image.jpg'],
      creator: '@trimax',
      site: '@trimax',
    })
  })

  it('sets proper robots configuration', () => {
    const metadata = generateSeoMetadata()
    
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    })
  })

  it('includes verification codes', () => {
    const metadata = generateSeoMetadata()
    
    expect(metadata.verification).toEqual({
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    })
  })

  it('sets canonical URL', () => {
    const metadata = generateSeoMetadata({ url: 'https://trimax.com/test-page' })
    
    expect(metadata.alternates).toEqual({
      canonical: 'https://trimax.com/test-page',
    })
  })

  it('handles product type correctly', () => {
    const metadata = generateSeoMetadata({ type: 'product' })
    
    expect(metadata.openGraph?.type).toBe('website')
  })

  it('handles website type correctly', () => {
    const metadata = generateSeoMetadata({ type: 'website' })
    
    expect(metadata.openGraph?.type).toBe('website')
  })

  it('includes article-specific metadata for article type', () => {
    const props = {
      type: 'article' as const,
      publishedTime: '2024-01-15T10:00:00Z',
      modifiedTime: '2024-01-16T10:00:00Z',
      author: 'Article Author',
    }
    
    const metadata = generateSeoMetadata(props)
    
    expect(metadata.openGraph).toMatchObject({
      type: 'article',
      publishedTime: '2024-01-15T10:00:00Z',
      modifiedTime: '2024-01-16T10:00:00Z',
      authors: ['Article Author'],
    })
  })
})

describe('JsonLd', () => {
  it('renders default Organization schema', () => {
    const { container } = render(<JsonLd />)
    
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    
    const jsonData = JSON.parse(script?.textContent || '{}')
    expect(jsonData['@context']).toBe('https://schema.org')
    expect(jsonData['@type']).toBe('Organization')
    expect(jsonData.name).toBe('Trimax')
    expect(jsonData.url).toBe('https://trimax.com')
  })

  it('renders WebSite schema when type is WebSite', () => {
    const { container } = render(<JsonLd type="WebSite" />)
    
    const script = container.querySelector('script[type="application/ld+json"]')
    const jsonData = JSON.parse(script?.textContent || '{}')
    
    expect(jsonData['@type']).toBe('WebSite')
    expect(jsonData.name).toBe('Trimax')
    expect(jsonData.url).toBe('https://trimax.com')
  })

  it('renders Article schema when type is Article', () => {
    const { container } = render(<JsonLd type="Article" />)
    
    const script = container.querySelector('script[type="application/ld+json"]')
    const jsonData = JSON.parse(script?.textContent || '{}')
    
    expect(jsonData['@type']).toBe('Article')
    expect(jsonData.publisher).toEqual({
      '@type': 'Organization',
      name: 'Trimax',
      url: 'https://trimax.com',
    })
  })

  it('renders Product schema when type is Product', () => {
    const { container } = render(<JsonLd type="Product" />)
    
    const script = container.querySelector('script[type="application/ld+json"]')
    const jsonData = JSON.parse(script?.textContent || '{}')
    
    expect(jsonData['@type']).toBe('Product')
    expect(jsonData.brand).toEqual({
      '@type': 'Brand',
      name: 'Trimax',
    })
  })

  it('merges custom data with default data', () => {
    const customData = {
      customField: 'custom value',
      name: 'Custom Name', // Should override default
    }
    
    const { container } = render(<JsonLd data={customData} />)
    
    const script = container.querySelector('script[type="application/ld+json"]')
    const jsonData = JSON.parse(script?.textContent || '{}')
    
    expect(jsonData.customField).toBe('custom value')
    expect(jsonData.name).toBe('Custom Name')
    expect(jsonData['@context']).toBe('https://schema.org') // Should keep default
  })

  it('renders valid JSON-LD format', () => {
    const { container } = render(<JsonLd />)
    
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toHaveAttribute('type', 'application/ld+json')
    
    // Should be valid JSON
    expect(() => JSON.parse(script?.textContent || '{}')).not.toThrow()
  })
})