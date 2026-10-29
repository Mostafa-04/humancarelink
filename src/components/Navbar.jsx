import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Menu, X, Mail } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Nos services", href: "#services" },
  { label: "Nos projets", href: "#projets" },
  { label: "Notre réseau", href: "#reseau" },
];

const RED = "#f93137";
const INK = "#1f2d2d";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("#accueil");
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });
  const listRef = useRef(null);
  const linkRefs = useRef({});

  /* Scroll : état compact + progression */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Section active */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Menu mobile : blocage du scroll + Échap */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  /* La pastille suit le lien survolé (ou le lien actif) */
  const moveTo = useCallback((href) => {
    const el = linkRefs.current[href];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth, show: true });
  }, []);

  const resetPill = useCallback(() => {
    const el = linkRefs.current[active];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, show: true });
    else setPill((p) => ({ ...p, show: false }));
  }, [active]);

  useEffect(() => {
    resetPill();
  }, [resetPill]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        .hcl-font { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
        @keyframes hcl-drop {
          0%   { opacity: 0; transform: translateY(-28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes hcl-link-in {
          0%   { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes hcl-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(249,49,55,.45); }
          100% { box-shadow: 0 0 0 9px rgba(249,49,55,0); }
        }
        .hcl-drop { animation: hcl-drop .8s cubic-bezier(.2,.8,.2,1) both; }
        .hcl-link-in { animation: hcl-link-in .6s cubic-bezier(.2,.8,.2,1) both; }
        .hcl-dot { animation: hcl-pulse 2.2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hcl-drop, .hcl-link-in, .hcl-dot { animation: none !important; }
          .hcl-motion { transition: none !important; }
        }
      `}</style>

      <header
        className="hcl-font fixed inset-x-0 top-0 z-50 px-0 sm:px-4"
        style={{ paddingTop: scrolled ? 12 : 0, transition: "padding .5s cubic-bezier(.2,.8,.2,1)" }}
      >
        <div
          className={`hcl-drop hcl-motion relative mx-auto overflow-hidden backdrop-blur-xl ${
            scrolled
              ? "max-w-[1060px] rounded-full bg-white/90 shadow-[0_10px_40px_-12px_rgba(31,45,45,0.28)] ring-1 ring-black/5"
              : "max-w-[1400px] rounded-none bg-white/95 ring-1 ring-transparent"
          }`}
          style={{ transition: "max-width .6s cubic-bezier(.2,.8,.2,1), border-radius .6s, background-color .4s, box-shadow .5s" }}
        >
          <nav
            aria-label="Navigation principale"
            className="flex items-center justify-between gap-6 px-5 sm:px-7"
            style={{ height: scrolled ? 64 : 80, transition: "height .5s cubic-bezier(.2,.8,.2,1)" }}
          >
            {/* Logo */}
            <a
              href="#accueil"
              onClick={closeMenu}
              aria-label="HUMANCARE LINK, accueil"
              className="relative z-[70] flex shrink-0 items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f93137]"
            >
              <span className="relative flex h-11 w-11 items-center justify-center">
                <img src="/logo.png" alt="" className="h-14 w-14 object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className="text-[17px] font-extrabold tracking-tight sm:text-[18px]"
                  style={{ color: INK }}
                >
                  Humancare<span style={{ color: RED }}>Link</span>
                </span>
                <span
                  className="hcl-motion mt-1 overflow-hidden text-[11px] font-medium text-gray-400"
                  style={{
                    maxHeight: scrolled ? 0 : 16,
                    opacity: scrolled ? 0 : 1,
                    transition: "max-height .4s, opacity .3s",
                  }}
                >
                  L'humain au cœur des liens
                </span>
              </span>
            </a>

            {/* Liens desktop */}
            <div
              ref={listRef}
              onMouseLeave={resetPill}
              className="relative hidden items-center lg:flex"
            >
              <span
                aria-hidden="true"
                className="hcl-motion absolute top-1/2 h-9 -translate-y-1/2 rounded-full"
                style={{
                  left: pill.left,
                  width: pill.width,
                  opacity: pill.show ? 1 : 0,
                  background: "#fff1f1",
                  transition:
                    "left .45s cubic-bezier(.3,1.3,.5,1), width .45s cubic-bezier(.3,1.3,.5,1), opacity .25s",
                }}
              />
              {navLinks.map((link, i) => {
                const isActive = active === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    ref={(el) => (linkRefs.current[link.href] = el)}
                    onMouseEnter={() => moveTo(link.href)}
                    onFocus={() => moveTo(link.href)}
                    onBlur={resetPill}
                    aria-current={isActive ? "true" : undefined}
                    className="hcl-link-in relative rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f93137]"
                    style={{
                      color: isActive ? RED : "#4b5563",
                      animationDelay: `${0.35 + i * 0.07}s`,
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* CTA desktop */}
            <a
              href="#contact"
              className="group relative hidden shrink-0 items-center gap-2 overflow-hidden rounded-full py-2.5 pl-5 pr-2.5 text-[14px] font-bold text-white transition-transform duration-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f93137] lg:inline-flex"
              style={{ background: RED }}
            >
              {/* remplissage sombre au survol */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                style={{ background: INK }}
              />
              <span className="relative">Nous contacter</span>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#f93137] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={16} strokeWidth={2.6} />
              </span>
            </a>

            {/* Bouton mobile */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f93137] lg:hidden"
              style={{
                background: isOpen ? "#fff" : "#fff1f1",
                color: isOpen ? RED : INK,
              }}
            >
              <span
                className="hcl-motion absolute"
                style={{
                  transform: isOpen ? "rotate(90deg) scale(0)" : "rotate(0) scale(1)",
                  transition: "transform .35s",
                }}
              >
                <Menu size={22} />
              </span>
              <span
                className="hcl-motion absolute"
                style={{
                  transform: isOpen ? "rotate(0) scale(1)" : "rotate(-90deg) scale(0)",
                  transition: "transform .35s",
                }}
              >
                <X size={22} />
              </span>
            </button>
          </nav>

          {/* Fil de progression : le « lien » qui se tisse en descendant la page */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent" aria-hidden="true">
            <div
              className="h-full origin-left"
              style={{ background: RED, transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </header>

      {/* Menu mobile : s'ouvre en cercle depuis le bouton */}
      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className="hcl-font hcl-motion fixed inset-0 z-[60] lg:hidden"
        style={{
          background: RED,
          clipPath: isOpen
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0px at calc(100% - 40px) 40px)",
          overscrollBehavior: "contain",
          transition: "clip-path .75s cubic-bezier(.7,0,.2,1)",
          pointerEvents: isOpen ? "auto" : "none",
          visibility: isOpen ? "visible" : "hidden",
          transitionProperty: "clip-path, visibility",
          transitionDelay: isOpen ? "0s" : "0s, .75s",
        }}
      >
        {/* Bouton X : dans le menu lui-même, toujours visible et cliquable */}
        <button
          type="button"
          onClick={closeMenu}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Fermer le menu"
          className="hcl-motion absolute right-[18px] top-[max(18px,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#f93137] shadow-lg transition-colors hover:bg-[#fff1f1] active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-4 sm:h-12 sm:w-12"
          style={{
            transform: isOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
            transition: `transform .5s cubic-bezier(.3,1.3,.5,1) ${isOpen ? 0.3 : 0}s, background-color .2s`,
          }}
        >
          <X size={22} strokeWidth={2.4} />
        </button>

        <div className="flex h-full flex-col overflow-y-auto px-7 pb-8 pt-28">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <a
                  href={link.href}
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                  className="hcl-motion block py-2 text-[40px] font-bold leading-[1.1] tracking-tight text-white transition-[padding] duration-300 hover:pl-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{
                    transform: isOpen ? "translateY(0)" : "translateY(110%)",
                    opacity: isOpen ? 1 : 0,
                    transition: `transform .7s cubic-bezier(.2,.8,.2,1) ${
                      isOpen ? 0.25 + i * 0.07 : 0
                    }s, opacity .5s ${isOpen ? 0.25 + i * 0.07 : 0}s, padding .3s`,
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="hcl-motion mt-auto"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all .6s ease ${isOpen ? 0.7 : 0}s`,
            }}
          >
            <a
              href="#contact"
              onClick={closeMenu}
              tabIndex={isOpen ? 0 : -1}
              className="flex w-full items-center justify-between rounded-full bg-white py-2 pl-7 pr-2 text-lg font-bold transition-transform active:scale-[0.98]"
              style={{ color: INK }}
            >
              Nous contacter
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                style={{ background: RED }}
              >
                <ArrowUpRight size={22} strokeWidth={2.6} />
              </span>
            </a>

            <p className="mt-6 flex items-center gap-2 text-sm font-medium text-white/80">
              <Mail size={16} />
              Présents au Maroc et en Europe
            </p>
          </div>
        </div>
      </div>
    </>
  );
}