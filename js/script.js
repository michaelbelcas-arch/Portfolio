/* ============================================================
   Portfolio QA — Michael Belcastro
   Bascule de langue FR / EN (persistée dans localStorage)
   ============================================================ */

const I18N = {
  fr: {
    nav_priority:   'Ticket prioritaire',
    nav_xp:         'Expériences',
    nav_projects:   'Projets',
    status_avail:   'DISPONIBLE',
    status_mode:    'CDI · télétravail ou hybride',
    badge_open:     'OUVERT',
    hero_title:     "Votre équipe QA manque d'un testeur junior motivé",
    steps_label:    'Étapes pour reproduire :',
    hero_steps:     '1. Ouvrir ce portfolio\u00a0\u00a02. Constater 9 mois de formation QA intensive + un parcours terrain qui a forgé la rigueur\u00a0\u00a03. Résoudre le ticket en me contactant.',
    resolve_btn:    'RÉSOUDRE CE TICKET →',
    assignee:       'assigné à : vous',
    xp_title:       'EXPÉRIENCES',
    xp1_title:      'Formation Testeur Logiciel — OpenClassrooms',
    xp1_meta:       'nov. 2025 → juil. 2026 · automatisation, validation fonctionnelle, Agile',
    badge_progress: 'EN COURS',
    xp2_title:      'Technicien Atelier — Décathlon',
    xp2_meta:       'sept. 2024 → août 2025 · diagnostic & réparation cycles / trottinettes',
    badge_resolved: 'RÉSOLU',
    xp3_title:      'Bâtiment — métiers techniques exigeants',
    xp3_meta:       'plusieurs années · rigueur, autonomie, précision',
    badge_archived: 'ARCHIVÉ',
    proj_title:     'PROJETS — ÉTUDES DE CAS',
    p1_desc:        'Campagne Cypress complète : API REST, tests fonctionnels, anomalies XSS & panier détectées et documentées.',
    gh_link1:       'Voir sur GitHub',
    p2_desc:        'Application React responsive : routing, composants réutilisables. Côté dev, pour mieux comprendre ce que je teste.',
    gh_link2:       'Voir sur GitHub',
    p3_badge:       'LIVRÉ ✓',
    p3_desc:        "Stratégie de test d'une application bancaire : revue des exigences, stratégie, cas de test et compte rendu.",
    p3_link:        'Télécharger le dossier de test (.zip)',
    cov_title:      'STACK & OUTILS',
    coffee:         'Café',
    contact_title:  'Ouvrir un ticket « opportunité »',
    cv_link:        'Mon CV',
    contact_btn:    'CRÉER LE TICKET',
    footer:         "Conçu et testé par Michael Belcastro — 0 bug connu (pour l'instant) · © 2026",
  },
  en: {
    nav_priority:   'Priority ticket',
    nav_xp:         'Experience',
    nav_projects:   'Projects',
    status_avail:   'AVAILABLE',
    status_mode:    'Full-time · remote or hybrid',
    badge_open:     'OPEN',
    hero_title:     'Your QA team is missing a motivated junior tester',
    steps_label:    'Steps to reproduce:',
    hero_steps:     '1. Open this portfolio\u00a0\u00a02. Notice 9 months of intensive QA training + a hands-on background that forged rigor\u00a0\u00a03. Resolve the ticket by contacting me.',
    resolve_btn:    'RESOLVE THIS TICKET →',
    assignee:       'assignee: you',
    xp_title:       'EXPERIENCE',
    xp1_title:      'Software Tester program — OpenClassrooms',
    xp1_meta:       'Nov 2025 → Jul 2026 · automation, functional validation, Agile',
    badge_progress: 'IN PROGRESS',
    xp2_title:      'Workshop Technician — Decathlon',
    xp2_meta:       'Sep 2024 → Aug 2025 · bike & scooter diagnostics and repair',
    badge_resolved: 'RESOLVED',
    xp3_title:      'Construction — demanding technical trades',
    xp3_meta:       'several years · rigor, autonomy, precision',
    badge_archived: 'ARCHIVED',
    proj_title:     'PROJECTS — CASE STUDIES',
    p1_desc:        'Full Cypress campaign: REST API, functional tests, XSS & cart anomalies found and documented.',
    gh_link1:       'View on GitHub',
    p2_desc:        'Responsive React app: routing, reusable components. Dev side — to better understand what I test.',
    gh_link2:       'View on GitHub',
    p3_badge:       'DELIVERED ✓',
    p3_desc:        'Test strategy for a banking app: requirements review, strategy, test cases and execution report.',
    p3_link:        'Download the test package (.zip)',
    cov_title:      'STACK & TOOLS',
    coffee:         'Coffee',
    contact_title:  'Open an "opportunity" ticket',
    cv_link:        'My resume',
    contact_btn:    'CREATE TICKET',
    footer:         'Designed and tested by Michael Belcastro — 0 known bugs (so far) · © 2026',
  },
};

const STORAGE_KEY = 'mb-portfolio-lang';
let currentLang = localStorage.getItem(STORAGE_KEY) || 'fr';

/** Applique la langue donnée à tous les éléments [data-i18n]. */
function applyLang(lang) {
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
  document.getElementById('lang-toggle').textContent = lang === 'fr' ? 'EN' : 'FR';
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem(STORAGE_KEY, currentLang);
  applyLang(currentLang);
});

applyLang(currentLang);

/* ------------------------------------------------------------
   Logo hexagonal : bascule automatique logo <-> photo
   ------------------------------------------------------------ */
const logoRotator = document.getElementById('logo-rotator');
if (logoRotator) {
  setInterval(() => {
    logoRotator.classList.toggle('is-flipped');
  }, 2600);
}

/* ------------------------------------------------------------
   Menu burger (mobile) : ouvre / ferme la navigation
   ------------------------------------------------------------ */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('nav--open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Referme le menu quand on clique sur un lien de navigation
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ------------------------------------------------------------
   Scrollspy : met en surbrillance le lien de nav de la section
   actuellement visible à l'écran
   ------------------------------------------------------------ */
const navLinks = document.querySelectorAll('.nav-item');
const trackedSections = document.querySelectorAll('main section[id]');

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle('nav-item--active', link.getAttribute('href') === `#${id}`);
  });
}

// Décalage depuis le haut de la fenêtre à partir duquel une section
// est considérée "active" (hauteur de la barre chrome + marge).
const SCROLL_OFFSET = 96;

function updateActiveSectionFromScroll() {
  let currentId = trackedSections[0] && trackedSections[0].id;
  trackedSections.forEach((section) => {
    if (section.getBoundingClientRect().top - SCROLL_OFFSET <= 0) {
      currentId = section.id;
    }
  });
  if (currentId) setActiveNav(currentId);
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateActiveSectionFromScroll();
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener('resize', updateActiveSectionFromScroll);
updateActiveSectionFromScroll();

// Retour immédiat au clic, avant que le scroll ne se termine
navLinks.forEach((link) => {
  link.addEventListener('click', () => setActiveNav(link.getAttribute('href').slice(1)));
});
