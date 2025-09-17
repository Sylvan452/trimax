import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Documentation", href: "#" },
      { name: "Support", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
    social: [
      { name: "Twitter", href: "#" },
      { name: "LinkedIn", href: "#" },
      { name: "GitHub", href: "#" },
      { name: "Instagram", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-trimax rounded-lg flex items-center justify-center">
                <span className="text-trimax-foreground font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-foreground">Trimax</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              A modern digital agency providing innovative solutions for your business needs. 
              We specialize in web development, design, and digital marketing.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label={item.name}
                >
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-trimax hover:text-trimax-foreground transition-colors">
                    <span className="text-sm font-medium">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Trimax. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}