import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Données                                                            */
/* ------------------------------------------------------------------ */

const EMAIL = "humancarelink25@gmail.com";

const footerLinks = {
  navigation: [
    { label: "Accueil", href: "#accueil" },
    { label: "À propos", href: "#apropos" },
    { label: "Nos services", href: "#services" },
    { label: "Nos projets", href: "#projets" },
    { label: "Notre réseau", href: "#reseau" },
  ],
  services: [
    { label: "Assistance administrative", href: "#services" },
    { label: "Formation et emploi", href: "#services" },
    { label: "Regroupement familial", href: "#services" },
    { label: "Orientation santé", href: "#services" },
  ],
};

// TODO : ajouter LinkedIn dès que la page officielle existe, par exemple :
// { label: "LinkedIn", href: "https://www.linkedin.com/company/...", icon: FaLinkedin }
const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61575423359089",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/humancare_link/",
    icon: FaInstagram,
  },
];

/* ------------------------------------------------------------------ */
/*  Hook : déclenche l'animation une seule fois                        */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/*  Styles réutilisés                                                  */
/* ------------------------------------------------------------------ */

// Lien avec soulignement qui se dessine au survol
const linkClass =
  "inline-block bg-[linear-gradient(#f93137,#f93137)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-white/70 transition-[background-size,color] duration-300 hover:bg-[length:100%_1px] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137] motion-reduce:transition-none";

const headingClass = "mb-5 text-sm font-semibold text-white/45";

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const [footerRef, inView] = useInView();
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="bg-[#241d1d] text-white">
      {/* Bande « par avion », la même que sur le formulaire de contact.
          Elle se dessine une seule fois, de gauche à droite. */}
      <div
        aria-hidden="true"
        className={`h-2.5 w-full origin-left transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          inView ? "scale-x-100" : "scale-x-0"
        }`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f93137 0 14px, #241d1d 14px 24px, #ffffff 24px 38px, #241d1d 38px 48px)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* ------------------------ Contenu principal ------------------------ */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Marque */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a
              href="#accueil"
              aria-label="HUMANCARE LINK - Accueil"
              className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137]"
            >
              <img
                src="/logo.png"
                alt=""
                className="h-12 w-auto object-contain"
              />
              <span className="text-lg font-extrabold tracking-tight">
                HUMANCARE LINK
              </span>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Une approche humaine de l'information, de l'orientation et de
              l'accompagnement, avec une ouverture sur les échanges entre le
              Maroc et l'Europe.
            </p>

            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition duration-300 hover:border-[#f93137] hover:bg-[#f93137] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137] motion-reduce:transition-none"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation du pied de page" className="lg:col-span-2">
            <h3 className={headingClass}>Navigation</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.navigation.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>Nos services</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.services.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className={headingClass}>Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-[#f93137]"
                  aria-hidden="true"
                />
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                  {EMAIL}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-[#f93137]"
                  aria-hidden="true"
                />
                <span className="text-white/70">
                  Casablanca, Maroc
                  <br />
                  <span className="text-white/45">Ouvert sur l'Europe</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* --------------------------- Barre du bas -------------------------- */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-white/45">
            © {currentYear} HUMANCARE LINK. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
            {/* TODO : créer ces deux pages (ou ancres) avant la mise en ligne */}
            <a href="#mentions-legales" className={linkClass}>
              Mentions légales
            </a>
            <a href="#confidentialite" className={linkClass}>
              Confidentialité
            </a>
          </div>

          <a
            href="#accueil"
            aria-label="Retour en haut de la page"
            className="group inline-flex h-10 w-10 items-center justify-center self-start rounded-full border border-white/20 text-white/70 transition duration-300 hover:border-[#f93137] hover:bg-[#f93137] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137] motion-reduce:transition-none sm:self-auto"
          >
            <ArrowUp
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}