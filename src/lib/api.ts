import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';

// WordPress GraphQL endpoint configuration
const WORDPRESS_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localhost/graphql';
const JWT_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_JWT_URL || 'http://localhost/wp-json/jwt-auth/v1/token';

// Create GraphQL client instance
const graphQLClient = new GraphQLClient(WORDPRESS_GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT token management
class TokenManager {
  private static readonly TOKEN_KEY = 'wp_jwt_token';
  private static readonly TOKEN_EXPIRY_KEY = 'wp_jwt_token_expiry';

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    
    if (!token || !expiry) return null;
    
    // Check if token is expired
    if (Date.now() > parseInt(expiry)) {
      this.clearToken();
      return null;
    }
    
    return token;
  }

  static setToken(token: string, expiresIn: number = 3600): void {
    if (typeof window === 'undefined') return;
    
    const expiryTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  static clearToken(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }
}

// Authentication functions
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    displayName: string;
  };
  error?: string;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch(JWT_AUTH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.token) {
      TokenManager.setToken(data.token);
      return {
        success: true,
        token: data.token,
        user: {
          id: data.user_id,
          username: data.user_login,
          email: data.user_email,
          displayName: data.user_display_name,
        },
      };
    } else {
      return {
        success: false,
        error: data.message || 'Login failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export async function logout(): Promise<void> {
  TokenManager.clearToken();
}

export function isAuthenticated(): boolean {
  return TokenManager.getToken() !== null;
}

// Main GraphQL function with authentication support
export async function graphQL<T = unknown>(
  query: RequestDocument,
  variables?: Variables,
  requireAuth: boolean = false
): Promise<T> {
  try {
    // Get authentication token if required or available
    const token = TokenManager.getToken();
    
    // If authentication is required but no token is available, throw error
    if (requireAuth && !token) {
      throw new Error('Authentication required. Please log in.');
    }

    // Set authorization header if token is available
    if (token) {
      graphQLClient.setHeader('Authorization', `Bearer ${token}`);
    } else {
      // Remove authorization header if no token
      graphQLClient.setHeader('Authorization', '');
    }

    // Execute GraphQL query
    const data = await graphQLClient.request<T>(query, variables);
    return data;
  } catch (error) {
    // Handle authentication errors
    if (error instanceof Error && error.message.includes('401')) {
      TokenManager.clearToken();
      throw new Error('Authentication expired. Please log in again.');
    }
    
    // Re-throw other errors
    throw error;
  }
}

// Convenience functions for common operations
export async function fetchPublicData<T = unknown>(
  query: RequestDocument,
  variables?: Variables
): Promise<T> {
  return graphQL<T>(query, variables, false);
}

export async function fetchPrivateData<T = unknown>(
  query: RequestDocument,
  variables?: Variables
): Promise<T> {
  return graphQL<T>(query, variables, true);
}

// WordPress REST API helper for non-GraphQL endpoints
export async function wordPressAPI<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/wp-json/wp/v2';
  const token = TokenManager.getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      TokenManager.clearToken();
      throw new Error('Authentication expired. Please log in again.');
    }
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Error handling utility
export class WordPressAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'WordPressAPIError';
  }
}

// Type definitions for common WordPress data structures
export interface WordPressPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  author: {
    node: {
      name: string;
      slug: string;
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface WordPressService {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  serviceFields: {
    serviceDescription: string;
    servicePrice: string;
    serviceDuration: string;
    serviceIcon?: {
      sourceUrl: string;
      altText: string;
    };
    serviceFeatures: Array<{
      featureName: string;
      featureDescription: string;
    }>;
  };
  serviceCategories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface WordPressPortfolio {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  portfolioFields: {
    portfolioClient: string;
    portfolioUrl: string;
    portfolioCategory: string;
    portfolioCompletionDate: string;
    portfolioTechnologies: string[];
    portfolioGallery: Array<{
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    }>;
    portfolioChallenges: Array<{
      challenge: string;
      solution: string;
    }>;
  };
  portfolioCategories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

// Export the client instance for advanced usage
export { graphQLClient };