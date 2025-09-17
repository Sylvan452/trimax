# 🌐 Trimax Digital Marketing Agency Website

## 🔖 Project Title & Description
**Trimax** is a digital marketing agency website built with a modern stack.  
The platform serves as a professional online presence for the agency, showcasing services, portfolio, and blog content.  
It is designed to highlight brand authority, attract potential clients, and provide an SEO-optimized hub for thought leadership through blog posts.

The site will include the following pages:
- Home
- About Us
- Services
- Portfolio
- Blog (fetched from WordPress backend)
- Contact Us

---

## 🛠️ Tech Stack
**Frontend**
- [Next.js 14+ (App Router)](https://nextjs.org/) with TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- SEO enhancements via [`next-seo`](https://github.com/garmeeh/next-seo) and `next-sitemap`

**Backend**
- [WordPress](https://wordpress.org/) (Headless CMS)
- [WPGraphQL](https://www.wpgraphql.com/) for structured queries
- [JWT Authentication](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) for secure REST interactions

**Development Tools**
- [Trae](https://trae.ai/) for AI-assisted development
- [GitHub Actions](https://docs.github.com/en/actions) for CI/CD
- [Vercel](https://vercel.com/) for frontend deployment
- Managed WordPress host (e.g., Kinsta, WP Engine, Cloudways) for backend

---

## 🧠 AI Integration Strategy

**Code Generation**
- Use Trae IDE to scaffold Next.js routes, React components, and Tailwind layouts quickly.
- Generate GraphQL queries and TypeScript types directly from WordPress schema.

**Testing**
- Employ AI-assisted prompt engineering to generate unit tests (React Testing Library, Jest).
- Use integration tests for GraphQL queries and API routes, generated with AI-guided test cases.

**Documentation**
- Maintain inline comments and docstrings using AI auto-suggestions.
- Update `README.md` with AI-curated summaries after feature milestones.
- Use AI to generate developer onboarding docs and contribution guidelines.

**Context-Aware Techniques**
- Feed API schemas (WPGraphQL introspection JSON) into AI prompts for query generation.
- Provide AI with directory trees, diffs, and error logs for targeted debugging and refactoring.
- Leverage AI for structured commit messages and changelog entries.

---

## 🚀 Roadmap & Milestones
1. **Initialize Project**
   - Create Next.js App Router project with TypeScript.
   - Configure Tailwind CSS with brand colors:
     - Primary: `#2d46d6`
     - Accent: `#b31e37`

2. **Backend Setup**
   - Deploy WordPress instance.
   - Install WPGraphQL, ACF, and JWT plugins.
   - Configure blog posts API exposure.

3. **Frontend Development**
   - Build static pages (Home, About, Services, Portfolio, Contact).
   - Implement Blog listing and single post pages with ISR (Incremental Static Regeneration).
   - Add Contact form API route using Nodemailer or 3rd-party email provider.

4. **SEO & Performance**
   - Integrate `next-seo` and JSON-LD schemas.
   - Configure `next-sitemap` and `robots.txt`.
   - Optimize media with Next.js Image component.

5. **Deployment**
   - Deploy WordPress to managed host.
   - Deploy Next.js to Vercel with proper environment variables.
   - Set up GitHub Actions for lint, build, and test workflows.

6. **Post-Launch**
   - Monitor analytics via GA4 or Plausible.
   - Add error tracking with Sentry.
   - Iterate on UX and content strategy.

---

## 📂 Repository Structure
