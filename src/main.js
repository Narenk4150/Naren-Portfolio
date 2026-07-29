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





// Interactive Work History Controller matching 42%/58% Reference Layout (No Mockup)
function initWorkHistoryReferenceScroller() {
  const section = document.getElementById('experience');
  const buttons = document.querySelectorAll('.role-title-nav-btn');
  const track = document.getElementById('exp-role-stack-track');
  const infoTable = document.getElementById('exp-info-table');
  const overviewVal = document.getElementById('exp-overview-val');
  const tagsVal = document.getElementById('exp-tags-val');
  const industryVal = document.getElementById('exp-industry-val');
  const clientVal = document.getElementById('exp-client-val');
  const periodText = document.getElementById('exp-period-text');

  if (!section || !buttons.length) return;

  const workHistoryData = [
    {
      role: "TEAM LEAD",
      period: "Apr 2023 — Present",
      overview: "Led end-to-end UX/UI and solutioning for enterprise SaaS and cloud platforms across web and mobile. Partnered with sales and pre-sales to turn client requirements into concepts that supported live deal conversations. Managed and mentored a team of 7 designers, raising quality and delivery consistency across projects. Worked with product and engineering to simplify complex workflows into intuitive, user-centered experiences. Delivered design across enterprise systems, audit platforms, healthcare solutions, and e-commerce.",
      tags: ["Leadership", "Enterprise UX", "Pre-Sales", "Design Systems"],
      industry: "Enterprise SaaS, Cloud Platforms, Healthcare, E-commerce",
      client: "Pirai Infotech, Coimbatore"
    },
    {
      role: "UX UI DESIGNER",
      period: "Jan 2022 — Jan 2023",
      overview: "Designed user-centric web and mobile applications, translating business requirements into intuitive flows. Built wireframes, prototypes, and high-fidelity UI for cross-functional product teams. Defined user flows and system interactions in close collaboration with engineering. Improved developer handoff efficiency with structured, scalable design assets. Delivered design across enterprise systems, audit platforms, healthcare solutions, and e-commerce.",
      tags: ["Wireframing", "Prototyping", "Handoff"],
      industry: "Web and Mobile Applications, Enterprise Software",
      client: "KS Smart Solutions Pvt Ltd, Chennai"
    },
    {
      role: "PROJECT MANAGER",
      period: "June 2021 — Jan 2020",
      overview: "Designed user-centric web and mobile applications, translating business requirements into intuitive flows. Built wireframes, prototypes, and high-fidelity UI for cross-functional product teams. Defined user flows and system interactions in close collaboration with engineering. Improved developer handoff efficiency with structured, scalable design assets. Delivered design across enterprise systems, audit platforms, healthcare solutions, and e-commerce.",
      tags: ["Wireframing", "Prototyping", "Handoff"],
      industry: "Web and Mobile Applications, Enterprise Software",
      client: "KS Smart Solutions Pvt Ltd, Chennai"
    }
  ];

  let currentIndex = -1;

  function updateActiveRole(targetIndex, force = false) {
    if (!force && targetIndex === currentIndex) return;
    currentIndex = targetIndex;

    const data = workHistoryData[targetIndex];
    if (!data) return;

    // 1. Highlight states: active pure white & bold, preceding soft gray gradient, succeeding dark dissolve gradient
    buttons.forEach((btn, idx) => {
      btn.classList.remove('active', 'inactive', 'prev-role', 'next-role', 'far-role');
      if (idx === targetIndex) {
        btn.classList.add('active');
      } else if (idx === targetIndex - 1) {
        btn.classList.add('prev-role');
      } else if (idx === targetIndex + 1) {
        btn.classList.add('next-role');
      } else {
        btn.classList.add('far-role');
      }
    });

    // 2. Right-side role stack shifts vertically so active title aligns with period label
    if (track && track.parentElement) {
      const activeBtn = buttons[targetIndex];
      if (activeBtn) {
        const btnCenter = activeBtn.offsetTop + (activeBtn.offsetHeight / 2);
        const viewportCenter = track.parentElement.offsetHeight / 2;
        const targetY = viewportCenter - btnCenter;
        gsap.to(track, { y: targetY, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
      }
    }

    // 3. Metadata table cross-fades with 20px upward slide
    if (infoTable) {
      gsap.to(infoTable, {
        opacity: 0,
        y: 20,
        duration: 0.18,
        onComplete: () => {
          if (overviewVal) overviewVal.innerText = data.overview;
          if (tagsVal) {
            tagsVal.innerHTML = data.tags
              .map(t => `<span class="rectangular-chip">${t}</span>`)
              .join('');
          }
          if (industryVal) industryVal.innerText = data.industry;
          if (clientVal) clientVal.innerText = data.client;
          gsap.to(infoTable, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        }
      });
    }

    // 4. Center period date cross-fades and updates
    if (periodText) {
      gsap.to(periodText, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          periodText.innerText = data.period;
          gsap.to(periodText, { opacity: 1, duration: 0.25 });
        }
      });
    }
  }

  // Set initial state to TEAM LEAD (index 0)
  setTimeout(() => updateActiveRole(0, true), 50);

  // GSAP ScrollTrigger pinning & scroll-driven step sequence
  const numRoles = workHistoryData.length;
  let trigger = null;

  trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: `+=${numRoles * 75}%`,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    refreshPriority: 1,
    onUpdate: (self) => {
      const step = Math.min(numRoles - 1, Math.max(0, Math.floor(self.progress * (numRoles - 0.001))));
      updateActiveRole(step);
    }
  });

  // Direct click navigation on role title buttons
  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      updateActiveRole(idx);
      if (trigger && trigger.start) {
        const start = trigger.start;
        const total = trigger.end - trigger.start;
        const targetScroll = start + (total * (idx / (numRoles - 1)));
        gsap.to(window, { scrollTo: targetScroll, duration: 0.6, ease: 'power2.out' });
      }
    });
  });

  return () => {
    if (trigger) trigger.kill();
  };
}

import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// Three.js Interactive 3D Extruded 'N' Logo Mark with Cursor Drag Controls
function initThreeBrandN() {
  const container = document.getElementById('three-n-container');
  if (!container) return;

  container.innerHTML = '';

  let width = Math.max(container.clientWidth || 0, 320);
  let height = Math.max(container.clientHeight || 0, 320);

  // 3D Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 140);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // ResizeObserver for dynamic responsiveness
  const resizeObserver = new ResizeObserver(() => {
    const w = Math.max(container.clientWidth || 0, 320);
    const h = Math.max(container.clientHeight || 0, 320);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  resizeObserver.observe(container);

  // Lights for sleek 3D liquid glass reflections & icy-blue refraction
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
  keyLight.position.set(100, 150, 200);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x00E5FF, 3.5);
  fillLight.position.set(-150, -100, -100);
  scene.add(fillLight);

  const frontHighlight = new THREE.PointLight(0xffffff, 3.0, 400);
  frontHighlight.position.set(0, 50, 150);
  scene.add(frontHighlight);

  // SVG Path Data for N Brand Mark
  const svgPathData = `M93.9004 106C88.112 106 84.0387 104.389 81.6805 101.167C79.3223 97.7305 78.1432 93.5421 78.1432 88.6018C78.1432 76.1439 82.4308 62.8267 91.0062 48.6505L111.587 15.1429C97.009 25.8825 82.538 39.307 68.1743 55.4164C64.3154 59.7123 59.9205 64.7599 54.9896 70.5593C50.2732 76.3587 45.0207 83.0172 39.2324 90.535C31.5145 100.63 26.9053 105.678 25.4046 105.678C22.4032 105.678 19.9378 104.389 18.0083 101.812C16.0788 99.0192 15.1141 96.5491 15.1141 94.4012C15.1141 92.6829 15.6501 89.5684 16.722 85.0578C17.7939 80.3323 19.0802 76.2513 20.5809 72.8146C22.0816 69.1631 23.5823 65.619 25.083 62.1824C26.7981 58.5309 28.4059 54.9868 29.9066 51.5502L10.612 71.848C10.1833 72.2776 8.89696 73.5664 6.75311 75.7143C4.60927 77.8622 2.89419 78.9362 1.60788 78.9362C0.535961 78.9362 0 78.1844 0 76.6809C0 76.2513 0.214385 75.7143 0.643154 75.0699C0.857538 74.2107 1.50069 73.2442 2.57261 72.1702C5.78838 68.9483 9.11134 65.5117 12.5415 61.8602C15.9716 58.2087 19.509 54.0203 23.1535 49.2948C25.083 46.9321 27.9772 43.388 31.8361 38.6626C35.695 33.7224 39.8755 28.46 44.3776 22.8754C49.0941 17.2908 53.4889 12.1358 57.5622 7.41033C58.6342 5.90679 59.8133 4.94022 61.0996 4.51064C62.3859 3.86626 63.2434 3.54408 63.6722 3.54408C69.4606 3.54408 72.3548 5.79939 72.3548 10.31C72.3548 11.5988 72.0332 12.8875 71.39 14.1763C52.0954 40.8105 40.5187 61.1084 36.6598 75.0699C61.5284 50.154 81.4661 31.4671 96.473 19.0091C111.694 6.33637 122.521 0 128.952 0C132.382 0 134.955 0.53698 136.67 1.61094C138.6 2.68491 139.564 4.72544 139.564 7.73253C139.564 8.80649 139.457 9.66566 139.243 10.31C138.6 11.8136 134.205 17.8278 126.058 28.3526C121.127 34.3668 116.732 39.844 112.873 44.7842C109.229 49.7244 106.228 54.0203 103.869 57.6717C100.01 63.6859 97.1162 69.3779 95.1867 74.7477C93.2573 79.9027 92.2925 84.306 92.2925 87.9575C92.2925 89.461 92.5069 91.2867 93.9357 93.4347C93.3644 95.5826 94.6508 96.6565 96.7946 96.6565C101.725 96.6565 109.443 92.3607 119.948 83.769C124.879 79.4732 129.488 75.1773 133.776 70.8815C138.064 66.3708 142.137 61.9676 145.996 57.6717C146.853 56.8126 148.247 55.2016 150.176 52.8389C152.106 50.2614 153.285 48.9726 153.714 48.9726C154.571 48.9726 155 49.8318 155 51.5502C155 52.4093 154.464 53.9129 153.392 56.0608C152.535 57.9939 151.57 59.4975 150.498 60.5714C148.14 63.3637 144.602 67.23 139.886 72.1702C135.384 77.1104 130.239 82.1581 124.45 87.3131C118.876 92.4681 113.409 96.8713 108.05 100.523C102.69 104.174 97.9737 106 93.9004 106Z`;

  const loader = new SVGLoader();
  const svgData = loader.parse(`<svg><path d="${svgPathData}"/></svg>`);

  const group = new THREE.Group();

  // Dual-color 3D materials: Pure White Front + Vivid Cyan 3D Sides (Lighting-Proof & 100% Visible)
  const frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.DoubleSide });

  // Smooth, thick 3D extrusion settings for bold physical 'N' shape geometry
  const extrudeSettings = {
    depth: 22,
    bevelEnabled: true,
    bevelSegments: 12,
    steps: 4,
    bevelSize: 4.5,
    bevelThickness: 4.5,
    curveSegments: 24
  };

  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);
    shapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      const mesh = new THREE.Mesh(geometry, [frontMaterial, sideMaterial]);
      group.add(mesh);
    });
  });

  // Scale and center 3D N geometry
  group.scale.set(1.35, -1.35, 1.35);
  group.rotation.x = Math.PI * 0.05;
  scene.add(group);

  // Drag Controller for Cursor Rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let velocityY = 0.005; // Slow continuous 360-degree ambient rotation speed
  let velocityX = 0;

  const domElement = renderer.domElement;
  domElement.style.cursor = 'grab';

  let mouseTargetX = 0;
  let mouseTargetY = 0;

  const onPointerDown = (e) => {
    isDragging = true;
    domElement.style.cursor = 'grabbing';
    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    const rect = domElement.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseTargetX = mouseX * 0.8;
    mouseTargetY = mouseY * 0.8;

    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    velocityY = deltaX * 0.01;
    velocityX = deltaY * 0.01;

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

  // Slow continuous 360-degree rotation animation loop with smooth floating motion
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    if (!isDragging) {
      // Continuous smooth 360 rotation & gentle organic float
      group.rotation.y += velocityY;
      group.rotation.x += (mouseTargetY - group.rotation.x) * 0.05 + velocityX;

      group.position.y = Math.sin(elapsedTime * 1.2) * 2.5;

      // Smooth friction deceleration back to base 360 rotation speed
      velocityY *= 0.97;
      velocityX *= 0.95;

      if (Math.abs(velocityY) < 0.005) {
        velocityY = 0.005;
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

  // Make sure preloader is visible and pointer events active
  preloader.classList.remove('is-hidden');

  // Lock scrolling during preloader playback
  document.body.style.overflow = 'hidden';

  // Set initial hidden states for chunky blocky reveal
  gsap.set(clipRects, { scaleX: 0, scaleY: 0, opacity: 0, transformOrigin: 'center center' });
  gsap.set(segments, { opacity: 0 });

  const logoWrap = document.querySelector('.preloader-logo-wrap');
  const counterWrap = document.querySelector('.preloader-counter-wrap');
  const blackCurtain = document.querySelector('.preloader-black-curtain');
  const reelHundreds = document.getElementById('reel-hundreds');
  const reelTens = document.getElementById('reel-tens');
  const reelUnits = document.getElementById('reel-units');

  if (counterWrap) {
    gsap.set(counterWrap, { opacity: 1, y: 0 });
  }

  function setOdometerValue(val) {
    const clamped = Math.min(100, Math.max(0, Math.round(val)));
    const h = Math.floor(clamped / 100);
    const t = Math.floor((clamped % 100) / 10);
    const u = clamped % 10;

    // Spin 3 vertical digit reels mechanically!
    if (reelHundreds) gsap.to(reelHundreds, { yPercent: -h * 50, duration: 0.25, ease: 'power1.out', overwrite: 'auto' });
    if (reelTens) gsap.to(reelTens, { yPercent: -t * 10, duration: 0.18, ease: 'power1.out', overwrite: 'auto' });
    if (reelUnits) gsap.to(reelUnits, { yPercent: -u * 10, duration: 0.12, ease: 'power1.out', overwrite: 'auto' });
  }

  // Force initial 000 state
  setOdometerValue(0);

  const mainTl = gsap.timeline({
    onComplete: () => {
      // 1. Fade out bottom-left counter digits quickly
      if (counterWrap) {
        gsap.to(counterWrap, { opacity: 0, y: 15, duration: 0.2, ease: 'power2.in' });
      }

      // 2. Animate preloader background into solid dark black (#0A0A0A) - ZERO WHITE LEAKING!
      if (blackCurtain) {
        gsap.to(blackCurtain, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut'
        });
      }

      // 3. Enlarge black 'N' logo mark from solid black stroke stem (28% 62%) to fill screen in black - ZERO BLUR!
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
            ScrollTrigger.refresh();
          }
        });
      } else {
        preloader.classList.add('is-hidden');
        document.body.style.overflow = '';
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

  // 2. Petrol Pump Mechanical 3-Digit Odometer Counter (000 -> 034 -> 068 -> 100, No Percentage Symbol)
  const counterObj = { val: 0 };
  const countTl = gsap.timeline();

  // Stop 1: 000 -> 034
  countTl.to(counterObj, {
    val: 34,
    duration: 0.85,
    ease: 'power2.out',
    snap: { val: 1 },
    onUpdate: () => setOdometerValue(counterObj.val)
  });
  countTl.to({}, { duration: 0.25 }); // Pause at 034

  // Stop 2: 034 -> 068
  countTl.to(counterObj, {
    val: 68,
    duration: 0.95,
    ease: 'power2.inOut',
    snap: { val: 1 },
    onUpdate: () => setOdometerValue(counterObj.val)
  });
  countTl.to({}, { duration: 0.25 }); // Pause at 068

  // Stop 3: 068 -> 100
  countTl.to(counterObj, {
    val: 100,
    duration: 1.0,
    ease: 'power2.inOut',
    snap: { val: 1 },
    onUpdate: () => setOdometerValue(counterObj.val)
  });
  countTl.to({}, { duration: 0.4 }); // Hold at 100 before zoom expansion

  mainTl.add(countTl, 0);
  // Hold at 100% briefly before exit wipe
  mainTl.to({}, { duration: 0.25 });
}

// Liquid Glass Chromatic 3D 'N' Sculpture (Three.js WebGL + Physical Refractive Glass Material)
// Interactive 3D Volumetric Extruded 'N' Logo Controller (Continuous Y-Axis Spin & Cursor/Drag Interaction)
function initInteractiveNLogo() {
  const stageElem = document.getElementById('css-3d-n-stage');
  const objectElem = document.getElementById('css-3d-n-object');
  const brandCol = document.getElementById('toolkit-brand-column');
  const section = document.getElementById('toolkit');
  if (!stageElem || !objectElem || !brandCol) return;

  let baseSpinY = 0;
  let cursorSpinVelY = 0;
  let cursorTiltVelX = 0;
  let mouseTiltX = 0;
  let mouseTiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  let dragRotX = 0;
  let dragRotY = 0;

  function renderLoop() {
    if (!isDragging) {
      // Natural continuous Y-axis rotation (1.2 deg per frame) + cursor spin acceleration
      baseSpinY = (baseSpinY + 1.2 + cursorSpinVelY) % 360;

      dragRotX += cursorTiltVelX;
      cursorSpinVelY *= 0.93;
      cursorTiltVelX *= 0.93;

      mouseTiltX += (targetTiltX - mouseTiltX) * 0.08;
      mouseTiltY += (targetTiltY - mouseTiltY) * 0.08;
    } else {
      baseSpinY = (baseSpinY + cursorSpinVelY) % 360;
    }

    const finalRotX = 14 + (isDragging ? dragRotX : mouseTiltX + dragRotX);
    const finalRotY = baseSpinY + (isDragging ? dragRotY : mouseTiltY + dragRotY);

    objectElem.style.transform = `rotateX(${finalRotX.toFixed(2)}deg) rotateY(${finalRotY.toFixed(2)}deg)`;
    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);

  const trackTarget = section || brandCol;

  const onPointerDown = (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    stageElem.style.cursor = 'grabbing';
    objectElem.style.cursor = 'grabbing';
  };

  const onPointerMove = (e) => {
    if (previousMouseX !== 0 && previousMouseY !== 0) {
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      if (isDragging) {
        cursorSpinVelY = deltaX * 0.5;
        cursorTiltVelX -= deltaY * 0.5;
        dragRotY += deltaX * 0.5;
        dragRotX -= deltaY * 0.5;
      } else {
        cursorSpinVelY += deltaX * 0.08;
        cursorTiltVelX -= deltaY * 0.04;
        cursorSpinVelY = Math.max(-8, Math.min(8, cursorSpinVelY));
        cursorTiltVelX = Math.max(-5, Math.min(5, cursorTiltVelX));
      }
    }

    previousMouseX = e.clientX;
    previousMouseY = e.clientY;

    if (!isDragging) {
      const rect = brandCol.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetTiltY = normX * 35;
      targetTiltX = -normY * 25;
    }
  };

  const onPointerLeave = () => {
    if (!isDragging) {
      targetTiltX = 0;
      targetTiltY = 0;
    }
  };

  const onPointerUp = () => {
    if (isDragging) {
      isDragging = false;
      stageElem.style.cursor = 'grab';
      objectElem.style.cursor = 'grab';
    }
  };

  stageElem.addEventListener('pointerdown', onPointerDown);
  objectElem.addEventListener('pointerdown', onPointerDown);
  trackTarget.addEventListener('pointermove', onPointerMove);
  trackTarget.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('pointerup', onPointerUp);
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initAppPreloader();
  initMobileMenu();
  initContactModal();
  initRoleSwitchers();
  initScrollAnimations();
  initWordSplitScrollAnimation();
  initWorkHistoryReferenceScroller();
  initBrandTransitionWipe();
  initInteractiveNLogo();

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

// Also refresh ScrollTrigger on full window load (after image assets load)
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
