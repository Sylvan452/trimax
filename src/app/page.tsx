import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Trimax</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                Trimax
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              A modern Next.js application built with TypeScript, Tailwind CSS v4, and the App Router.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Fast & Modern</h3>
              <p className="text-muted-foreground">Built with Next.js 15 and React 19 for optimal performance.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Type Safe</h3>
              <p className="text-muted-foreground">Full TypeScript support for better development experience.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Beautiful UI</h3>
              <p className="text-muted-foreground">Styled with Tailwind CSS v4 and custom design tokens.</p>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-muted rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Get Started</h3>
            <p className="text-muted-foreground mb-6">
              Edit{" "}
              <code className="bg-background border border-border px-2 py-1 rounded font-mono text-sm">
                src/app/page.tsx
              </code>{" "}
              to start building your application.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
            <a
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/next.svg"
                alt="Next.js logo"
                width={20}
                height={20}
              />
              Next.js Docs
            </a>
            <a
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
              href="https://tailwindcss.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
              </svg>
              Tailwind Docs
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6 items-center justify-center flex-wrap">
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
