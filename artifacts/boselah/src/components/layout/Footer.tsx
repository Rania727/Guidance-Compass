import { Compass, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/lib/LanguageContext";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Compass className="w-8 h-8 text-primary" />
              <span className="font-display font-bold text-3xl">بوصلة</span>
            </Link>
            <p className="text-secondary-foreground/70 max-w-sm text-base leading-relaxed">
              {f.desc}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-4 text-white">{f.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  {f.home}
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-secondary-foreground/70 hover:text-primary transition-colors">
                  {f.startAssessment}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-4 text-white">{f.contact}</h4>
            <p className="text-secondary-foreground/60 text-sm mb-4">{f.contactDesc}</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${f.email}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium" dir="ltr">{f.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${f.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium" dir="ltr">{f.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center text-secondary-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} منصة بوصلة. {f.rights}</p>
        </div>
      </div>
    </footer>
  );
}
