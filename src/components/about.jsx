import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Globe2,
  HandHeart,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Réglages                                                           */
/* ------------------------------------------------------------------ */

// Mets ici une vraie photo (dossier /public). Si le fichier est absent,
// un fond de repli aux couleurs de la marque s'affiche automatiquement.
const ABOUT_IMAGE = "/hc.png";

const values = [
  {
    icon: HeartHandshake,
    title: "L'humain avant tout",
    description:
      "Écouter chaque personne et comprendre ses besoins pour proposer un accompagnement adapté.",
  },
  {
    icon: ShieldCheck,
    title: "Confiance et transparence",
    description:
      "Privilégier une communication claire et un accompagnement fondé sur la confiance.",
  },
  {
    icon: Globe2,
    title: "Ouverture internationale",
    description:
      "Faciliter les échanges et l'accès à l'information dans un environnement international.",
  },
];

/* ------------------------------------------------------------------ */
/*  Hook : déclenche l'animation une seule fois, à l'entrée à l'écran   */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.2) {
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
/*  Composant                                                          */
/* ------------------------------------------------------------------ */

export default function About() {
  const [sectionRef, inView] = useInView(0.15);
  const [imageFailed, setImageFailed] = useState(false);

  // Petite entrée en cascade (une seule séquence pour toute la section)
  const reveal = (delay = 0, extra = "") => ({
    className: `transition duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    } ${extra}`,
    style: { transitionDelay: inView ? `${delay}ms` : "0ms" },
  });

  return (
    <section
      id="apropos"
      ref={sectionRef}
      aria-labelledby="apropos-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#faf9f7] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* ------------------------------ Titre ------------------------------ */}
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2
            id="apropos-title"
            {...reveal(
              0,
              "text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-[#241d1d] sm:text-5xl lg:col-span-7 lg:text-6xl"
            )}
          >
            Créer des liens, ouvrir de nouvelles possibilités.
          </h2>

          <p
            {...reveal(
              120,
              "max-w-md text-base leading-relaxed text-stone-600 sm:text-lg lg:col-span-5 lg:justify-self-end"
            )}
          >
            HUMANCARE LINK place l'accompagnement humain au cœur de ses
            activités : un espace d'écoute, de conseil et d'assistance pour les
            projets à dimension internationale.
          </p>
        </header>

        {/* ------------------------- Image + texte --------------------------- */}
        <div className="mt-16 grid items-center gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Image en arche : l'élément mémorable de la section */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:mx-0">
            {/* cadre décalé */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[1.75rem] border border-[#f93137]/60 sm:translate-x-4 sm:translate-y-4"
            />

            <div
              className="group relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.75rem] bg-[#f93137] transition-[clip-path] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                clipPath: inView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
              }}
            >
              {!imageFailed && (
                <img
                  src={ABOUT_IMAGE}
                  alt="Des personnes réunies dans un esprit de coopération"
                  loading="lazy"
                  onError={() => setImageFailed(true)}
                  className={`h-full w-full object-cover transition-transform duration-[1800ms] ease-out motion-reduce:transition-none ${
                    inView ? "scale-75" : "scale-100"
                  }`}
                />
              )}

              {imageFailed && (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f93137] to-[#b81a20]">
                  <HeartHandshake
                    size={96}
                    strokeWidth={1}
                    className="text-white/30"
                  />
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#241d1d]/70 via-transparent to-transparent"
              />

              <p className="absolute inset-x-0 bottom-0 p-6 text-xl font-bold leading-snug text-white sm:p-8 sm:text-2xl">
                Chaque parcours mérite une attention particulière.
              </p>
            </div>

            {/* sceau circulaire : tourne au survol seulement */}
            <div className="group/seal absolute -right-3 top-24 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md sm:-right-8 sm:h-28 sm:w-28">
              <svg
                viewBox="0 0 120 120"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full text-[#241d1d] transition-transform duration-[1500ms] ease-out group-hover/seal:rotate-180 motion-reduce:transition-none"
              >
                <defs>
                  <path
                    id="hc-seal-path"
                    d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
                  />
                </defs>
                <text
                  fontSize="9.5"
                  fontWeight="700"
                  fill="currentColor"
                  textLength="262"
                  lengthAdjust="spacing"
                >
                  <textPath href="#hc-seal-path">
                    HUMANCARE LINK - CASABLANCA - MAROC -
                  </textPath>
                </text>
              </svg>
              <HeartHandshake
                size={26}
                className="relative text-[#f93137]"
                aria-hidden="true"
              />
            </div>

            {/* petite note posée sur l'image */}
            <div className="absolute -bottom-6 left-4 max-w-[240px] -rotate-2 rounded-xl bg-white p-4 shadow-lg sm:-left-6">
              <div className="flex items-center gap-3">
                <HandHeart
                  size={26}
                  className="shrink-0 text-[#f93137]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-[#241d1d]">
                    Une approche humaine
                  </p>
                  <p className="text-xs text-stone-500">
                    Écoute et accompagnement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Texte */}
          <div {...reveal(250, "lg:col-span-7 lg:pl-10")}>
            <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-[#241d1d] sm:text-3xl">
              Un interlocuteur pour vos démarches et vos projets.
            </h3>

            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-stone-600">
              <p>
                Basé à Casablanca, au Maroc, HUMANCARE LINK est un cabinet
                d'intermédiation, de conseil et d'assistance internationale. Son
                approche vise à accompagner les personnes dans la compréhension
                de leurs démarches et l'organisation de leurs projets.
              </p>
              <p>
                À travers une relation de proximité, le cabinet souhaite
                favoriser l'accès à l'information, faciliter les échanges et
                orienter chaque demande vers un accompagnement adapté.
              </p>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div className="border-l-2 border-[#f93137] pl-5">
                <h4 className="flex items-center gap-2 font-bold text-[#241d1d]">
                  <HeartHandshake
                    size={18}
                    className="text-[#f93137]"
                    aria-hidden="true"
                  />
                  Notre mission
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Écouter, informer et accompagner les personnes dans leurs
                  démarches et leurs projets internationaux.
                </p>
              </div>

              <div className="border-l-2 border-[#f93137] pl-5">
                <h4 className="flex items-center gap-2 font-bold text-[#241d1d]">
                  <Compass
                    size={18}
                    className="text-[#f93137]"
                    aria-hidden="true"
                  />
                  Notre vision
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Favoriser des échanges plus accessibles et des parcours mieux
                  accompagnés au-delà des frontières.
                </p>
              </div>
            </div>

            <a
              href="#services"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#f93137] px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-[#d9242a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f7]"
            >
              Découvrir nos services
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>

        {/* ----------------------------- Valeurs ----------------------------- */}
        <div {...reveal(350, "mt-28 lg:mt-36")}>
          <h3 className="max-w-xl text-2xl font-extrabold tracking-tight text-[#241d1d] sm:text-3xl">
            Les principes qui guident notre approche.
          </h3>

          <ul className="mt-10 grid divide-y divide-stone-300 border-y border-stone-300 md:grid-cols-3 md:divide-x md:divide-y-0">
            {values.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="py-8 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <Icon
                  size={28}
                  strokeWidth={1.75}
                  className="text-[#f93137]"
                  aria-hidden="true"
                />
                <h4 className="mt-5 text-lg font-bold text-[#241d1d]">
                  {title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}