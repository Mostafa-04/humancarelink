import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Données                                                            */
/* ------------------------------------------------------------------ */

// Une seule source de vérité pour l'adresse e-mail
// (avant : deux adresses différentes dans le même fichier).
const EMAIL = "humancarelink25@gmail.com";

const contactInfo = [
  {
    icon: Mail,
    title: "Adresse e-mail",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    description: "Pour toute demande d'information",
    copy: true,
  },
  {
    icon: MapPin,
    title: "Notre bureau",
    value: "Casablanca, Maroc",
    description: "Adresse complète à confirmer",
  },
  {
    icon: Clock3,
    title: "Disponibilité",
    value: "Sur rendez-vous",
    description: "Horaires à confirmer",
  },
];

const subjects = [
  "Renseignements généraux",
  "Formation et emploi à l'international",
  "Démarches administratives",
  "Regroupement familial",
  "Orientation santé",
  "Autre demande",
];

const initialForm = { name: "", email: "", subject: "", message: "" };

/* ------------------------------------------------------------------ */
/*  Hook : animation déclenchée une seule fois                         */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
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

// Champs « papier » : seulement un trait en bas, qui devient rouge au focus
const fieldClass =
  "w-full border-0 border-b border-stone-300 bg-transparent px-0 py-3 text-base text-[#241d1d] outline-none transition placeholder:text-stone-400 focus:border-[#f93137] focus:shadow-[0_1px_0_0_#f93137] focus:ring-0";

const labelClass = "block text-sm font-semibold text-stone-600";

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const [sectionRef, inView] = useInView();
  const [form, setForm] = useState(initialForm);
  const [fallback, setFallback] = useState(null); // lien Gmail après envoi
  const [copied, setCopied] = useState(false);

  const reveal = (delay = 0, extra = "") => ({
    className: `transition duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    } ${extra}`,
    style: { transitionDelay: inView ? `${delay}ms` : "0ms" },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFallback(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = form.subject
      ? `${form.subject} - HUMANCARE LINK`
      : "Demande de renseignements - HUMANCARE LINK";

    const body =
      `Nom : ${form.name}\r\n` +
      `E-mail : ${form.email}\r\n\r\n` +
      `Message :\r\n${form.message}`;

    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Sur un ordinateur sans application de messagerie, mailto: ne fait rien.
    // On propose donc aussi Gmail dans le navigateur.
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setFallback(gmail);
    window.location.href = mailto;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponible : on ne fait rien */
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 overflow-hidden bg-[#faf9f7] py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------- Colonne gauche ------------------------ */}
          <div className="lg:col-span-5">
            <h2
              id="contact-title"
              {...reveal(
                0,
                "text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-[#241d1d] sm:text-5xl"
              )}
            >
              Parlons de votre projet.
            </h2>

            <p
              {...reveal(
                100,
                "mt-6 max-w-md text-base leading-relaxed text-stone-600 sm:text-lg"
              )}
            >
              Une question sur nos services ? Écrivez-nous : nous vous aiderons
              à identifier les prochaines étapes adaptées à votre situation.
            </p>

            <ul
              {...reveal(
                200,
                "mt-10 divide-y divide-stone-300 border-y border-stone-300"
              )}
            >
              {contactInfo.map(
                ({ icon: Icon, title, value, href, description, copy }) => (
                  <li key={title} className="flex gap-4 py-5">
                    <Icon
                      size={22}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0 text-[#f93137]"
                      aria-hidden="true"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-stone-500">{title}</p>

                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {href ? (
                          <a
                            href={href}
                            className="break-all font-semibold text-[#241d1d] underline decoration-[#f93137]/40 underline-offset-4 transition hover:decoration-[#f93137] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137]"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="font-semibold text-[#241d1d]">
                            {value}
                          </p>
                        )}

                        {copy && (
                          <button
                            type="button"
                            onClick={copyEmail}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 transition hover:text-[#f93137] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137]"
                          >
                            {copied ? (
                              <CheckCircle2 size={14} aria-hidden="true" />
                            ) : (
                              <Copy size={14} aria-hidden="true" />
                            )}
                            <span aria-live="polite">
                              {copied ? "Copié" : "Copier"}
                            </span>
                          </button>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-stone-500">
                        {description}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>

            <p
              {...reveal(
                300,
                "mt-6 flex max-w-md gap-3 text-sm leading-relaxed text-stone-500"
              )}
            >
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#f93137]"
                aria-hidden="true"
              />
              Évitez d'envoyer des documents confidentiels ou des informations
              personnelles sensibles via ce formulaire.
            </p>
          </div>

          {/* --------------------------- Formulaire -------------------------- */}
          {/* Une feuille de courrier : bande « par avion » en haut, c'est le
              seul moment un peu marqué de la section. */}
          <div className="lg:col-span-7">
            <div
              className={`overflow-hidden rounded-md bg-white shadow-[0_24px_40px_-24px_rgba(36,29,29,0.3)] transition duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                inView
                  ? "translate-y-0 rotate-0 opacity-100"
                  : "translate-y-8 rotate-[1.2deg] opacity-0"
              }`}
              style={{ transitionDelay: inView ? "150ms" : "0ms" }}
            >
              <div
                aria-hidden="true"
                className="h-2.5 w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, #f93137 0 14px, #ffffff 14px 24px, #241d1d 24px 38px, #ffffff 38px 48px)",
                }}
              />

              <div className="p-6 sm:p-10 lg:p-12">
                <h3 className="text-2xl font-extrabold tracking-tight text-[#241d1d]">
                  Envoyez-nous un message
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Remplissez les champs pour préparer votre demande.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-7">
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        Nom complet *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        Adresse e-mail *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="vous@exemple.com"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className={labelClass}>
                      Sujet de votre demande *
                    </label>
                    <div className="relative">
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className={`${fieldClass} appearance-none pr-8 ${
                          form.subject ? "" : "text-stone-400"
                        }`}
                      >
                        <option value="">Sélectionnez un sujet</option>
                        {subjects.map((subject) => (
                          <option
                            key={subject}
                            value={subject}
                            className="text-[#241d1d]"
                          >
                            {subject}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-stone-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      Votre message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Expliquez-nous brièvement votre demande..."
                      className={`${fieldClass} resize-y leading-relaxed`}
                    />
                  </div>

                  {fallback && (
                    <div
                      role="status"
                      className="flex gap-3 border-l-2 border-[#f93137] bg-[#faf9f7] p-4 text-sm leading-relaxed text-stone-600"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#f93137]"
                        aria-hidden="true"
                      />
                      <p>
                        Votre application de messagerie devrait s'ouvrir avec
                        votre message prêt à être envoyé. Rien ne s'ouvre ?{" "}
                        <a
                          href={fallback}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#241d1d] underline decoration-[#f93137] underline-offset-4"
                        >
                          Ouvrir dans Gmail
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs leading-relaxed text-stone-500">
                      * Champs obligatoires. Aucun message n'est enregistré sur
                      le site.
                    </p>

                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f93137] px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-[#d9242a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f93137] focus-visible:ring-offset-2 sm:w-auto"
                    >
                      Préparer mon message
                      <Send
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}