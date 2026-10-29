import { useEffect, useRef } from "react";
import { MapPin, Globe2, Handshake, ShieldCheck } from "lucide-react";

const RED = "#f93137";
const INK = "#1f2d2d";

const networkItems = [
  {
    title: "Accompagnement au Maroc",
    location: "Maroc",
    description:
      "Exemple de collaboration avec des acteurs locaux pour faciliter l’orientation et l’accompagnement administratif.",
    icon: MapPin,
    tag: "Exemple à confirmer",
  },
  {
    title: "Orientation en Europe",
    location: "Europe",
    description:
      "Illustration d’un réseau potentiel de contacts pour orienter les personnes vers les services adaptés à leurs besoins.",
    icon: Globe2,
    tag: "Exemple à confirmer",
  },
  {
    title: "Coopération internationale",
    location: "Maroc et Europe",
    description:
      "Une approche fondée sur l’échange d’informations, la coordination et l’accompagnement entre les deux territoires.",
    icon: Handshake,
    tag: "Concept de collaboration",
  },
];

const ROUTE = "M96 268 C 230 300, 300 96, 430 138 S 640 70, 704 82";

export default function Network() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const endRef = useRef(null);

  /* Un seul moment orchestré : la route se trace quand la section apparaît */
  useEffect(() => {
    const path = pathRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    const end = endRef.current;
    if (!path || !line || !dot) return;

    const len = path.getTotalLength();
    const draw = (t) => {
      const p = path.getPointAtLength(len * t);
      line.style.strokeDashoffset = String(1 - t);
      dot.setAttribute("cx", p.x);
      dot.setAttribute("cy", p.y);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      draw(1);
      end?.classList.add("net-arrived");
      return;
    }

    draw(0);
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now() + 300;
        const dur = 2600;
        const tick = (now) => {
          const k = Math.min(Math.max((now - start) / dur, 0), 1);
          const eased = 1 - Math.pow(1 - k, 3);
          draw(eased);
          if (k < 1) raf = requestAnimationFrame(tick);
          else end?.classList.add("net-arrived");
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    io.observe(sectionRef.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="reseau"
      ref={sectionRef}
      className="net-font relative bg-white py-20 sm:py-28"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        .net-font { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
        @keyframes net-ring {
          0%   { transform: scale(.6); opacity: .7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .net-ring { transform-box: fill-box; transform-origin: center; animation: net-ring 2.4s ease-out infinite; }
        .net-end-ring { opacity: 0; }
        .net-arrived .net-end-ring { opacity: 1; }
        .net-row .net-bar { transform: scaleY(0); transition: transform .35s cubic-bezier(.2,.8,.2,1); }
        .net-row:hover .net-bar, .net-row:focus-within .net-bar { transform: scaleY(1); }
        @media (prefers-reduced-motion: reduce) {
          .net-ring { animation: none; }
          .net-row .net-bar { transition: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Titre */}
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2
            className="text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[58px]"
            style={{ color: INK }}
          >
            Créer des liens,
            <br />
            ouvrir des possibilités.
          </h2>
          <p className="max-w-md text-[17px] leading-relaxed text-gray-500">
            Des relations de confiance entre le Maroc et l’Europe peuvent
            faciliter l’orientation, l’échange d’informations et
            l’accompagnement des personnes dans leurs démarches.
          </p>
        </div>

        {/* Carte de la route Maroc → Europe */}
        <div
          className="relative overflow-hidden rounded-[28px] px-5 pb-8 pt-6 text-white sm:px-10 sm:pb-10"
          style={{
            background: INK,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.09) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <svg
            viewBox="0 0 800 340"
            className="mx-auto block h-auto w-full max-w-4xl"
            role="img"
            aria-label="Route entre le Maroc et l’Europe"
          >
            {/* tracé de fond */}
            <path
              ref={pathRef}
              d={ROUTE}
              fill="none"
              stroke="rgba(255,255,255,.18)"
              strokeWidth="2"
              strokeDasharray="3 9"
              strokeLinecap="round"
            />
            {/* tracé animé */}
            <path
              ref={lineRef}
              d={ROUTE}
              pathLength="1"
              fill="none"
              stroke={RED}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset="1"
            />

            {/* Maroc */}
            <circle cx="96" cy="268" r="9" fill={RED} />
            <circle cx="96" cy="268" r="3.5" fill="#fff" />
            <text x="96" y="306" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="700">
              Maroc
            </text>

            {/* Europe */}
            <g ref={endRef}>
              <circle className="net-end-ring net-ring" cx="704" cy="82" r="10" fill="none" stroke={RED} strokeWidth="2" />
              <circle cx="704" cy="82" r="9" fill="#fff" />
              <circle cx="704" cy="82" r="3.5" fill={RED} />
              <text x="704" y="124" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="700">
                Europe
              </text>
            </g>

            {/* point voyageur */}
            <circle ref={dotRef} r="7" cx="96" cy="268" fill="#fff" stroke={RED} strokeWidth="3" />
          </svg>

          <div className="mx-auto mt-2 grid max-w-4xl gap-6 text-sm leading-6 text-white/70 sm:grid-cols-2 sm:gap-16">
            <p>
              <span className="font-semibold text-white">Point de départ. </span>
              Accueil, écoute et orientation selon les besoins.
            </p>
            <p>
              <span className="font-semibold text-white">Destination envisagée. </span>
              Information et orientation vers les interlocuteurs adaptés, selon
              les possibilités confirmées.
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-4xl border-t border-white/10 pt-4 text-xs text-white/45">
            Illustration conceptuelle. Les collaborations effectives restent à
            confirmer.
          </p>
        </div>

        {/* Liste des relations (lignes, pas de cartes identiques) */}
        <ul className="mt-14 divide-y divide-gray-200 border-y border-gray-200">
          {networkItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="net-row relative grid gap-3 py-8 pl-5 md:grid-cols-[200px_1fr_190px] md:items-start md:gap-10 md:pl-7"
              >
                <span
                  aria-hidden="true"
                  className="net-bar absolute left-0 top-6 bottom-6 w-[3px] origin-top rounded-full"
                  style={{ background: RED }}
                />
                <p className="flex items-center gap-2.5 text-[15px] font-semibold" style={{ color: RED }}>
                  <Icon size={19} />
                  {item.location}
                </p>
                <div>
                  <h3 className="text-xl font-bold sm:text-[22px]" style={{ color: INK }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-7 text-gray-500">
                    {item.description}
                  </p>
                </div>
                <p className="flex items-center gap-2 text-sm text-gray-400 md:justify-end md:pt-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  {item.tag}
                </p>
              </li>
            );
          })}
        </ul>

        {/* Note de confiance */}
        <div className="mt-8 flex items-start gap-4">
          <ShieldCheck size={24} className="mt-0.5 shrink-0" style={{ color: RED }} />
          <p className="max-w-2xl text-[15px] leading-7 text-gray-500">
            <span className="font-semibold" style={{ color: INK }}>
              Des relations fondées sur la confiance.{" "}
            </span>
            Les noms des partenaires, leurs logos et les collaborations seront
            ajoutés uniquement après validation et autorisation.
          </p>
        </div>
      </div>
    </section>
  );
}