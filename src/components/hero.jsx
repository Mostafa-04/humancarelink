import { useEffect, useState } from "react";
import { ArrowUpRight, Globe2, HeartHandshake, ShieldCheck } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Données                                                            */
/* ------------------------------------------------------------------ */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85";

const highlights = [
  {
    icon: HeartHandshake,
    title: "Approche humaine",
    description: "Une écoute attentive de vos besoins",
  },
  {
    icon: Globe2,
    title: "Vision internationale",
    description: "Des projets tournés vers l'international",
  },
  {
    icon: ShieldCheck,
    title: "Accompagnement",
    description: "Des démarches adaptées à votre situation",
  },
];

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */

export default function Hero() {
  // Le hero est visible dès l'arrivée : la séquence se lance au chargement,
  // pas au scroll. Avec prefers-reduced-motion, les transitions sont coupées
  // (motion-reduce:transition-none) et tout s'affiche directement.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(id);
  }, []);

  const rise = (delay = 0, extra = "") => ({
    className: `transition duration-700 ease-out motion-reduce:transition-none ${
      ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    } ${extra}`,
    style: { transitionDelay: `${delay}ms` },
  });

  // Chaque ligne du titre monte depuis un masque
  const line = (delay) => ({
    className: `block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
      ready ? "translate-y-0" : "translate-y-full"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[#faf9f7]"
    >
      {/* ------------------------------ Texte ------------------------------ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:flex lg:min-h-[680px] lg:items-center lg:px-12 lg:py-28">
        <div className="lg:w-[54%] lg:pr-8">
          <h1
            id="hero-title"
            className="text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-[#241d1d] sm:text-6xl xl:text-7xl"
          >
            <span className="block overflow-hidden py-[0.06em]">
              <span {...line(0)}>Votre avenir</span>
            </span>
            <span className="block overflow-hidden py-[0.06em]">
              <span {...line(140)}>au-delà des frontières.</span>
            </span>
          </h1>

          <p
            {...rise(
              450,
              "mt-8 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg"
            )}
          >
            Un accompagnement humain et personnalisé dans vos démarches
            administratives, professionnelles et internationales, pour
            construire vos projets en toute confiance.
          </p>

          <div
            {...rise(
              600,
              "mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
            )}
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full bg-[#f93137] px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-[#d9242a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f7]"
            >
              Découvrir nos services
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>

            <a
              href="#contact"
              className="text-sm font-bold text-[#241d1d] underline decoration-[#f93137] decoration-2 underline-offset-8 transition-all duration-300 hover:decoration-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137] focus-visible:ring-offset-4 focus-visible:ring-offset-[#faf9f7]"
            >
              Parlons de votre projet
            </a>
          </div>

          <ul
            {...rise(
              750,
              "mt-14 grid gap-6 border-t border-stone-300 pt-8 sm:grid-cols-3"
            )}
          >
            {highlights.map(({ icon: Icon, title, description }) => (
              <li key={title}>
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  className="text-[#f93137]"
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm font-bold text-[#241d1d]">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------------------------------ Image ------------------------------ */}
      {/* Sur grand écran : panneau collé au bord droit, coupé en biais
          (même angle que la bande « par avion » du site). Sur mobile : image
          pleine largeur sous le texte. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#241d1d] sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[44%] lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
        <img
          src={HERO_IMAGE}
          alt="Équipe en réunion autour d'un projet professionnel"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-out motion-reduce:transition-none ${
            ready ? "scale-100" : "scale-110"
          }`}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#241d1d]/85 via-[#241d1d]/10 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:pl-[16%] lg:pr-10">
          {/* Le trajet Casablanca → Europe se trace une seule fois */}
          <svg
            viewBox="0 0 400 110"
            role="img"
            aria-label="Un trajet relie Casablanca à l'Europe"
            className="h-auto w-full max-w-md"
          >
            <path
              d="M24 86 C 110 6, 250 6, 376 54"
              pathLength="1"
              fill="none"
              stroke="white"
              strokeOpacity="0.85"
              strokeWidth="2"
              strokeLinecap="round"
              className={`[stroke-dasharray:1] transition-[stroke-dashoffset] delay-[900ms] duration-[1800ms] ease-out motion-reduce:transition-none ${
                ready ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1]"
              }`}
            />
            <circle cx="24" cy="86" r="5" fill="white" />
            <circle
              cx="376"
              cy="54"
              r="6"
              fill="#f93137"
              stroke="white"
              strokeWidth="2"
              className={`transition-opacity delay-[2400ms] duration-500 motion-reduce:transition-none ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            />
            <text x="24" y="106" fontSize="14" fontWeight="600" fill="white">
              Casablanca
            </text>
            <text
              x="376"
              y="82"
              fontSize="14"
              fontWeight="600"
              fill="white"
              textAnchor="end"
              className={`transition-opacity delay-[2400ms] duration-500 motion-reduce:transition-none ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            >
              Europe
            </text>
          </svg>

          <p className="mt-5 text-sm text-white/75">
            Conseil, assistance, intermédiation
          </p>
          <p className="mt-2 max-w-sm text-2xl font-bold leading-snug text-white sm:text-3xl">
            Des solutions adaptées à vos projets internationaux.
          </p>
        </div>
      </div>
    </section>
  );
}