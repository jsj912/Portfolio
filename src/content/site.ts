// Single source of truth for every fact on this site.
//
// Transcribed from the CONTENT block of the build brief and generated
// mechanically, so the strings are byte-exact. Components read from here and
// never hard-code a fact. Anything the brief did not supply is `null`; the UI
// hides the corresponding element and the gap is recorded in TODO.md.
//
// The phone number is deliberately absent and must never be added.

export type Profile = {
  name: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  /** Not supplied by the brief. */
  photo: string | null;
};

export type Education = {
  school: string;
  place: string | null;
  degree: string;
  detail: string | null;
  date: string;
};

/** Scoreboard rows shown in a Match Recap overlay. */
export type Recap = {
  opponent: string;
  arena: string | null;
  finalScore: string;
  mvpMove: string;
  takeaway: string;
};

export type Experience = {
  org: string;
  role: string;
  date: string;
  bullets: string[];
  recap: Recap | null;
};

export type MatchLinks = {
  github: string | null;
  demo: string | null;
  report: string | null;
};

export type Match = {
  slug: string;
  featured: boolean;
  title: string;
  period: string | null;
  opponent: string;
  result: string;
  tech: string[];
  links: MatchLinks;
  recap: Recap;
  bullets: string[];
};

export type PublicationRole = "First author" | "Co-author (3rd)";

/**
 * Every publication is in preparation. None are published, so there is no
 * published/DOI state to model and the UI must not imply one.
 */
export const PUBLICATION_STATUS = "In Preparation" as const;

export type Publication = {
  title: string;
  role: PublicationRole;
  venue: string | null;
  note: string | null;
  tags: string[];
  status: typeof PUBLICATION_STATUS;
};

export type Award = {
  title: string;
  detail: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Leadership = {
  role: string;
  detail: string;
};

/** `value` is rendered verbatim; count-up must land on this exact string. */
export type StatLine = {
  value: string;
  label: string;
  source: string;
};

export const profile: Profile = {
  name: "Joan Sara Joe",
  location: "Bengaluru, India",
  email: "joansara123@gmail.com",
  linkedin: "https://www.linkedin.com/in/joan-sara-joe-95611528b/",
  github: "https://github.com/jsj912",
  photo: null,
};

export const education: Education[] = [
  {
    school: "B.M.S. College of Engineering",
    place: "Bengaluru, India",
    degree: "B.E., Computer Science & Engineering (IoT, Cybersecurity & Blockchain)",
    detail: "CGPA: 9.28",
    date: "Expected June 2027",
  },
  {
    school: "Indian Institute of Technology, Madras",
    place: null,
    degree: "B.S. in Data Science & Applications (online, self-paced, concurrent with B.E.)",
    detail: null,
    date: "In progress",
  },
];

// The brief defines these once and reuses them for the samsung-moe match, so
// they are bound to names here rather than duplicated.
const samsungRecap: Recap = {
  opponent: "Real-Time Appliance Detection",
  arena: "Samsung R&D Institute (PRISM)",
  finalScore: "0.140 → 0.932 mAP",
  mvpMove: "Scene-routed Mixture-of-Experts with RF-DETR Nano specialists",
  takeaway: "CPU-only demo with a feedback layer for retraining",
};

const samsungBullets: string[] = [
  "Built a three-layer Mixture-of-Experts vision pipeline for appliance detection in the SmartThings ecosystem: a ResNet-18 (Places365) scene router dispatches frames to RF-DETR Nano specialist detectors.",
  "Raised detection from 0.140 mAP (SSD-MobileNet baseline, which missed small objects entirely) to 0.932 mAP by replacing a single general detector with scene-conditioned experts.",
  "Shipped a CPU-only demo via OpenCV, plus a feedback layer that persists analyst corrections for retraining.",
  "First-authoring an IEEE-format paper on the architecture (in preparation).",
];

export const experience: Experience[] = [
  {
    org: "Fidelity Investments",
    role: "Software Engineering Intern",
    date: "June 2026 – August 2026",
    bullets: [
      "Migrated production Java Spring Batch jobs to AWS Lambda, replacing always-on EKS microservices with event-driven serverless execution and cutting idle infrastructure cost.",
      "Designed an asynchronous Lambda chain with and without Step Functions, integrating with AutoSys scheduling and an upstream Bloomberg SFTP data dependency; owned the architecture and delivery of the POC end to end.",
      "Restructured the Maven build and trimmed/shaded dependency JARs to fit Lambda deployment package limits, cutting artifact size and reducing cold-start weight.",
      "Designed the monitoring strategy for job-level observability, evaluating a two-table state-tracking design against a logs-only approach.",
    ],
    recap: {
      opponent: "Always-On Batch Infrastructure",
      arena: "Fidelity Investments",
      finalScore: "Spring Batch on EKS → event-driven AWS Lambda",
      mvpMove: "Async Lambda chain, built with and without Step Functions",
      takeaway: "Owned the POC architecture and delivery end to end",
    },
  },
  {
    org: "Samsung R&D Institute (PRISM)",
    role: "Research Intern",
    date: "Jan 2026 – June 2026",
    bullets: samsungBullets,
    recap: samsungRecap,
  },
];

export const matches: Match[] = [
  {
    slug: "samsung-moe",
    featured: true,
    title: "Mixture-of-Experts Appliance Detection (Samsung PRISM)",
    period: "Jan 2026 – June 2026",
    opponent: "Real-Time Appliance Detection",
    result: "Three-layer Mixture-of-Experts vision pipeline; 0.140 → 0.932 mAP.",
    tech: [
      "Mixture-of-Experts",
      "ResNet-18 (Places365)",
      "RF-DETR Nano",
      "OpenCV",
    ],
    links: {
      github: null,
      demo: null,
      report: null,
    },
    recap: samsungRecap,
    bullets: samsungBullets,
  },
  {
    slug: "ringshield",
    featured: true,
    title: "RingShield: Fraud-Ring Detection with Temporal Graph Neural Networks",
    period: "2025 – Present",
    opponent: "Coordinated Fraud Rings",
    result: "Temporal GNN architecture with analyst-facing explainability and drift monitoring. Phase 1 complete, implementation in progress.",
    tech: [
      "Temporal GNNs",
      "Dynamic Graphs",
      "Explainability",
      "Drift Monitoring",
      "PRISMA",
    ],
    links: {
      github: null,
      demo: null,
      report: null,
    },
    recap: {
      opponent: "Coordinated Fraud Rings",
      arena: "Flagship project",
      finalScore: "Phase 1 complete (~50-paper review, 9-category gap taxonomy)",
      mvpMove: "Transactions as a dynamic, time-stamped graph of users, devices, cards and merchants",
      takeaway: "Surfaces rings that node-level and rule-based models miss",
    },
    bullets: [
      "Models financial transactions as a dynamic, time-stamped graph of users, devices, cards and merchants, using temporal GNNs to surface coordinated fraud rings that node-level and rule-based models miss.",
      "Adds analyst-actionable explainability (surfacing the suspicious transaction paths behind each decision) and drift monitoring to adapt as fraud patterns shift.",
      "Phase 1 complete: systematic review of ~50 papers with a nine-category gap taxonomy, system architecture, and evaluation protocol across AMLworld, Elliptic, IEEE-CIS and PaySim. Implementation in progress.",
      "Led the systematic review workflow, developed a PRISMA-based 9-category gap taxonomy, and authored the initial manuscript draft.",
    ],
  },
  {
    slug: "amsdds",
    featured: true,
    title: "Adaptive Multi-Layer Skin Disease Detection (AMSDDS)",
    period: "Smart Horizon 2026",
    opponent: "7-Class Dermatology Triage",
    result: "Two-stage uncertainty-routed cascade; 86.9% accuracy at ~30% of the transformer's compute.",
    tech: [
      "PyTorch",
      "timm",
      "Flask",
      "Docker",
      "MobileNetV3",
      "ViT (PanDerm ViT-B/16)",
    ],
    links: {
      github: null,
      demo: null,
      report: null,
    },
    recap: {
      opponent: "7-Class Dermatology Triage (54:1 class imbalance)",
      arena: "Smart Horizon International Hackathon 2026",
      finalScore: "86.9% accuracy vs 86.4% for transformer-on-everything, at ~30% of its compute",
      mvpMove: "Calibrated confidence + entropy gate (ECE 0.025)",
      takeaway: "Caught 54 of 75 malignant lesions the fast path called benign",
    },
    bullets: [
      "Built a two-stage uncertainty-routed cascade (multimodal MobileNetV3 → ViT escalation model) for 7-class dermatology triage on HAM10000 + PAD-UFES-20 (12k images, 54:1 class imbalance): 86.9% accuracy vs 86.4% for running the transformer on every image, at ~30% of its compute; a calibrated confidence + entropy gate (110-point sweep, temperature scaling, ECE 0.025) caught 54 of 75 malignant lesions the fast path called benign.",
      "Diagnosed that the escalation model beat the fast path by only 1.2 points because a COCO-pretrained detection backbone learns object-vs-background separation rather than fine-grained texture; replaced it with a fine-tuned PanDerm ViT-B/16 (layer-wise LR decay, mixup/cutmix, class-balanced sampler on a single T4), lifting macro F1 0.736 → 0.788, with the rare classes at 89 training images each reaching 0.842 and 0.927 F1.",
      "Domain-adapted across dermoscopy and smartphone imaging with an explicit 6→7 class mapping and patient-level splits to prevent leakage, raising cross-domain macro F1 0.550 → 0.704; found dermoscopy fine-tuning improved clinical-photo transfer, motivating a shared-backbone / per-domain-head design.",
      "Shipped the serving stack: Dockerised Flask API, config-driven thresholds, one-line backbone rollback, selectable heads, and a parity test verifying served predictions reproduce notebook results; cached frozen features to cut experiment turnaround from ~50 min to seconds, enabling a 24-config sweep selected on validation with test reported once.",
    ],
  },
  {
    slug: "network-anomaly",
    featured: false,
    title: "ML-Based Network Traffic & Malware Anomaly Detection",
    period: "Sept 2025 – Dec 2025",
    opponent: "Malicious Network Traffic",
    result: "96% true-positive rate at <5% FPR across threat classes.",
    tech: [
      "Isolation Forest",
      "TreeSHAP",
      "PCAP feature engineering",
      "Python",
    ],
    links: {
      github: null,
      demo: null,
      report: "https://drive.google.com/file/d/1RHb_D2x1-Yb0OIWUVPx_TvzyGQ9h3Pd3/view?usp=drive_link",
    },
    recap: {
      opponent: "RAT traffic, DNS tunneling and other threat classes",
      arena: "Sept 2025 – Dec 2025",
      finalScore: "96% TPR at <5% FPR",
      mvpMove: "Benign-only Isolation Forest + two-stage reranking + TreeSHAP",
      takeaway: "~100% on RAT traffic, 94% on DNS tunneling (published KRTunnel benchmark: 98.1%)",
    },
    bullets: [
      "Engineered ~20 per-flow behavioral features from raw PCAP data (byte/packet counts, inter-arrival timing, port entropy, directional ratios, unique-destination counts).",
      "Trained an Isolation Forest (100–200 trees) on benign-only traffic to model normal behavior, with a two-stage reranking pass to cut false positives and TreeSHAP attribution to explain anomaly scores per feature.",
      "Achieved a 96% true-positive rate at <5% FPR across threat classes; ~100% on RAT traffic and 94% on DNS tunneling, against 98.1% for the published KRTunnel benchmark.",
    ],
  },
  {
    slug: "smart-glasses",
    featured: false,
    title: "Vision-Based Assistive Smart Glasses",
    period: "2025",
    opponent: "Visual Accessibility",
    result: "Face recognition + OCR pipeline delivering live spoken context; >98% word-level accuracy on clean printed text.",
    tech: [
      "OpenCV",
      "Haar Cascade",
      "LBPH",
      "OCR",
    ],
    links: {
      github: "https://github.com/jsj912/Smart-Glasses",
      demo: null,
      report: "https://drive.google.com/file/d/10pxIxtpENJj9zUxnAg3Ka71C-AQFfdB6/view?usp=drive_link",
    },
    recap: {
      opponent: "Visual Accessibility",
      arena: "2025",
      finalScore: ">98% word-level OCR accuracy on clean printed text",
      mvpMove: "Haar Cascade detection + LBPH recognition against an enrolled-user database",
      takeaway: "Live spoken context for visually impaired users",
    },
    bullets: [
      "Built a two-stage facial recognition pipeline (Haar Cascade detection, LBPH recognition against an enrolled-user database) and an OCR pipeline with adaptive thresholding and noise filtering, reaching >98% word-level accuracy on clean printed text; delivered live spoken context to visually impaired users.",
    ],
  },
  {
    slug: "he-iot",
    featured: false,
    title: "Homomorphic Encryption for IoT Sensor Analytics",
    period: null,
    opponent: "Plaintext Data Exposure",
    result: "Analytics and visualization over encrypted IoT sensor data without decryption.",
    tech: [
      "Homomorphic Encryption",
      "Flask",
      "IoT",
    ],
    links: {
      github: null,
      demo: null,
      report: null,
    },
    recap: {
      opponent: "Plaintext Data Exposure",
      arena: null,
      finalScore: "Computation and visualization without decryption",
      mvpMove: "Secure analytics pipeline over homomorphically encrypted sensor data",
      takeaway: "Flask backend serving encrypted-domain analytics",
    },
    bullets: [
      "Built a secure analytics pipeline over homomorphically encrypted IoT sensor data with a Flask backend, enabling computation and visualization without decryption.",
    ],
  },
];

export const publications: Publication[] = [
  {
    title: "From Transaction-Level Detection to Fraud-Ring Intelligence: A Systematic Survey of Temporal, Explainable and Drift-Aware Graph Learning",
    role: "Co-author (3rd)",
    venue: "IEEE Access (target; in preparation)",
    note: "PRISMA-based screening of 49 papers.",
    tags: [
    "Graph Learning",
    "Fraud Detection",
    "Survey",
  ],
    status: PUBLICATION_STATUS,
  },
  {
    title: "Hallucinations, Adversarial Vulnerabilities, and Mitigation Architectures in Large Language Models and LLM-Enabled High-Stakes Systems",
    role: "Co-author (3rd)",
    venue: null,
    note: "Survey of failure modes and reliability in large multimodal models.",
    tags: [
    "Trustworthy AI",
    "LLMs",
    "Survey",
  ],
    status: PUBLICATION_STATUS,
  },
  {
    title: "An Extensible Mixture-of-Experts Architecture for On-Device Appliance Detection in Smart Home Ecosystems",
    role: "First author",
    venue: null,
    note: null,
    tags: [
    "Computer Vision",
    "Mixture-of-Experts",
    "On-Device",
  ],
    status: PUBLICATION_STATUS,
  },
];

export const awards: Award[] = [
  {
    title: "1st Place (Solo), CySeck Grand CTF Challenge 2026",
    detail: "Ranked",
  },
  {
    title: "Finalist, Smart Horizon International Hackathon 2026",
    detail: "Designing a six-module adaptive architecture for open-set skin-lesion detection with confidence calibration and skin-tone-diversity auditing across HAM10000 and ISIC 2019/2020.",
  },
];

export const statLines: StatLine[] = [
  {
    value: "0.932",
    label: "mAP",
    source: "Samsung PRISM (from 0.140)",
  },
  {
    value: "96%",
    label: "TPR at <5% FPR",
    source: "Network anomaly detection",
  },
  {
    value: "0.788",
    label: "macro F1",
    source: "AMSDDS (from 0.736)",
  },
  {
    value: "#1 / 350+",
    label: "Solo CTF rank",
    source: "CySeck Grand CTF 2026",
  },
  {
    value: "9.28",
    label: "CGPA",
    source: "BMSCE",
  },
  {
    value: "3",
    label: "Papers in preparation",
    source: "Research",
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Machine Learning / AI",
    items: [
    "PyTorch",
    "Object Detection",
    "OpenCV",
    "Graph Neural Networks",
    "Mixture-of-Experts",
    "SHAP",
    "Model training & evaluation",
  ],
  },
  {
    group: "Languages",
    items: [
    "Python",
    "Java",
    "C/C++",
    "SQL",
    "JavaScript",
  ],
  },
  {
    group: "Backend & Cloud",
    items: [
    "AWS (Lambda, API Gateway, EKS, Step Functions)",
    "Spring Batch",
    "Maven",
    "Git/GitHub",
  ],
  },
  {
    group: "Data",
    items: [
    "Pandas",
    "MySQL",
    "MongoDB",
    "PCAP / network telemetry",
  ],
  },
];

export const leadership: Leadership[] = [
  {
    role: "Vice President, Sensored (BMSCE)",
    detail: "Led strategy and execution for technical initiatives and national-level events.",
  },
  {
    role: "Department Co-ordinator (ICB)",
    detail: "Led a 13-member cross-functional team for a national technical event; managed budgets and sponsorships, securing ~20% higher funding.",
  },
];

// ---------------------------------------------------------------------------
// Prescribed UI copy.
//
// These strings are dictated verbatim by the build brief's section 5 and 6, not
// invented here and not drawn from the CONTENT block. They live in this file so
// that components still hard-code nothing.
// ---------------------------------------------------------------------------

export const copy = {
  hero: {
    subtitle: "Machine Learning Engineer · Applied AI · Research",
    tagline:
      "Building adaptive AI systems that learn, evolve, and perform under pressure.",
    primaryCta: "View Match History",
    resumeCta: "Download Resume",
  },
  about: {
    pullQuote: "Every project begins as practice.",
  },
  contact: {
    headline: "Let's build something worth remembering.",
  },
  loading: {
    line: "Every rally starts with a serve.",
  },
  notFound: {
    headline: "BALL OUT.",
  },
} as const;

/**
 * Two-sentence bio, assembled only from facts already in this file: the two
 * education entries, and the Samsung and Fidelity roles. The four focus areas
 * are the ones the brief names. Nothing here is new information.
 */
export const bio: string[] = [
  "Computer science undergraduate at B.M.S. College of Engineering in Bengaluru, studying a concurrent B.S. in Data Science & Applications at IIT Madras.",
  "Work spans computer vision, graph learning for fraud, trustworthy and calibrated ML, and serverless backend engineering — from a scene-routed Mixture-of-Experts detector at Samsung R&D Institute to migrating production batch jobs onto AWS Lambda at Fidelity Investments.",
];
