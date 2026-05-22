import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Compass, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/tawjihi", label: t.nav.tawjihiGuide, special: true },
    { href: "/assessment", label: t.nav.startAssessment },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">بوصلة</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-bold transition-colors hover:text-primary relative py-2",
                      (link as { special?: boolean }).special
                        ? location === link.href
                          ? "text-amber-600"
                          : "text-amber-600/80 hover:text-amber-600"
                        : location === link.href
                          ? "text-primary"
                          : "text-muted-foreground"
                    )}
                  >
                    {(link as { special?: boolean }).special && (
                      <span className="me-1">🇯🇴</span>
                    )}
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={cn("absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                          (link as { special?: boolean }).special ? "bg-amber-500" : "bg-primary"
                        )}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-sm font-bold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
              title="Switch language"
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>
          </nav>

          {/* Mobile: lang toggle + menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-3 py-1.5 rounded-lg border border-border/60 text-sm font-bold text-muted-foreground hover:border-primary/40"
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl font-bold text-lg",
                    location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
