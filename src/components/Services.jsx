import { ArrowUpRight, FileText, BriefcaseBusiness, UsersRound, HeartPulse } from "lucide-react";

const RED = "#f93137";
const INK = "#1f2d2d";

/* Chaque service a sa propre couleur de panneau, toutes tirées de la charte */
const services = [
  {
    icon: FileText,
    title: "Assistance administrative",
    description:
      "Un accompagnement pour comprendre, préparer et organiser vos démarches administratives, notamment pour les Marocains résidant à l'étranger.",
    features: ["Orientation administrative", "Gestion de documents", "Accompagnement personnalisé"],
    tag: "Démarches et documents",
    theme: { bg: "#fff1f1", fg: INK, sub: "#5b6666", line: "rgba(31,45,45,.15)", accent: RED },
  },
  {
    icon: BriefcaseBusiness,
    title: "Formation et emploi à l'international",
    description:
      "Des conseils et une orientation pour mieux comprendre les possibilités de formation et les démarches liées aux projets professionnels à l'étranger.",
    features: ["Conseil et orientation", "Information sur les démarches", "Préparation du projet professionnel"],
    tag: "Projet professionnel",
    theme: { bg: INK, fg: "#ffffff", sub: "rgba(255,255,255,.68)", line: "rgba(255,255,255,.18)", accent: "#ff7a7e" },
  },
  {
    icon: UsersRound,
    title: "Regroupement familial",
    description:
      "Une assistance dans la compréhension des procédures administratives liées aux démarches de rapprochement familial à l'international.",
    features: ["Information sur les procédures", "Orientation administrative", "Suivi des démarches convenues"],
    tag: "Famille et démarches",
    theme: { bg: RED, fg: "#ffffff", sub: "rgba(255,255,255,.85)", line: "rgba(255,255,255,.3)", accent: "#ffffff" },
  },
  {
    icon: HeartPulse,
    title: "Santé et assurances",
    description:
      "Une orientation concernant certaines démarches liées aux soins à l'étranger, aux hospitalisations et aux demandes d'indemnisation après un accident.",
    features: ["Orientation sur les démarches", "Assistance administrative", "Information sur les dossiers"],
    tag: "Assistance et orientation",
    theme: { bg: "#f1f3f3", fg: INK, sub: "#5b6666", line: "rgba(31,45,45,.15)", accent: RED },
  },
];

export default function Services() {
  return (
    <section id="services" className="svc-font bg-white py-20 sm:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        .svc-font { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
        .svc-link { background: linear-gradient(currentColor, currentColor) left bottom / 0% 2px no-repeat; transition: background-size .4s cubic-bezier(.2,.8,.2,1); }
        .svc-cta:hover .svc-link, .svc-cta:focus-visible .svc-link { background-size: 100% 2px; }
        .svc-arrow { transition: transform .4s cubic-bezier(.2,.8,.2,1); }
        .svc-cta:hover .svc-arrow { transform: translate(3px, -3px); }
        @media (prefers-reduced-motion: reduce) {
          .svc-link, .svc-arrow { transition: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Titre */}
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2
            className="text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[58px]"
            style={{ color: INK }}
          >
            Un accompagnement adapté à chaque parcours.
          </h2>
          <p className="max-w-md text-[17px] leading-relaxed text-gray-500">
            Nos domaines d'accompagnement, pour une orientation qui correspond
            à vos besoins, à votre situation et à votre projet international.
          </p>
        </div>

        {/* Panneaux qui s'empilent au fil du défilement */}
        <div>
          {services.map((s, i) => {
            const Icon = s.icon;
            const t = s.theme;
            return (
              <div
                key={s.title}
                className="sticky mb-6 last:mb-0"
                style={{ top: 92 + i * 14 }}
              >
                <article
                  className="relative overflow-hidden rounded-[28px] p-7 sm:p-10 lg:p-14"
                  style={{ background: t.bg, color: t.fg, boxShadow: "0 -8px 30px -12px rgba(31,45,45,.18)" }}
                >
                  {/* grande icône en filigrane */}
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1}
                    className="pointer-events-none absolute -bottom-10 -right-8 h-64 w-64 sm:h-80 sm:w-80"
                    style={{ color: t.fg, opacity: 0.07 }}
                  />

                  <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: t.accent }}>
                        {s.tag}
                      </p>
                      <h3 className="mt-3 max-w-lg text-[28px] font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
                        {s.title}
                      </h3>
                      <p className="mt-5 max-w-lg text-[16px] leading-7" style={{ color: t.sub }}>
                        {s.description}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <ul>
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-4 py-4 text-[16px] font-medium first:pt-0"
                            style={{ borderBottom: `1px solid ${t.line}` }}
                          >
                            <span
                              aria-hidden="true"
                              className="h-[2px] w-5 shrink-0 rounded-full"
                              style={{ background: t.accent }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#contact"
                        aria-label={`Demander des informations : ${s.title}`}
                        className="svc-cta mt-7 inline-flex w-fit items-center gap-2 text-[15px] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                        style={{ color: t.fg, outlineColor: t.accent }}
                      >
                        <span className="svc-link pb-1">Demander des informations</span>
                        <ArrowUpRight size={18} className="svc-arrow" style={{ color: t.accent }} />
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-sm leading-6 text-gray-400">
          Les prestations, les conditions d'accompagnement et les démarches
          applicables doivent être confirmées directement auprès de HUMANCARE
          LINK. Les services présentés ici constituent une proposition de
          contenu pour la maquette.
        </p>
      </div>
    </section>
  );
}