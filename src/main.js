import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const siteHeader = document.getElementById('site-header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const contactBtn = document.getElementById('contact-btn');
const mobileContactBtn = document.getElementById('mobile-contact-btn');
const contactModal = document.getElementById('contact-modal');
const modalClose = document.getElementById('modal-close');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const copyEmailBtn = document.getElementById('copy-email-btn');

const csDrawer = document.getElementById('cs-drawer');
const drawerClose = document.getElementById('drawer-close');
const drawerBodyContent = document.getElementById('drawer-body-content');

// Role Switcher Data for Experience Tabs
const roleDetailsMap = {
  lead: {
    bullets: [
      "Led end-to-end UX/UI and solutioning for enterprise SaaS and cloud platforms across web and mobile",
      "Partnered with sales and pre-sales to turn client requirements into concepts that supported live deal conversations",
      "Managed and mentored a team of 7 designers, raising quality and delivery consistency across projects",
      "Worked with product and engineering to simplify complex workflows into intuitive, user-centric experiences",
      "Delivered design across enterprise systems, audit platforms, healthcare solutions, and e-commerce"
    ],
    pills: ["Leadership", "Enterprise UX", "Pre-Sales", "Design Systems", "Cloud Platforms"]
  },
  ux: {
    bullets: [
      "Crafted interactive high-fidelity design prototypes and user journeys for cloud architecture builders",
      "Conducted usability testing with enterprise customers to identify workflow friction points",
      "Architected scalable design token libraries in Figma for multi-brand deployment"
    ],
    pills: ["Interaction Design", "Figma", "User Testing", "Information Architecture"]
  },
  pm: {
    bullets: [
      "Scoped design sprints, managed deliverables, and aligned client milestones across 4 simultaneous projects",
      "Streamlined developer handoffs using automated asset pipelines and documentation standards"
    ],
    pills: ["Agile Management", "Sprint Planning", "Stakeholder Alignment"]
  },
  designer: {
    bullets: [
      "Designed user-centric web and mobile applications, translating business requirements into intuitive flows",
      "Built wireframes, prototypes, and high-fidelity UI for cross-functional product teams",
      "Defined user flows and system interactions in close collaboration with engineering",
      "Improved developer handoff efficiency with structured, scalable design assets"
    ],
    pills: ["Wireframing", "Prototyping", "Handoff", "User Flows"]
  },
  'lead-ks': {
    bullets: [
      "Collaborated with product leads to establish initial component patterns for mobile apps",
      "Conducted competitor benchmarks for e-commerce platforms"
    ],
    pills: ["Mobile UI", "Benchmarking", "Component Specs"]
  }
};

// Case Study Deep-Dive Data for Drawer Modal
const caseStudyDetails = {
  1: {
    title: "Cloud Architecture Builder Platform",
    tag: "FEATURED CASE STUDY",
    summary: "Replaced a fragmented canvas with an intelligent, guided sequential intake flow that prevents configuration errors before deployment.",
    sections: [
      {
        heading: "The Challenge",
        body: "Enterprise cloud deployments required specialized DevOps knowledge. Non-expert engineers frequently configured misaligned security groups or subnet rules, leading to deployment failures."
      },
      {
        heading: "UX Strategy & Execution",
        body: "We mapped out 40+ cloud infrastructure primitives into high-level intent templates. Introduced real-time inline validation rules and step-by-step wizard architecture that reduces cognitive load by 60%."
      },
      {
        heading: "Measurable Impact",
        body: "35% faster architecture creation speed, 20% drop in user validation errors, and significantly reduced escalation to senior infrastructure leads."
      }
    ]
  },
  2: {
    title: "SaaS · AI Hiring - Matching Engine",
    tag: "SaaS · AI HIRING",
    summary: "Transformed manual resume screening into an AI-powered automated ranking dashboard with real-time feedback for applicants.",
    sections: [
      {
        heading: "The Challenge",
        body: "Recruiters spent 80% of their workday manually scanning hundreds of unvetted candidate submissions, causing severe bottlenecking and applicant drop-off."
      },
      {
        heading: "Solution Architecture",
        body: "Designed an intuitive recruiter dashboard featuring candidate score cards, skill overlay highlights, and instant feedback loops. Candidates receive immediate progress updates, preserving engagement."
      },
      {
        heading: "Key Results",
        body: "300% surge in post-redesign user retention and a 50% decrease in manual triage workload for internal HR teams."
      }
    ]
  },
  3: {
    title: "Enterprise · ESG Reporting Platform",
    tag: "ENTERPRISE · ESG REPORTING",
    summary: "Unified disparate Excel spreadsheets into a centralized, auto-validating ESG compliance reporting platform.",
    sections: [
      {
        heading: "The Problem Space",
        body: "Corporate ESG data lived across 15+ disconnected departmental spreadsheets. Manual data merges before annual audits resulted in audit risks and missing data."
      },
      {
        heading: "Design Intervention",
        body: "Created a guided digital intake pipeline with field-level audit trails, multi-user approval workflows, and automated report generation."
      },
      {
        heading: "Quantifiable Success",
        body: "70% reduction in manual spreadsheet consolidation time and 50% faster completion of submittable ESG reports."
      }
    ]
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initMobileMenu();
  initRoleSwitchers();
  initCaseStudyDrawer();
  initContactModal();
  initScrollAnimations();
  initWordSplitScrollAnimation();
  initStickyRoleStepper();
  initStackedCardReveal();
});

// Scroll Header Effects
function initScrollHeader() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Navigation
function initMobileMenu() {
  if (!mobileMenuBtn || !mobileDrawer) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('is-open');
    if (isOpen) {
      closeMobileDrawer();
    } else {
      openMobileDrawer();
    }
  });

  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });
}

function openMobileDrawer() {
  mobileDrawer.classList.add('is-open');
  mobileMenuBtn.classList.add('is-active');
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  mobileDrawer.classList.remove('is-open');
  mobileMenuBtn.classList.remove('is-active');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Role Switcher Tabs (Experience Section)
function initRoleSwitchers() {
  const roleTabs = document.querySelectorAll('.role-tab');
  
  roleTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const parentSwitcher = tab.closest('.role-switcher');
      const card = tab.closest('.experience-card');
      const roleKey = tab.dataset.role;

      // Update active tab state
      parentSwitcher.querySelectorAll('.role-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update card content if data exists
      if (roleDetailsMap[roleKey] && card) {
        const bulletList = card.querySelector('.bullet-list');
        const pillGroup = card.querySelector('.skills-pill-group');

        const details = roleDetailsMap[roleKey];

        // Animate out
        gsap.to([bulletList, pillGroup], {
          opacity: 0,
          y: -5,
          duration: 0.2,
          onComplete: () => {
            // Update Bullets
            bulletList.innerHTML = details.bullets
              .map(b => `<li><span class="bullet-dash">-</span> <span>${b}</span></li>`)
              .join('');

            // Update Pills
            pillGroup.innerHTML = details.pills
              .map(p => `<span class="skill-pill">${p}</span>`)
              .join('');

            // Animate in
            gsap.to([bulletList, pillGroup], {
              opacity: 1,
              y: 0,
              duration: 0.3
            });
          }
        });
      }
    });
  });
}

// Case Study Detail Drawer
function initCaseStudyDrawer() {
  const csButtons = document.querySelectorAll('.btn-case-study');

  csButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const csId = btn.dataset.cs;
      const data = caseStudyDetails[csId];
      if (!data) return;

      drawerBodyContent.innerHTML = `
        <div class="modal-header">
          <span class="eyebrow-tag">— ${data.tag}</span>
          <h2 class="modal-title">${data.title}</h2>
          <p class="modal-subtitle">${data.summary}</p>
        </div>
        <div class="divider-line subtle"></div>
        <div class="drawer-sections">
          ${data.sections.map(s => `
            <div class="cs-block" style="margin-bottom: 24px;">
              <h4 class="cs-block-label" style="color: #FFFFFF;">${s.heading}</h4>
              <p class="cs-block-text">${s.body}</p>
            </div>
          `).join('')}
        </div>
        <div style="margin-top: 32px;">
          <button type="button" class="btn-contact" onclick="document.getElementById('cs-drawer').classList.remove('is-visible'); document.getElementById('contact-modal').classList.add('is-visible');">Request Full Case Study Deck</button>
        </div>
      `;

      csDrawer.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    });
  });

  drawerClose.addEventListener('click', () => {
    csDrawer.classList.remove('is-visible');
    document.body.style.overflow = '';
  });

  csDrawer.addEventListener('click', (e) => {
    if (e.target === csDrawer) {
      csDrawer.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  });
}

// Contact Modal Functionality
function initContactModal() {
  const openModal = () => {
    contactModal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    closeMobileDrawer();
  };

  const closeModal = () => {
    contactModal.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  if (contactBtn) contactBtn.addEventListener('click', openModal);
  if (mobileContactBtn) mobileContactBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeModal();
    });
  }

  // Copy Email Trigger
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('narendren.k@gmail.com');
      const originalText = copyEmailBtn.innerText;
      copyEmailBtn.innerText = 'Copied to clipboard!';
      setTimeout(() => {
        copyEmailBtn.innerText = originalText;
      }, 2000);
    });
  }

  // Handle Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.innerText = 'Sending message...';
      formStatus.style.color = '#FFFFFF';

      setTimeout(() => {
        formStatus.innerText = 'Thank you! Your message has been sent successfully. Narendren will get back to you shortly.';
        formStatus.style.color = '#4ADE80'; // soft green
        contactForm.reset();

        setTimeout(() => {
          closeModal();
          formStatus.innerText = '';
        }, 3500);
      }, 1000);
    });
  }
}

// Scroll Reveals via GSAP ScrollTrigger (opacity 0->1, y 30->0, duration 0.8s, trigger 'top 80%')
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.gsap-reveal');

  revealElements.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true
        }
      }
    );
  });
}

// Scroll-Scrubbed Word-Stacking Animation (Continuous Smooth Scroll Reveal from Content to Image Section)
function initWordSplitScrollAnimation() {
  const statement = document.getElementById('about-statement-text');
  const quoteBox = statement ? statement.parentElement : null;
  if (!statement || !quoteBox) return;

  // Split paragraph into individual word spans while preserving flex-wrap layout
  const originalText = statement.innerText.trim();
  const words = originalText.split(/\s+/);

  statement.innerHTML = words
    .map((word, i) => `<span class="split-word" data-index="${i}">${word}</span>`)
    .join(' ');

  const wordSpans = statement.querySelectorAll('.split-word');

  // Continuous ScrollTrigger scrub timeline: Words reveal & align naturally as you scroll down
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: quoteBox,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.4
    }
  });

  tl.fromTo(
    wordSpans,
    {
      opacity: 0, /* Invisible before scroll */
      x: (index) => Math.max(window.innerWidth * 0.5, 450) + (index % 6) * 20 /* Starts outside screen right */
    },
    {
      opacity: 1, /* Reveals & aligns as you scroll naturally */
      x: 0,
      stagger: 0.03,
      ease: 'none'
    }
  );
}

// Sticky Stepper Role Switcher Data & Controller
const expStateData = [
  {
    title: "Team Lead",
    date: "April 2023 - Present",
    company: "Pirai Infotech, Coimbatore",
    bullets: [
      "Led end-to-end UX/UI and solutioning for enterprise SaaS and cloud platforms across web and mobile",
      "Partnered with sales and pre-sales to turn client requirements into concepts that supported live deal conversations",
      "Managed and mentored a team of 7 designers, raising quality and delivery consistency across projects",
      "Worked with product and engineering to simplify complex workflows into intuitive, user-centric experiences",
      "Delivered design across enterprise systems, audit platforms, healthcare solutions, and e-commerce"
    ],
    tags: ["LEADERSHIP", "ENTERPRISE UX", "PRE-SALES", "DESIGN SYSTEMS"],
    subRoles: ["UX/UI Specialist", "Team Contributor"]
  },
  {
    title: "UX UI Designer",
    date: "Jan 2022 - Jan 2023",
    company: "KS Smart Solutions Pvt Ltd, Chennai",
    bullets: [
      "Designed user-centric web and mobile applications, translating business requirements into intuitive flows",
      "Built wireframes, prototypes, and high-fidelity UI for cross-functional product teams",
      "Defined user flows and system interactions in close collaboration with engineering",
      "Improved developer handoff efficiency with structured, scalable design assets",
      "Delivered design across enterprise systems, audit platforms, healthcare solutions, and e-commerce"
    ],
    tags: ["WIREFRAMING", "PROTOTYPING", "HANDOFF"],
    subRoles: ["UX/UI Specialist", "Product UI Designer"]
  },
  {
    title: "Project Manager",
    date: "June 2021 - Jan 2020",
    company: "KS Smart Solutions Pvt Ltd, Chennai",
    bullets: [
      "Designed user-centric web and mobile applications, translating business requirements into intuitive flows",
      "Built wireframes, prototypes, and high-fidelity UI for cross-functional product teams",
      "Defined user flows and system interactions in close collaboration with engineering",
      "Improved developer handoff efficiency with structured, scalable design assets",
      "Delivered design across enterprise systems, audit platforms, healthcare solutions, and e-commerce"
    ],
    tags: ["PROJECT MANAGEMENT", "AGILE", "SCRUM"],
    subRoles: ["Project Lead", "Sprint Coordinator"]
  }
];

function initStickyRoleStepper() {
  const stepperSection = document.getElementById('experience');
  const roleStackTrack = document.getElementById('role-stack-track');
  const roleButtons = document.querySelectorAll('.role-stack-btn');
  const dateReelTrack = document.getElementById('date-reel-track');
  const companyEl = document.getElementById('stepper-company');
  const bulletsEl = document.getElementById('stepper-bullets');
  const tagsEl = document.getElementById('stepper-tags');
  const subrolesEl = document.getElementById('stepper-subroles');
  const contentBox = document.getElementById('stepper-content-box');

  if (!stepperSection || !contentBox || !roleButtons.length) return;

  let currentActiveIndex = -1;

  function updateActiveRole(newIndex) {
    if (newIndex === currentActiveIndex) return;
    currentActiveIndex = newIndex;

    const data = expStateData[newIndex];
    if (!data) return;

    // 1. Scroll title reel track with slot machine odometer spin (88px step)
    if (roleStackTrack) {
      gsap.to(roleStackTrack, {
        y: -newIndex * 88,
        duration: 0.65,
        ease: 'back.out(1.5)' // Slot machine counter reel spin & snap!
      });
    }

    // 2. Update title stack active/dimmed states
    roleButtons.forEach((btn, idx) => {
      btn.classList.remove('role-active', 'role-dim-mid', 'role-dim-low');
      if (idx === newIndex) {
        btn.classList.add('role-active');
      } else {
        const distance = Math.abs(idx - newIndex);
        if (distance === 1) {
          btn.classList.add('role-dim-mid');
        } else {
          btn.classList.add('role-dim-low');
        }
      }
    });

    // 3. Animate Date Range Reel with matching slot machine odometer spin (88px step)
    if (dateReelTrack) {
      gsap.to(dateReelTrack, {
        y: -newIndex * 88, // Exact matching 88px step as role titles!
        duration: 0.65,
        ease: 'back.out(1.5)' // Slot machine counter reel spin & snap!
      });
    }

    // 4. Update left column content box instantly (no delayed onComplete that traps opacity at 0)
    if (companyEl) companyEl.innerText = data.company;
    if (bulletsEl) {
      bulletsEl.innerHTML = data.bullets
        .map(b => `<li><span class="bullet-dash">–</span> <span>${b}</span></li>`)
        .join('');
    }
    if (tagsEl) {
      tagsEl.innerHTML = data.tags
        .map(t => `<span class="rectangular-chip">${t}</span>`)
        .join('');
    }

    // Quick, solid pulse transition that cannot get stuck or go dark
    gsap.fromTo(contentBox,
      { opacity: 0.75, y: 3 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' }
    );
  }

  // Force initial update to role 0 (Team Lead / April 2023 - Present)
  updateActiveRole(0);

  // Allow clicking roles directly
  roleButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => updateActiveRole(idx));
  });

  // Single ScrollTrigger instance (pinSpacing true prevents layout jumps, end +=250% for fluid 3-role stepper)
  const trigger = ScrollTrigger.create({
    trigger: stepperSection,
    start: 'top top',
    end: '+=250%',
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    refreshPriority: 1,
    invalidateOnRefresh: true,
    onEnter: () => updateActiveRole(0),
    onEnterBack: () => updateActiveRole(2),
    onUpdate: (self) => {
      // Divide progress into 3 equal 33.3% scroll segments (Role 0, Role 1, Role 2)
      const segmentIndex = Math.min(2, Math.max(0, Math.floor(self.progress * 2.999)));
      updateActiveRole(segmentIndex);
    }
  });

  // Return cleanup handle for unmount
  return () => {
    if (trigger) trigger.kill();
  };
}

// Full-Viewport Brand Transition Section (Parallax Split Reveal with Navbar Logo SVG)
function initBrandTransitionWipe() {
  const section = document.getElementById('brand-transition');
  const blackBg = document.getElementById('brand-bg-black');
  const whiteBg = document.getElementById('brand-bg-white');
  const topPane = document.getElementById('brand-pane-top');
  const svgMarks = document.querySelectorAll('.brand-n-svg');

  if (!section || !blackBg || !whiteBg) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  });

  // Layer 1: Top Black Background & Top Pane Clip Path shift (drifts boundary smoothly across scroll)
  tl.fromTo([blackBg, topPane],
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 32%, 0% 36%)' },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 64%, 0% 68%)', ease: 'none' },
    0
  );

  // Layer 2: Bottom White Background subtle opposite vertical drift
  tl.fromTo(whiteBg,
    { yPercent: 6 },
    { yPercent: -6, ease: 'none' },
    0
  );

  // Layer 3: 'N' Logo Mark SVG 3rd distinct parallax rate & scale depth
  tl.fromTo(svgMarks,
    { yPercent: -4, scale: 1.12 },
    { yPercent: 4, scale: 1.22, ease: 'none' },
    0
  );

  // Cleanup handle on unmount / refresh
  return () => {
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    tl.kill();
  };
}

// Pinned, Stacked 3D Paper-Fold Receding Card-Reveal Controller (Exact Reference Motion)
function initStackedCardReveal() {
  const section = document.getElementById('projects');
  const cards = document.querySelectorAll('#projects .case-study-card');

  if (!section || cards.length < 2) return;

  // Set initial stacked Z-Index & 3D Positions
  // Card 01: zIndex 1, yPercent 0
  // Card 02: zIndex 2, yPercent 100
  // Card 03: zIndex 3, yPercent 100
  cards.forEach((card, idx) => {
    gsap.set(card, {
      zIndex: idx + 1,
      yPercent: idx === 0 ? 0 : 100,
      scale: 1,
      rotationX: 0,
      opacity: 1,
      transformOrigin: 'center top',
      transformPerspective: 1200
    });
  });

  const numTransitions = cards.length - 1; // 2 transitions for 3 cards
  const holdDuration = 1.0; // 1 full viewport length of scroll hold on Card 03 before unpinning into Toolkit
  const totalScrollDistance = numTransitions + holdDuration; // 3.0 total units (300% scroll distance)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${totalScrollDistance * 100}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      refreshPriority: 1
    }
  });

  // Loop over transitions
  for (let i = 0; i < numTransitions; i++) {
    const outgoingCard = cards[i];
    const incomingCard = cards[i + 1];

    // Incoming card slides up flat from bottom (yPercent 100 -> 0)
    tl.to(incomingCard, {
      yPercent: 0,
      ease: 'none'
    }, i);

    // Outgoing card tilts backward in 3D (rotationX 0 -> -14deg), scales down (1 -> 0.92), and shifts up (-6%)
    // so its top title header strip stays peeking above the incoming card at a receding tilt!
    tl.to(outgoingCard, {
      scale: 0.92,
      rotationX: -14,
      yPercent: -6,
      ease: 'none'
    }, i);
  }

  // Hold Card 03 in full view for 1 unit of scroll hold before unpinning into Toolkit
  tl.to(cards[cards.length - 1], {
    yPercent: 0,
    duration: holdDuration,
    ease: 'none'
  }, numTransitions);

  // Return cleanup handle on unmount / refresh
  return () => {
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    tl.kill();
  };
}

import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// Three.js Interactive 3D Extruded 'N' Logo Mark with Cursor Drag Controls
function initThreeBrandN() {
  const container = document.getElementById('three-n-container');
  if (!container) return;

  container.innerHTML = '';

  const width = container.clientWidth || 240;
  const height = container.clientHeight || 240;

  // 3D Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 210);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lights for sleek 3D metallic shading
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
  dirLight1.position.set(120, 120, 180);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight2.position.set(-120, -80, -120);
  scene.add(dirLight2);

  // SVG Path Data for N Brand Mark
  const svgPathData = `M93.9004 106C88.112 106 84.0387 104.389 81.6805 101.167C79.3223 97.7305 78.1432 93.5421 78.1432 88.6018C78.1432 76.1439 82.4308 62.8267 91.0062 48.6505L111.587 15.1429C97.009 25.8825 82.538 39.307 68.1743 55.4164C64.3154 59.7123 59.9205 64.7599 54.9896 70.5593C50.2732 76.3587 45.0207 83.0172 39.2324 90.535C31.5145 100.63 26.9053 105.678 25.4046 105.678C22.4032 105.678 19.9378 104.389 18.0083 101.812C16.0788 99.0192 15.1141 96.5491 15.1141 94.4012C15.1141 92.6829 15.6501 89.5684 16.722 85.0578C17.7939 80.3323 19.0802 76.2513 20.5809 72.8146C22.0816 69.1631 23.5823 65.619 25.083 62.1824C26.7981 58.5309 28.4059 54.9868 29.9066 51.5502L10.612 71.848C10.1833 72.2776 8.89696 73.5664 6.75311 75.7143C4.60927 77.8622 2.89419 78.9362 1.60788 78.9362C0.535961 78.9362 0 78.1844 0 76.6809C0 76.2513 0.214385 75.7143 0.643154 75.0699C0.857538 74.2107 1.50069 73.2442 2.57261 72.1702C5.78838 68.9483 9.11134 65.5117 12.5415 61.8602C15.9716 58.2087 19.509 54.0203 23.1535 49.2948C25.083 46.9321 27.9772 43.388 31.8361 38.6626C35.695 33.7224 39.8755 28.46 44.3776 22.8754C49.0941 17.2908 53.4889 12.1358 57.5622 7.41033C58.6342 5.90679 59.8133 4.94022 61.0996 4.51064C62.3859 3.86626 63.2434 3.54408 63.6722 3.54408C69.4606 3.54408 72.3548 5.79939 72.3548 10.31C72.3548 11.5988 72.0332 12.8875 71.39 14.1763C52.0954 40.8105 40.5187 61.1084 36.6598 75.0699C61.5284 50.154 81.4661 31.4671 96.473 19.0091C111.694 6.33637 122.521 0 128.952 0C132.382 0 134.955 0.53698 136.67 1.61094C138.6 2.68491 139.564 4.72544 139.564 7.73253C139.564 8.80649 139.457 9.66566 139.243 10.31C138.6 11.8136 134.205 17.8278 126.058 28.3526C121.127 34.3668 116.732 39.844 112.873 44.7842C109.229 49.7244 106.228 54.0203 103.869 57.6717C100.01 63.6859 97.1162 69.3779 95.1867 74.7477C93.2573 79.9027 92.2925 84.306 92.2925 87.9575C92.2925 89.461 92.5069 91.2867 93.9357 93.4347C93.3644 95.5826 94.6508 96.6565 96.7946 96.6565C101.725 96.6565 109.443 92.3607 119.948 83.769C124.879 79.4732 129.488 75.1773 133.776 70.8815C138.064 66.3708 142.137 61.9676 145.996 57.6717C146.853 56.8126 148.247 55.2016 150.176 52.8389C152.106 50.2614 153.285 48.9726 153.714 48.9726C154.571 48.9726 155 49.8318 155 51.5502C155 52.4093 154.464 53.9129 153.392 56.0608C152.535 57.9939 151.57 59.4975 150.498 60.5714C148.14 63.3637 144.602 67.23 139.886 72.1702C135.384 77.1104 130.239 82.1581 124.45 87.3131C118.876 92.4681 113.409 96.8713 108.05 100.523C102.69 104.174 97.9737 106 93.9004 106Z`;

  const loader = new SVGLoader();
  const svgData = loader.parse(`<svg><path d="${svgPathData}"/></svg>`);

  const group = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.35,
    roughness: 0.15,
    side: THREE.DoubleSide
  });

  const extrudeSettings = {
    depth: 8,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 2,
    bevelSize: 1.5,
    bevelThickness: 1.5
  };

  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);
    shapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    });
  });

  // Scale and invert Y because SVGs operate inverted in WebGL
  group.scale.set(0.9, -0.9, 0.9);
  group.rotation.x = Math.PI * 0.05;
  scene.add(group);

  // Drag Controller for Cursor Rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let velocityY = 0.008; // Ambient 3D spin speed
  let velocityX = 0;

  const domElement = renderer.domElement;
  domElement.style.cursor = 'grab';

  const onPointerDown = (e) => {
    isDragging = true;
    domElement.style.cursor = 'grabbing';
    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    velocityY = deltaX * 0.012;
    velocityX = deltaY * 0.012;

    group.rotation.y += velocityY;
    group.rotation.x += velocityX;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    isDragging = false;
    domElement.style.cursor = 'grab';
  };

  domElement.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  // Touch Support for mobile
  domElement.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    velocityY = deltaX * 0.012;
    velocityX = deltaY * 0.012;

    group.rotation.y += velocityY;
    group.rotation.x += velocityX;

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Render animation loop
  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      // Continuous smooth 3D spinning
      group.rotation.y += velocityY;
      group.rotation.x += velocityX;

      // Smooth friction deceleration back to idle rotation speed
      velocityY *= 0.97;
      velocityX *= 0.97;

      if (Math.abs(velocityY) < 0.007) {
        velocityY = 0.007;
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    const newW = container.clientWidth || 240;
    const newH = container.clientHeight || 240;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

// Full-Screen White Preloader (Chunky Geometric Stepped 'N' Reveal + Bottom-Left Counter)
function initAppPreloader() {
  const preloader = document.getElementById('app-preloader');
  const counterEl = document.getElementById('preloader-counter-num');
  const segments = document.querySelectorAll('.n-seg-path');
  const clipRects = document.querySelectorAll('.block-seg-rect');

  if (!preloader) return;

  // Session Storage Check: Only show on initial app load in session
  const hasLoaded = sessionStorage.getItem('naren_portfolio_preloader_seen');
  if (hasLoaded === 'true') {
    preloader.classList.add('is-hidden');
    return;
  }

  // Lock scrolling during preloader playback
  document.body.style.overflow = 'hidden';

  // Set initial hidden states for chunky blocky reveal
  gsap.set(clipRects, { scaleX: 0, scaleY: 0, opacity: 0, transformOrigin: 'center center' });
  gsap.set(segments, { opacity: 0 });

  const logoWrap = document.querySelector('.preloader-logo-wrap');
  const counterWrap = document.querySelector('.preloader-counter-wrap');
  const blackCurtain = document.querySelector('.preloader-black-curtain');

  const mainTl = gsap.timeline({
    onComplete: () => {
      // 1. Fade out bottom-left counter numerals quickly
      if (counterWrap) {
        gsap.to(counterWrap, { opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
      }

      // 2. Animate preloader background into solid dark black (#0A0A0A) - ZERO WHITE LEAKING!
      if (blackCurtain) {
        gsap.to(blackCurtain, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut'
        });
      }

      // 3. Enlarge black 'N' logo mark from its solid black stroke stem (28% 62%) to fill the screen in black - ZERO BLUR!
      if (logoWrap) {
        gsap.to(logoWrap, {
          scale: 90,
          duration: 0.85,
          ease: 'expo.inOut',
          transformOrigin: '28% 62%',
          onComplete: () => {
            // Unmount preloader overlay & reveal dark hero section underneath
            preloader.classList.add('is-hidden');
            document.body.style.overflow = '';
            sessionStorage.setItem('naren_portfolio_preloader_seen', 'true');
            ScrollTrigger.refresh();
          }
        });
      } else {
        preloader.classList.add('is-hidden');
        document.body.style.overflow = '';
        sessionStorage.setItem('naren_portfolio_preloader_seen', 'true');
        ScrollTrigger.refresh();
      }
    }
  });

  // 1. Chunky, stepped, geometric segment assembly of the 'N' mark
  const blockTl = gsap.timeline();
  clipRects.forEach((rect, i) => {
    const segPath = segments[i];
    blockTl.to(rect, {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      duration: 0.18,
      ease: 'steps(3)' // Geometric pixel-block style assembly!
    }, i * 0.1);

    if (segPath) {
      blockTl.to(segPath, {
        opacity: 1,
        duration: 0.12,
        ease: 'power1.out'
      }, i * 0.1);
    }
  });

  mainTl.add(blockTl, 0.1);

  // 2. Count-up from 0 to 100 in sync over ~1.5s using GSAP numeric snap
  const counterObj = { val: 0 };
  mainTl.to(counterObj, {
    val: 100,
    duration: 1.5,
    ease: 'power2.inOut',
    snap: { val: 1 },
    onUpdate: () => {
      if (counterEl) counterEl.textContent = Math.round(counterObj.val);
    }
  }, 0);

  // Hold at 100% briefly before exit wipe
  mainTl.to({}, { duration: 0.25 });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initAppPreloader();
  initMobileMenu();
  initContactModal();
  initRoleSwitchers();
  initScrollAnimations();
  initWordSplitScrollAnimation();
  initStickyRoleStepper();
  initStackedCaseStudies3DPaperFold();
  initBrandTransitionWipe();
  initThreeBrandN();

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

// Also refresh ScrollTrigger on full window load (after image assets load)
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});


