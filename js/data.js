/* ============================================================================
   data.js  —  ★ THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE CONTENT ★
   ----------------------------------------------------------------------------
   Everything on the website (text, links, projects, publications, CV,
   certificates, gallery) is defined here as plain, labelled fields.

   HOW TO EDIT (no coding knowledge needed):
     • Change text  -> edit the text inside the quotes "like this".
     • Add an item  -> copy an existing { ... } block, paste it, edit it,
                       and make sure blocks are separated by commas.
     • Remove an item -> delete its whole { ... } block (and the trailing comma).
     • Keep the quotes and commas intact — they matter.

   After editing, just refresh the page (or re-deploy) to see changes.
   ========================================================================== */

window.SITE_DATA = {

  /* ---- 1. BASIC PROFILE / IDENTITY -------------------------------------- */
  profile: {
    name:        "Dr. A. Researcher",
    role:        "Researcher in Civil & Structural Engineering",
    tagline:     "Bridges · Structural Engineering · Structural Health Monitoring",
    // Short hero intro (1–2 sentences):
    heroIntro:   "I develop sensor-based monitoring and data-driven methods to keep " +
                 "bridges and civil infrastructure safe, durable, and resilient.",
    institution: "Department of Civil Engineering, University Name",
    location:    "City, Country",
    photo:       "public/images/profile.jpg",
    // Hero background photo. Until you add a real one, an elegant line-art
    // bridge is drawn automatically. Add a wide photo at this path to override.
    heroImage:   "public/images/bridge-hero.jpg",
    cvFile:      "public/cv/cv.pdf"
  },

  /* ---- 2. ABOUT ME ------------------------------------------------------- */
  about: {
    // Each string below is a paragraph. Add/remove paragraphs freely.
    paragraphs: [
      "I am a civil engineer and researcher specialising in bridge engineering, " +
      "structural analysis, and Structural Health Monitoring (SHM). My work bridges " +
      "fundamental structural mechanics and applied sensing technology to assess the " +
      "real condition of infrastructure in service.",

      "My research is motivated by a simple question: how do we know an ageing bridge " +
      "is still safe? To answer it, I combine field instrumentation, finite-element " +
      "modelling, vibration-based damage detection, and modern data analytics to turn " +
      "raw measurements into actionable maintenance decisions.",

      "I collaborate with universities, transport agencies, and industry partners to " +
      "translate research into practice — from sensor deployment on real structures to " +
      "decision-support tools for asset managers."
    ],
    // Small highlight stats shown as cards (edit the numbers/labels):
    highlights: [
      { value: "10+", label: "Years in structural research" },
      { value: "30+", label: "Peer-reviewed publications" },
      { value: "12",  label: "Monitored structures" },
      { value: "8",   label: "Funded projects" }
    ]
  },

  /* ---- 3. RESEARCH INTERESTS (cards) ------------------------------------ */
  research: [
    { icon: "bridge",   title: "Bridge Engineering",
      text: "Behaviour, assessment and load rating of steel, concrete and composite bridges." },
    { icon: "analysis", title: "Structural Analysis",
      text: "Finite-element modelling, model updating and nonlinear structural response." },
    { icon: "monitor",  title: "Structural Health Monitoring",
      text: "Long-term, sensor-based monitoring of in-service civil structures." },
    { icon: "network",  title: "Infrastructure Monitoring",
      text: "Distributed sensor networks and IoT systems for large asset portfolios." },
    { icon: "damage",   title: "Damage Detection",
      text: "Vibration-based and data-driven identification of damage and anomalies." },
    { icon: "sensor",   title: "Sensor-Based Monitoring",
      text: "Accelerometers, strain gauges, fibre-optics and acquisition systems." },
    { icon: "shield",   title: "Durability & Resilience",
      text: "Deterioration modelling, resilience assessment and risk-informed decisions." },
    { icon: "leaf",     title: "Sustainability & Maintenance",
      text: "Life-cycle, predictive maintenance and sustainable infrastructure management." }
  ],

  /* ---- 4. CURRENT PROJECTS ---------------------------------------------- */
  projects: [
    {
      title:       "Continuous Monitoring of a Long-Span Cable-Stayed Bridge",
      status:      "Ongoing",            // e.g. Ongoing, Completed, Planned
      period:      "2023 – Present",
      description: "Deployment and operation of a permanent SHM system on a major " +
                   "cable-stayed bridge to track structural behaviour under traffic, " +
                   "wind and temperature.",
      objectives: [
        "Quantify in-service load effects and modal behaviour",
        "Detect early-stage damage and abnormal response",
        "Inform condition-based maintenance planning"
      ],
      methods:      "Triaxial accelerometers, strain and temperature sensors, " +
                    "operational modal analysis, automated data pipelines.",
      collaborators:"National Transport Agency · University Name",
      media: { type: "image", src: "public/images/project-1.jpg" }   // see media note below
    },
    {
      title:       "Vibration-Based Damage Detection for Concrete Girders",
      status:      "Ongoing",
      period:      "2022 – Present",
      description: "Laboratory and field study developing robust algorithms that " +
                   "separate damage-induced changes from environmental effects.",
      objectives: [
        "Build damage-sensitive features robust to temperature",
        "Validate on laboratory girders and a real viaduct",
        "Release an open benchmark dataset"
      ],
      methods:      "Modal identification, machine learning, statistical pattern recognition.",
      collaborators:"Structures Laboratory · Industry Partner Ltd.",
      media: { type: "image", src: "public/images/project-2.jpg" }
    },
    {
      title:       "Resilience & Life-Cycle Assessment of Ageing Viaducts",
      status:      "Planned",
      period:      "2025 – 2028",
      description: "A framework linking monitoring data with deterioration and " +
                   "resilience models to prioritise interventions across a network.",
      objectives: [
        "Couple SHM data with deterioration models",
        "Quantify network-level resilience",
        "Optimise maintenance under budget constraints"
      ],
      methods:      "Bayesian updating, life-cycle cost analysis, risk modelling.",
      collaborators:"Regional Roads Authority · Research Consortium",
      media: { type: "image", src: "public/images/project-3.jpg" }
      // To use a VIDEO instead of an image, replace the media line above with:
      // media: { type: "video",   src: "public/videos/shm-demo.mp4", poster: "public/images/video-poster.jpg" }
      // or a YouTube video:
      // media: { type: "youtube", id: "dQw4w9WgXcQ" }
    }
  ],

  /* ---- 5. PUBLICATIONS --------------------------------------------------
     Group by category. Within each category, add publications as blocks.
     Optional fields per item: doi, pdf, link  (leave "" to hide a button). */
  publications: [
    {
      category: "Journal Papers",
      items: [
        { authors: "Researcher, J. A., Coauthor, B.", year: "2025",
          title: "Temperature-robust damage detection in monitored bridges",
          venue: "Journal of Structural Health Monitoring, 24(3), 123–145",
          doi: "10.0000/jshm.2025.001", pdf: "", link: "" },
        { authors: "Coauthor, C., Researcher, J. A.", year: "2024",
          title: "Operational modal analysis of a cable-stayed bridge under traffic",
          venue: "Engineering Structures, 301, 117000",
          doi: "10.0000/engstruct.2024.017", pdf: "", link: "" },
        { authors: "Researcher, J. A.", year: "2023",
          title: "A review of data-driven Structural Health Monitoring for bridges",
          venue: "Structure and Infrastructure Engineering, 19(8), 1100–1130",
          doi: "10.0000/sie.2023.044", pdf: "", link: "" }
      ]
    },
    {
      category: "Conference Papers",
      items: [
        { authors: "Researcher, J. A., Coauthor, D.", year: "2024",
          title: "Sensor placement optimisation for long-span bridge monitoring",
          venue: "IABSE Congress, Proceedings, pp. 88–95",
          doi: "", pdf: "", link: "" },
        { authors: "Researcher, J. A.", year: "2023",
          title: "Machine learning for early damage warning in concrete girders",
          venue: "EWSHM — European Workshop on SHM",
          doi: "", pdf: "", link: "" }
      ]
    },
    {
      category: "Reports & Presentations",
      items: [
        { authors: "Researcher, J. A. et al.", year: "2024",
          title: "Technical report: SHM system commissioning and first-year results",
          venue: "National Transport Agency, Technical Report TR-2024-07",
          doi: "", pdf: "", link: "" },
        { authors: "Researcher, J. A.", year: "2023",
          title: "Invited talk: From measurements to maintenance decisions",
          venue: "University Name, Seminar Series",
          doi: "", pdf: "", link: "" }
      ]
    }
  ],

  /* ---- 6. CURRICULUM VITAE ---------------------------------------------- */
  cv: {
    // Timeline entries; type controls the heading they appear under.
    education: [
      { period: "20XX – 20XX", title: "Ph.D., Civil / Structural Engineering",
        org: "University Name", detail: "Dissertation on Structural Health Monitoring of bridges." },
      { period: "20XX – 20XX", title: "M.Sc., Structural Engineering",
        org: "University Name", detail: "Focus on structural dynamics and finite-element modelling." },
      { period: "20XX – 20XX", title: "B.Sc., Civil Engineering",
        org: "University Name", detail: "" }
    ],
    research_experience: [
      { period: "20XX – Present", title: "Postdoctoral Researcher",
        org: "Institute / University", detail: "Bridge monitoring, damage detection and data analytics." },
      { period: "20XX – 20XX", title: "Research Assistant",
        org: "Structures Laboratory", detail: "Experimental testing and sensor instrumentation." }
    ],
    teaching_experience: [
      { period: "20XX – Present", title: "Lecturer / Teaching Assistant",
        org: "University Name", detail: "Structural analysis, dynamics of structures, SHM." }
    ],
    // Skill groups (tags). Add groups or tags freely.
    technical_skills: [
      "Finite-element modelling", "Operational modal analysis", "Damage detection",
      "Signal processing", "Sensor instrumentation", "Load testing",
      "Reliability & risk", "Life-cycle assessment"
    ],
    software_skills: [
      "ANSYS", "ABAQUS", "SAP2000", "MATLAB", "Python", "R",
      "LabVIEW", "AutoCAD", "QGIS", "LaTeX"
    ],
    awards: [
      { period: "20XX", title: "Best Paper Award", org: "International SHM Conference" },
      { period: "20XX", title: "Doctoral Research Scholarship", org: "Funding Body" }
    ],
    memberships: [
      { period: "20XX – Present", title: "Member", org: "IABSE" },
      { period: "20XX – Present", title: "Member", org: "ASCE / SEI" },
      { period: "20XX – Present", title: "Member", org: "ISHMII" }
    ]
  },

  /* ---- 7. CERTIFICATES --------------------------------------------------- */
  certificates: [
    { title: "Structural Health Monitoring — Advanced Course", org: "Professional Institute",
      date: "2024", image: "public/certificates/certificate-1.jpg", file: "" },
    { title: "Bridge Inspection & Assessment", org: "Engineering Association",
      date: "2023", image: "public/certificates/certificate-2.jpg", file: "" },
    { title: "Data Science for Engineers", org: "Online Academy",
      date: "2022", image: "public/certificates/certificate-3.jpg",
      file: "" }   // set file to a PDF path to make the card link to a document
  ],

  /* ---- 8. MEDIA GALLERY -------------------------------------------------
     Each card has a CATEGORY label, a TITLE, a DESCRIPTION, and one media item.
     The media on top is one of three kinds — set ONE of these fields:

       • IMAGE   ->  image:   "public/images/your-photo.jpg"
       • VIDEO   ->  video:   "public/videos/your-clip.mp4"
                     poster:  "public/images/your-poster.jpg"   (optional still shown before play)
       • YOUTUBE ->  youtube: "VIDEO_ID"   (the part after watch?v= in the URL)

     To replace a placeholder later, just point the path at your real file
     (e.g. drop bridge.jpg into public/images/ and set image: "public/images/bridge.jpg").
     Add or remove cards freely — the grid reflows automatically. */
  gallery: [
    {
      category: "Bridge photo",
      title: "Bridge infrastructure placeholder",
      description: "Replace with a bridge photo from a site visit, project, or monitoring campaign.",
      image: "public/images/gallery-bridge.jpg"
    },
    {
      category: "Sensor installation",
      title: "Sensor installation placeholder",
      description: "Use this for accelerometers, strain gauges, data loggers, or other SHM hardware.",
      image: "public/images/gallery-sensor.jpg"
    },
    {
      category: "Field monitoring",
      title: "Field measurement placeholder",
      description: "Document field campaigns, bridge inspection, and data collection activities.",
      image: "public/images/gallery-field.jpg"
    },
    {
      category: "SHM demo video",
      title: "Structural health monitoring demo",
      description: "Add a short video showing monitoring workflows, dashboard demos, or field instrumentation.",
      video: "public/videos/shm-demo.mp4",
      poster: "public/images/gallery-poster-shm.jpg"
    },
    {
      category: "Lab testing video",
      title: "Laboratory experiment placeholder",
      description: "Add videos of specimen testing, vibration experiments, or sensor validation.",
      video: "public/videos/lab-experiment.mp4",
      poster: "public/images/gallery-poster-lab.jpg"
    },
    {
      category: "Conference / outreach",
      title: "Research presentation placeholder",
      description: "Add conference photos, poster sessions, outreach events, or team research activities.",
      image: "public/images/gallery-conference.jpg"
    }
    // ---- Example of a YouTube card (copy, uncomment, and edit) ----
    // ,{
    //   category: "Project overview",
    //   title: "Project explainer video",
    //   description: "Embed a YouTube video by pasting its ID below.",
    //   youtube: "dQw4w9WgXcQ"
    // }
  ],

  /* ---- 9. CONTACT -------------------------------------------------------
     Leave any url as "" to hide that link. */
  contact: {
    email:        "your.email@university.edu",
    intro:        "Open to collaborations, student supervision, and industry partnerships.",
    links: [
      { label: "LinkedIn",          icon: "linkedin",     url: "https://www.linkedin.com/in/your-profile" },
      { label: "Google Scholar",    icon: "scholar",      url: "https://scholar.google.com/citations?user=XXXX" },
      { label: "ORCID",             icon: "orcid",        url: "https://orcid.org/0000-0000-0000-0000" },
      { label: "ResearchGate",      icon: "researchgate", url: "https://www.researchgate.net/profile/your-profile" },
      { label: "University Profile", icon: "university",  url: "https://www.university.edu/your-profile" }
    ],
    // Optional contact form. See README ("Contact form") to switch it on.
    // Paste a Formspree endpoint here to enable sending; leave "" to use email instead.
    formEndpoint: ""
  },

  /* ---- FOOTER ------------------------------------------------------------ */
  footer: {
    note: "© " + new Date().getFullYear() + " Dr. Jordan A. Researcher · Civil & Structural Engineering"
  }
};
