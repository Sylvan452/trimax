import { gql } from 'graphql-request';

// Query to get all blog posts for the blog page
export const GET_ALL_POSTS = gql`
  query GetAllPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            slug
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
    }
    }
  }
`;

// Query to get a single post by slug
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          name
          slug
          description
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
          description
        }
      }
      tags {
        nodes {
          name
          slug
          description
        }
      }

    }
  }
`;

// Query to get recent posts for sidebar or related posts
export const GET_RECENT_POSTS = gql`
  query GetRecentPosts($first: Int = 5) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Query to get posts by category
export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($categorySlug: String!, $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { 
        status: PUBLISH
        categoryName: $categorySlug
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            slug
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

// Query to get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`;

// Query to get all post slugs for static generation
export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    posts(first: 1000, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;