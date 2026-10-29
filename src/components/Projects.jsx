import { useState } from "react";
import { ArrowUpRight, HeartHandshake, Globe2, HandHeart } from "lucide-react";

const RED = "#f93137";
const INK = "#1f2d2d";

const projects = [
  {
    category: "Accompagnement social",
    title: "Un accompagnement au plus près des personnes",
    description:
      "Une initiative pour écouter les besoins des personnes, les orienter et faciliter leur accès aux informations et aux démarches adaptées à leur situation.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=85",
    icon: HeartHandshake,
    status: "Exemple de projet à valider",
  },
  {
    category: "Coopération internationale",
    title: "Créer des liens entre le Maroc et l'Europe",
    description:
      "Présenter les initiatives de coopération et les échanges internationaux effectivement menés par le cabinet et ses partenaires.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
    icon: Globe2,
    status: "Exemple de projet à valider",
  },
  {
    category: "Solidarité humaine",
    title: "Mettre l'humain au cœur des initiatives",
    description:
      "Mettre en lumière des actions solidaires et des initiatives d'entraide, lorsque leur réalisation et les autorisations de publication sont confirmées.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=85",
    icon: HandHeart,
    status: "Exemple de projet à valider",
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <section
      id="projets"
      className="prj-font bg-white py-20 sm:py-28"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        .prj-font { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
        .prj-link { background: linear-gradient(currentColor, currentColor) left bottom / 0% 2px no-repeat; transition: background-size .4s cubic-bezier(.2,.8,.2,1); }
        .prj-link:hover { background-size: 100% 2px; }
        @media (prefers-reduced-motion: reduce) {
          .prj-motion { transition: none !important; }
          .prj-link { transition: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Titre */}
        <div className="mb-14 max-w-3xl">
          <h2
            className="text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[58px]"
            style={{ color: INK }}
          >
            Des initiatives guidées par l'humain.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-gray-500">
            Les projets qui illustrent notre approche de l'accompagnement, de
            la solidarité et de la coopération internationale.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Liste des projets */}
          <div>
            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {projects.map((p, i) => {
                const isActive = i === active;
                const Icon = p.icon;
                return (
                  <li key={p.title} className="relative">
                    <span
                      aria-hidden="true"
                      className="prj-motion absolute left-0 top-7 bottom-7 w-[3px] origin-top rounded-full"
                      style={{
                        background: RED,
                        transform: isActive ? "scaleY(1)" : "scaleY(0)",
                        transition: "transform .4s cubic-bezier(.2,.8,.2,1)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-expanded={isActive}
                      className="block w-full py-7 pl-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#f93137]"
                    >
                      <span
                        className="prj-motion flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
                        style={{ color: isActive ? RED : "#9ca3af" }}
                      >
                        <Icon size={17} />
                        {p.category}
                      </span>

                      <span
                        className="prj-motion mt-2 block text-2xl font-bold leading-snug transition-colors duration-300 sm:text-[28px]"
                        style={{ color: isActive ? INK : "#6b7280" }}
                      >
                        {p.title}
                      </span>

                      {/* Contenu déplié */}
                      <span
                        className="prj-motion grid"
                        style={{
                          gridTemplateRows: isActive ? "1fr" : "0fr",
                          transition: "grid-template-rows .5s cubic-bezier(.2,.8,.2,1)",
                        }}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-4 text-[15px] leading-7 text-gray-500">
                            {p.description}
                          </span>
                          <span className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                            <span className="h-2 w-2 rounded-full bg-amber-400" />
                            {p.status}
                          </span>

                          {/* Image visible seulement sur mobile */}
                          <img
                            src={p.image}
                            alt=""
                            loading="lazy"
                            className="mt-5 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden"
                          />
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 max-w-lg text-sm leading-6 text-gray-400">
              Contenu proposé pour la maquette. Les projets et les
              réalisations réels restent à confirmer par HUMANCARE LINK.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold"
              style={{ color: INK }}
            >
              <span className="prj-link pb-1">Échanger avec notre équipe</span>
              <ArrowUpRight size={18} style={{ color: RED }} />
            </a>
          </div>

          {/* Image sticky (desktop) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gray-100">
                {projects.map((p, i) => (
                  <img
                    key={p.image}
                    src={p.image}
                    alt=""
                    loading="lazy"
                    aria-hidden={i !== active}
                    className="prj-motion absolute inset-0 h-full w-full object-cover"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? "scale(1)" : "scale(1.08)",
                      transition:
                        "opacity .7s ease, transform 1.2s cubic-bezier(.2,.8,.2,1)",
                    }}
                  />
                ))}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6 pt-20">
                  <p
                    key={current.title}
                    className="prj-motion text-sm font-medium text-white/90"
                  >
                    {current.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}