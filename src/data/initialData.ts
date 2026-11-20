import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Md. Al Emran",
    headline: "Electrical Engineer | Researcher | AI & Power Systems Enthusiast | DWDM Network Engineer",
    shortBio: "An Electrical and Electronic Engineering graduate with research experience in Artificial Intelligence, Deep Learning, and intelligent engineering applications. Interested in advancing AI-driven power systems, renewable energy, smart grids, and sustainable technologies.",
    fullBio: [
      "I am an Electrical and Electronic Engineering (EEE) graduate from Pabna University of Science and Technology (PUST), Bangladesh, combining rigorous academic research with hands-on industrial telecommunication engineering experience.",
      "Currently, I serve as a DWDM Network Engineer at Fiber@Home Ltd., where I am actively engaged in the nationwide Nokia PSS 1830 L-Band Expansion Project, working with ROADM architectures, transponders, optical amplifiers, and high-capacity transmission infrastructure.",
      "My research trajectory is focused on integrating Artificial Intelligence, Deep Learning, and Machine Learning with Electrical Power Engineering, Renewable Energy Systems, Microgrids, and Smart Grids. I have authored 2 published Springer Nature journal articles (Cognitive Neurodynamics - Q2, IF 3.9; and Signal, Image and Video Processing), 1 accepted Elsevier paper in Measurement, and 16 IEEE international conference papers.",
      "As former Chair of the IEEE PUST Student Branch and IEEE Bangladesh Section Conference Ambassador, I have led 50+ executive members, organized international events with 500+ participants, and presented research at over 10 IEEE conferences across South Asia."
    ],
    email: "alemranak13@gmail.com",
    phone: "+8801778332062",
    location: "Dhaka / Chapainawabganj, Bangladesh",
    profileImage: "./profile.png",
    bannerImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80",
    resumePdfUrl: "./Md_Al_Emran_CV.pdf",
    academicResumePdfUrl: "./Md_Al_Emran_Academic_CV.pdf",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/md-al-emran-eee/",
      googleScholar: "https://scholar.google.com/citations?user=6wAa7doAAAAJ&hl=en",
      researchGate: "https://www.researchgate.net/profile/Md-Emran-12?ev=hdr_xprf",
      ieeeXplorer: "https://ieeexplore.ieee.org/author/md-al-emran",
      orcid: "https://orcid.org/",
      github: "https://github.com/alemranak13"
    },
    metrics: {
      journalPapers: 3,
      ieeeConferences: 16,
      oralPresentations: 10,
      totalCitationsEstimate: "56+",
      peerReviewCount: 2
    }
  },

  researchInterests: [
    {
      id: "ri-1",
      title: "AI Applications in Power Systems",
      description: "Harnessing deep neural networks, graph learning, and reinforcement learning for dynamic grid control, power flow optimization, and fault detection.",
      iconName: "Zap",
      isPrimary: true,
      tags: ["Power Systems", "Machine Learning", "Fault Analysis", "Reinforcement Learning"]
    },
    {
      id: "ri-2",
      title: "Smart Grid Technologies & Microgrids",
      description: "Developing intelligent architectures for microgrid energy management, resilient dynamic microgrid formation, and automated islanding control.",
      iconName: "Grid",
      isPrimary: true,
      tags: ["Smart Grids", "Microgrid EMS", "Decentralized Control", "Resilience"]
    },
    {
      id: "ri-3",
      title: "Renewable Energy & Solar Integration",
      description: "Optimizing renewable energy yield through intelligent solar tracking, PV forecasting, and battery energy storage system (BESS) management.",
      iconName: "Sun",
      isPrimary: true,
      tags: ["Solar Energy", "PVsyst", "HOMER Pro", "Renewable Forecasting", "BESS"]
    },
    {
      id: "ri-4",
      title: "Deep Learning & Computer Vision",
      description: "Designing CNNs, Vision Transformers, and Hybrid architectures for real-time safety critical monitoring, driver state recognition, and medical diagnostics.",
      iconName: "Eye",
      isPrimary: true,
      tags: ["Vision Transformers", "CNN-LSTM", "Transfer Learning", "Real-Time Inference"]
    },
    {
      id: "ri-5",
      title: "Biomedical Signal Processing & AI",
      description: "Decoding multi-channel EEG signals using continuous wavelet transform (CWT), discrete wavelet transform (DWT), and hybrid Transformer-XGBoost frameworks.",
      iconName: "Activity",
      isPrimary: false,
      tags: ["EEG Processing", "BCI", "Wavelet Transform", "Cognitive Workload", "Mental Stress"]
    },
    {
      id: "ri-6",
      title: "Optical Networks & Machine Learning",
      description: "Applying neural networks for optical fiber signal equalization, chromatic dispersion impairment compensation, and DWDM/ROADM capacity optimization.",
      iconName: "Radio",
      isPrimary: false,
      tags: ["DWDM", "ROADM", "Nokia PSS 1830", "Signal Equalization", "Optical Transport"]
    }
  ],

  publications: [
    // Journals
    {
      id: "pub-j-1",
      title: "Real-time Driver Activity Detection Using Advanced Deep Learning Models",
      authors: "Md. Al Emran, Md. Ariful Islam, Md. Obaydullah Khan, Md. Jewel Rana, Saida Tasnim Adrita, Md. Ashik Ahmed, Mahmoud M. A. Eid, Ahmed Nabih Zaki Rashed",
      venue: "Cognitive Neurodynamics",
      publisher: "Springer Science and Business Media B.V.",
      year: 2025,
      type: "journal",
      status: "published",
      doi: "10.1007/s11571-025-10376-1",
      category: "Intelligent Systems & Activity Recognition",
      impactFactor: "Impact Factor: 3.9 | 5-Year JIF: 3.7 | SJR: 0.805 (Q2 Journal)",
      isUndergradThesis: true,
      abstract: "Based on undergraduate thesis research at Pabna University of Science and Technology, this work proposes an advanced deep learning framework for real-time driver activity detection, significantly improving driver situational awareness and vehicular safety in intelligent transportation systems.",
      keywords: ["Deep Learning", "Driver Monitoring", "Computer Vision", "Real-Time Detection", "Intelligent Transportation"],
      bibtex: `@article{emran2025realtime,\n  title={Real-time Driver Activity Detection Using Advanced Deep Learning Models},\n  author={Emran, Md. Al and Islam, Md. Ariful and Khan, Md. Obaydullah and Rana, Md. Jewel and Adrita, Saida Tasnim and Ahmed, Md. Ashik and Eid, Mahmoud M. A. and Rashed, Ahmed Nabih Zaki},\n  journal={Cognitive Neurodynamics},\n  year={2025},\n  publisher={Springer},\n  doi={10.1007/s11571-025-10376-1}\n}`
    },
    {
      id: "pub-j-2",
      title: "Cross-Architecture Evaluation for Multi-Class Driver State Recognition: Unveiling the Performance Gap Between Hybrid Transformers and GNNs",
      authors: "Md. Ariful Islam, Md. Al Emran (Corresponding Author), Md. Wajed Ali",
      venue: "Signal, Image and Video Processing",
      publisher: "Springer",
      year: 2026,
      type: "journal",
      status: "published",
      doi: "10.1007/s11760-026-05162-3",
      category: "Intelligent Systems & Activity Recognition",
      isCorrespondingAuthor: true,
      abstract: "This study presents a comprehensive comparative analysis between Hybrid Transformer architectures and Graph Neural Networks (GNNs) for multi-class driver state recognition, highlighting architectural efficiency, feature representation capability, and performance gaps for intelligent transportation applications.",
      keywords: ["Hybrid Transformers", "Graph Neural Networks", "Driver State Recognition", "Signal Processing"],
      bibtex: `@article{islam2026crossarchitecture,\n  title={Cross-Architecture Evaluation for Multi-Class Driver State Recognition: Unveiling the Performance Gap Between Hybrid Transformers and GNNs},\n  author={Islam, Md. Ariful and Emran, Md. Al and Ali, Md. Wajed},\n  journal={Signal, Image and Video Processing},\n  year={2026},\n  publisher={Springer},\n  doi={10.1007/s11760-026-05162-3}\n}`
    },
    {
      id: "pub-j-3",
      title: "ARTHX-Net: A Hybrid Transformer-XGBoost Framework for Motor Imagery EEG Decoding with Adaptive Feature Recalibration and Glowworm Swarm Optimization",
      authors: "Md. Al Emran et al.",
      venue: "Measurement",
      publisher: "Elsevier",
      year: 2026,
      type: "journal",
      status: "accepted",
      category: "Biomedical Signal Processing & AI",
      abstract: "Introduces ARTHX-Net, an end-to-end hybrid framework coupling Transformer self-attention with gradient-boosted decision trees (XGBoost), enhanced with adaptive feature recalibration and Glowworm Swarm Optimization (GSO) for high-accuracy decoding of motor imagery EEG signals in brain-computer interfaces.",
      keywords: ["EEG Decoding", "Motor Imagery", "Transformer", "XGBoost", "Glowworm Swarm Optimization", "BCI"]
    },
    {
      id: "pub-j-4",
      title: "A Dual-Stream Hybrid Deep Learning Framework for Accurate and Explainable Diagnosis of Tomato Leaf Diseases",
      authors: "Md. Al Emran et al.",
      venue: "International Journal Manuscript",
      year: 2026,
      type: "under_review",
      status: "under_review",
      category: "Agriculture & Environmental AI",
      abstract: "Investigates a dual-stream architecture combining spatial feature extractors and explainable AI gradient saliency maps to achieve highly accurate and interpretable botanical disease diagnosis under variable field conditions.",
      keywords: ["Agricultural AI", "Explainable AI", "Dual-Stream CNN", "Plant Pathology"]
    },

    // IEEE Conference Papers
    {
      id: "pub-c-1",
      title: "Design, Structural Analysis, and Challenges of High-Voltage Underground Cables in Sindh, Pakistan",
      authors: "Md. Al Emran et al.",
      venue: "IEEE SPICSCON 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/SPICSCON69221.2025.11504100",
      category: "Power Transmission Systems",
      abstract: "Investigates structural and thermal stress factors affecting high-voltage underground transmission cables, addressing soil resistivity, thermal dissipation bottlenecks, and mechanical degradation in arid transmission corridors.",
      keywords: ["High Voltage", "Underground Cables", "Power Transmission", "Thermal Analysis", "Grid Reliability"]
    },
    {
      id: "pub-c-2",
      title: "Flood Area Detection and Segmentation Using Satellite Image in Bangladesh by U-Net",
      authors: "Md. Al Emran et al.",
      venue: "IEEE ECCE 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/ECCE64574.2025.11014036",
      category: "Remote Sensing & Signal Processing",
      abstract: "Applies a modified U-Net semantic segmentation network on multi-spectral satellite imagery to perform rapid, high-resolution flood extent delineation across river basins in Bangladesh.",
      keywords: ["Remote Sensing", "Flood Detection", "U-Net", "Semantic Segmentation", "Satellite Imagery"]
    },
    {
      id: "pub-c-3",
      title: "Wavelet-Statistical Method for EEG Signal Classification of Mental Stress in Cognitive Tasks",
      authors: "Md. Al Emran et al.",
      venue: "IEEE SPICSCON 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/SPICSCON69221.2025.11503956",
      category: "Remote Sensing & Signal Processing",
      abstract: "Proposes a discrete wavelet decomposition pipeline paired with higher-order statistical feature extraction to accurately classify stress vs. baseline cognitive workload states from multi-channel EEG.",
      keywords: ["EEG", "Mental Stress", "Wavelet Transform", "Cognitive Tasks", "Signal Processing"]
    },
    {
      id: "pub-c-4",
      title: "Driver Fatigue Detection using CWT-Extracted Features and CNN-LSTM",
      authors: "Md. Al Emran et al.",
      venue: "IEEE BECITHCON 2024",
      year: 2024,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/BECITHCON64160.2024.10962632",
      category: "Intelligent Systems & Activity Recognition",
      abstract: "Integrates Continuous Wavelet Transform (CWT) scalograms with a spatio-temporal CNN-LSTM neural network to reliably identify progressive driver fatigue patterns.",
      keywords: ["Fatigue Detection", "CWT", "CNN-LSTM", "Driver Monitoring", "Spatio-Temporal Features"]
    },
    {
      id: "pub-c-5",
      title: "Multi-Class Activity Recognition Using EEG and Motion Sensor Data",
      authors: "Md. Al Emran et al.",
      venue: "IEEE QPAIN 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/QPAIN66474.2025.11171711",
      category: "Intelligent Systems & Activity Recognition",
      abstract: "Develops a multimodal sensor fusion framework joining EEG neural dynamics with wearable inertial motion sensors for robust human activity recognition.",
      keywords: ["Sensor Fusion", "EEG", "Inertial Sensors", "Activity Recognition"]
    },
    {
      id: "pub-c-6",
      title: "EEG-Based Workload Estimation Using DWT and Statistical Features",
      authors: "Md. Al Emran et al.",
      venue: "IEEE QPAIN 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/QPAIN66474.2025.11171964",
      category: "Intelligent Systems & Activity Recognition",
      abstract: "Formulates a Discrete Wavelet Transform (DWT) feature extraction scheme across theta, alpha, and beta EEG rhythms to estimate mental workload levels during complex operational tasks.",
      keywords: ["DWT", "Workload Estimation", "EEG Rhythms", "Cognitive Ergonomics"]
    },
    {
      id: "pub-c-7",
      title: "Predicting Decision-Making Quality Using EEG Signals",
      authors: "Md. Al Emran et al.",
      venue: "IEEE SPICSCON 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/SPICSCON69221.2025.11504182",
      category: "Intelligent Systems & Activity Recognition",
      abstract: "Analyzes pre-frontal and central EEG spectral dynamics to anticipate human decision certainty and error probability prior to task execution.",
      keywords: ["EEG", "Decision-Making", "Cognitive State", "Predictive Modeling"]
    },
    {
      id: "pub-c-8",
      title: "Wheat Leaf Disease Detection Using Transfer Learning",
      authors: "Md. Al Emran et al.",
      venue: "IEEE ICCIT 2024",
      year: 2024,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/ICCIT64611.2024.11021906",
      category: "Agriculture & Environmental AI",
      abstract: "Evaluates pre-trained deep convolutional networks using fine-tuned transfer learning for multi-class wheat pathogen identification under real agricultural conditions.",
      keywords: ["Transfer Learning", "Wheat Disease", "Agriculture AI", "Convolutional Neural Networks"]
    },
    {
      id: "pub-c-9",
      title: "Rice Leaf Disease Detection Using Transfer Learning Architectures",
      authors: "Md. Al Emran et al.",
      venue: "IEEE SPICSCON 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/SPICSCON69221.2025.11503987",
      category: "Agriculture & Environmental AI",
      abstract: "Benchmark of modern CNN backbones for identifying blast, brown spot, and bacterial blight in rice crops with minimal computational overhead.",
      keywords: ["Rice Disease", "Computer Vision", "Transfer Learning", "Crop Protection"]
    },
    {
      id: "pub-c-10",
      title: "Optimizing Pomegranate Disease Detection Using Deep Learning",
      authors: "Md. Al Emran et al.",
      venue: "IEEE QPAIN 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/QPAIN66474.2025.11171672",
      category: "Agriculture & Environmental AI",
      abstract: "Investigates architectural hyperparameters and data augmentation techniques to optimize detection sensitivity for bacterial blight and fruit spot in pomegranate orchards.",
      keywords: ["Pomegranate Disease", "Optimization", "Deep Learning", "AgriTech"]
    },
    {
      id: "pub-c-11",
      title: "Hybrid Deep Learning for Grape Leaf Disease Segmentation",
      authors: "Md. Al Emran et al.",
      venue: "IEEE QPAIN 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/QPAIN66474.2025.11171840",
      category: "Agriculture & Environmental AI",
      abstract: "Develops an encoder-decoder segmentation model designed to precisely isolate diseased foliar lesions on grape leaves from complex canopy backgrounds.",
      keywords: ["Segmentation", "Grape Leaf Disease", "Hybrid Model", "Precision Agriculture"]
    },
    {
      id: "pub-c-12",
      title: "Hybrid Vision Transformer and ResNet18 for Kidney Disease Detection",
      authors: "Md. Al Emran et al.",
      venue: "IEEE COMPAS 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/COMPAS67506.2025.11381643",
      category: "Computer Vision & Medical Imaging",
      abstract: "Combines the local inductive bias of ResNet18 with the global self-attention mechanism of Vision Transformers to accurately classify renal pathology from computed tomography scans.",
      keywords: ["Vision Transformer", "ResNet18", "Kidney Disease", "Medical Imaging", "Computed Tomography"]
    },
    {
      id: "pub-c-13",
      title: "CNN Architectures for Eye Disease Diagnosis Using Retinal Images",
      authors: "Md. Al Emran et al.",
      venue: "IEEE MECON 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/MECON67253.2025.11277168",
      category: "Computer Vision & Medical Imaging",
      abstract: "Designs an automated diagnostic pipeline using convolutional neural networks for screening diabetic retinopathy, glaucoma, and macular degeneration on fundus photography.",
      keywords: ["Retinal Imaging", "CNN", "Ophthalmology", "Diabetic Retinopathy", "Medical Diagnostics"]
    },
    {
      id: "pub-c-14",
      title: "Eye Disease Detection and Classification Using Deep Learning",
      authors: "Md. Al Emran et al.",
      venue: "IEEE COMPAS 2024",
      year: 2024,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/COMPAS60761.2024.10796599",
      category: "Computer Vision & Medical Imaging",
      abstract: "Early detection framework classifying anterior and posterior eye pathologies utilizing deep convolutional feature extractors.",
      keywords: ["Eye Disease", "Deep Learning", "Biomedical Engineering", "Image Classification"]
    },
    {
      id: "pub-c-15",
      title: "Brain Disease Diagnosis Using Transformer and CNN Architectures",
      authors: "Md. Al Emran et al.",
      venue: "IEEE BECITHCON 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/BECITHCON69222.2025.11504083",
      category: "Computer Vision & Medical Imaging",
      abstract: "Explores synergistic Transformer-CNN models for early classification of neurodegenerative conditions and brain lesions from magnetic resonance imaging (MRI).",
      keywords: ["Transformers", "Brain Disease", "MRI", "Neuroimaging", "Deep Learning"]
    },
    {
      id: "pub-c-16",
      title: "CNN and Transformer Architectures for Lung Disease Classification",
      authors: "Md. Al Emran et al.",
      venue: "IEEE ICCIT 2025",
      year: 2025,
      type: "ieee_conference",
      status: "published",
      doi: "10.1109/ICCIT68739.2025.11490441",
      category: "Computer Vision & Medical Imaging",
      abstract: "Comparative evaluation of hybrid CNN-transformer backbones for multi-class pulmonary ailment identification from chest radiography.",
      keywords: ["Lung Disease", "Chest X-Ray", "Vision Transformers", "CNN", "Pulmonary Diagnostics"]
    }
  ],

  experiences: [
    {
      id: "exp-1",
      title: "DWDM Network Engineer",
      organization: "Fiber@Home Ltd.",
      location: "Dhaka, Bangladesh",
      startDate: "2026",
      endDate: "Present",
      isCurrent: true,
      type: "industry",
      projectFocus: "Nokia PSS 1830 L-Band Expansion Project",
      responsibilities: [
        "Working as a DWDM Network Engineer, supporting optical transmission network planning, implementation, optimization, and maintenance across national backbone links.",
        "Actively involved in the Nokia PSS 1830 L-Band Expansion Project, supporting L-band optical capacity expansion, equipment commissioning, and multi-wavelength link integration.",
        "Supporting DWDM network planning activities including wavelength link configuration, optical span loss budgeting, capacity expansion, and ROADM network optimization.",
        "Configuring and operating Nokia PSS 1830 optical transport equipment, including WDM/ROADM-related components, optical transponders, mux/demux modules, and optical amplifiers (EDFA/RAMAN).",
        "Conducting site surveys, optical fiber patching, optical power testing, insertion loss measurement, and troubleshooting at Central Offices (COs).",
        "Preparing and maintaining comprehensive network documentation, connectivity matrices, equipment inventory databases, and Bill of Quantities / Bill of Materials (BOQ/BOM).",
        "Monitoring network capacity utilization and identifying available ports, slot resources, and spare transponders for planned network expansions.",
        "Coordinating cross-functional workflows between planning, deployment, field implementation, and vendor engineering teams."
      ],
      equipmentAndTools: [
        "Nokia PSS 1830 Optical Transport",
        "DWDM / ROADM Architecture",
        "Optical Transponders & Muxponders",
        "EDFA & Optical Amplifiers",
        "Optical Power Meter & OTDR",
        "L-Band Optical Transmission",
        "BOQ / BOM Management"
      ]
    },
    {
      id: "exp-2",
      title: "Research Assistant (Undergraduate)",
      organization: "Pabna University of Science and Technology (PUST)",
      location: "Pabna, Bangladesh",
      startDate: "2024",
      endDate: "2025",
      isCurrent: false,
      type: "research",
      projectFocus: "Deep Learning, Signal Processing & Intelligent Systems",
      responsibilities: [
        "Conducted empirical research in Deep Learning and Computer Vision with a central focus on real-time intelligent engineering systems.",
        "Developed, benchmarked, and evaluated CNN, Vision Transformer, GNN, and hybrid models for multi-class classification in driver monitoring, power systems, and medical imaging.",
        "Investigated multi-channel EEG signal processing using continuous (CWT) and discrete wavelet transforms (DWT) for cognitive workload estimation and stress classification.",
        "Published multiple peer-reviewed research papers in IEEE international conferences and Springer journals.",
        "Served as an invited peer reviewer for high-impact Elsevier scientific journals."
      ],
      equipmentAndTools: [
        "Python & PyTorch / TensorFlow",
        "EEG Signal Processing & Wavelet Toolboxes",
        "Computer Vision & Transfer Learning",
        "MATLAB & Simulink",
        "LaTeX Scientific Documentation"
      ]
    }
  ],

  industrialVisits: [
    {
      id: "iv-1",
      title: "Kaptai Hydropower Station (230 MW)",
      organization: "Bangladesh Power Development Board (BPDB)",
      location: "Rangamati, Bangladesh",
      date: "May 2025",
      type: "Industrial Attachment",
      highlights: [
        "Observed comprehensive workflow of a 230 MW hydroelectric generation facility: reservoir intake → penstock → hydraulic turbine–generator sets (11–13.8 kV generation).",
        "Studied generation step-up substation transformers stepping voltage up to 132 kV for transmission into the double-circuit national grid.",
        "Analyzed hydrological rule-curve water regulation, dispatch criteria, and seasonal capacity utilization limits (13–26%) due to monsoonal rainfall variability.",
        "Documented operational safety procedures, electrical protection relays, and plant maintenance protocols."
      ],
      technicalExposure: "Hydro-turbines, 11-13.8 kV / 132 kV step-up substation, rule-curve reservoir regulation, grid synchronization, BPDB transmission interface."
    },
    {
      id: "iv-2",
      title: "Secondary Satellite Ground Station (SSGS) Betbunia",
      organization: "Bangladesh Satellite Company Limited (BSCL)",
      location: "Chattogram, Bangladesh",
      date: "May 2025",
      type: "Industrial Attachment",
      highlights: [
        "Studied national satellite communications hub operations, uplink/downlink chains, and tracking systems.",
        "Observed high-power amplifiers (HPA), low-noise block downconverters (LNB), and tracking antenna systems for C-band and Ku-band satellite transponders.",
        "Investigated telemetry, tracking, and control (TT&C) protocols for geostationary orbit spacecraft operation."
      ],
      technicalExposure: "Satellite earth station architecture, C/Ku-band feeds, RF up/down converters, high-gain parabolic antennas, redundant telemetry links."
    },
    {
      id: "iv-3",
      title: "HVDC (High Voltage Direct Current) Substation",
      organization: "National Power Transmission System",
      location: "Bheramara / Bangladesh",
      date: "2023",
      type: "Industrial Observation",
      highlights: [
        "Learned practical operations of bulk cross-border power transmission through high-voltage direct current (HVDC) technology.",
        "Inspected AC–DC thyristor converter stations, smoothing reactors, harmonic filter banks, and DC switchyard apparatus.",
        "Observed real-time grid stabilization methods, SCADA control panels, and automated DC protection schemes."
      ],
      technicalExposure: "HVDC converter valves, DC smoothing reactors, harmonic filters, asynchronous AC grid interconnection, SCADA monitoring."
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Automatic Solar Tracking System Using Arduino",
      category: "Hardware & Embedded Systems / Renewable Energy",
      year: 2024,
      role: "Lead Hardware & Firmware Designer",
      description: "Designed and implemented an intelligent dual-sensor solar tracking mechanism that maximizes solar energy harvesting efficiency throughout daylight hours.",
      highlights: [
        "Engineered a dual-LDR differential optical sensing circuit to detect sunlight incidence angle variations dynamically.",
        "Programmed an Arduino Uno microcontroller with a closed-loop feedback algorithm controlling a high-torque servo motor for real-time azimuth tracking.",
        "Demonstrated measurable solar energy yield improvement compared to static horizontal and fixed-tilt PV installations.",
        "Integrated regulated voltage step-down circuitry and battery charging modules for self-sustaining autonomous operation."
      ],
      tools: ["Arduino Uno", "Arduino IDE", "LDR Sensors", "Servo Motor", "Solar Photovoltaic Panel", "Circuit Design", "Renewable Energy"]
    },
    {
      id: "proj-2",
      title: "Real-Time Driver State & Activity Recognition System",
      category: "Deep Learning & Intelligent Transportation",
      year: 2025,
      role: "Lead Researcher (Undergraduate Thesis)",
      description: "Developed and published an end-to-end deep learning framework for driver safety monitoring, distinguishing distracted driving activities in real time.",
      highlights: [
        "Constructed and benchmarked hybrid Convolutional Neural Networks and Vision Transformers for multi-class classification.",
        "Achieved state-of-the-art accuracy with minimal latency suitable for embedded automotive edge devices.",
        "Published in Springer's Cognitive Neurodynamics (Q2, Impact Factor 3.9)."
      ],
      tools: ["Python", "PyTorch", "OpenCV", "Vision Transformers", "Cognitive Neurodynamics"]
    },
    {
      id: "proj-3",
      title: "ARTHX-Net: Motor Imagery EEG Decoding Framework",
      category: "Biomedical Signal Processing & Brain-Computer Interface",
      year: 2026,
      role: "Primary Researcher",
      description: "Pioneered a hybrid neural architecture uniting Transformer self-attention with XGBoost classifiers and Glowworm Swarm Optimization for decoding neural motor intentions.",
      highlights: [
        "Devised an adaptive feature recalibration block to enhance signal-to-noise ratio in non-invasive EEG recordings.",
        "Utilized Glowworm Swarm Optimization (GSO) for automated hyperparameter tuning.",
        "Accepted for publication in Elsevier's flagship journal Measurement."
      ],
      tools: ["Python", "Scikit-learn", "EEG Signal Toolboxes", "XGBoost", "GSO Optimization"]
    },
    {
      id: "proj-4",
      title: "Satellite Image Flood Extent Segmentation",
      category: "Remote Sensing & Environmental AI",
      year: 2025,
      role: "Co-Author & Model Developer",
      description: "Implemented a modified U-Net semantic segmentation network to map inundated terrain across Bangladesh river deltas from satellite imagery.",
      highlights: [
        "Trained on multi-spectral satellite imagery to isolate submerged agricultural and residential zones.",
        "Published and presented at the IEEE ECCE 2025 conference."
      ],
      tools: ["Python", "TensorFlow", "U-Net", "Satellite Remote Sensing", "IEEE ECCE"]
    }
  ],

  skillCategories: [
    {
      id: "sk-ai",
      name: "AI & Machine Learning",
      description: "Neural network architectures, computer vision, deep learning, and optimization",
      skills: [
        { name: "Deep Learning", level: "Advanced", highlight: true },
        { name: "Machine Learning", level: "Advanced", highlight: true },
        { name: "Convolutional Neural Networks (CNN)", level: "Advanced", highlight: true },
        { name: "Vision Transformers (ViT)", level: "Advanced", highlight: true },
        { name: "Graph Neural Networks (GNN)", level: "Intermediate", highlight: true },
        { name: "CNN-LSTM Hybrid Networks", level: "Advanced" },
        { name: "U-Net Semantic Segmentation", level: "Advanced" },
        { name: "Transfer Learning", level: "Advanced" },
        { name: "Explainable AI (XAI)", level: "Intermediate" },
        { name: "Computer Vision", level: "Advanced" }
      ]
    },
    {
      id: "sk-ee",
      name: "Electrical & Power Engineering",
      description: "Power systems, transmission, renewable energy modeling, and grid technology",
      skills: [
        { name: "Power Systems Analysis", level: "Advanced", highlight: true },
        { name: "Smart Grid Technologies", level: "Advanced", highlight: true },
        { name: "Microgrid Energy Management", level: "Advanced", highlight: true },
        { name: "Renewable Energy (Solar PV / Hydro)", level: "Advanced", highlight: true },
        { name: "High Voltage Underground Cables", level: "Intermediate" },
        { name: "HVDC Transmission Concepts", level: "Intermediate" },
        { name: "Substation & Step-Up Architecture", level: "Intermediate" },
        { name: "Power Distribution & Load Calculation", level: "Advanced" },
        { name: "Battery Energy Storage Systems (BESS)", level: "Intermediate" }
      ]
    },
    {
      id: "sk-telecom",
      name: "Optical Communications & DWDM",
      description: "Industrial optical transport networks, ROADM systems, and equipment commissioning",
      skills: [
        { name: "DWDM Network Engineering", level: "Advanced", highlight: true },
        { name: "ROADM Architecture", level: "Advanced", highlight: true },
        { name: "Nokia PSS 1830 L-Band Transport", level: "Advanced", highlight: true },
        { name: "Optical Transponders & Amplifiers", level: "Advanced" },
        { name: "Fiber Connectivity & Patching", level: "Advanced" },
        { name: "Central Office (CO) Operations", level: "Advanced" },
        { name: "OTDR & Optical Power Testing", level: "Advanced" },
        { name: "BOQ / BOM & Technical Documentation", level: "Advanced" },
        { name: "Satellite Earth Station Chains", level: "Intermediate" }
      ]
    },
    {
      id: "sk-tools",
      name: "Engineering Software & Tools",
      description: "Simulation, modeling, scientific computing, and documentation platforms",
      skills: [
        { name: "Python", level: "Intermediate", highlight: true },
        { name: "MATLAB & Simulink", level: "Advanced", highlight: true },
        { name: "HOMER Pro", level: "Intermediate", highlight: true },
        { name: "PVsyst", level: "Intermediate", highlight: true },
        { name: "AutoCAD Electrical Design", level: "Intermediate" },
        { name: "PSCAD", level: "Intermediate" },
        { name: "Google Colab", level: "Advanced" },
        { name: "Microsoft Excel (Data Analysis)", level: "Advanced" },
        { name: "LaTeX Scientific Typesetting", level: "Advanced" },
        { name: "Arduino IDE", level: "Intermediate" }
      ]
    },
    {
      id: "sk-automation",
      name: "Industrial Automation & Control",
      description: "Programmable logic controllers, supervisory control, and motor drivers",
      skills: [
        { name: "PLC Concepts (Siemens S7-1200)", level: "Intermediate", highlight: true },
        { name: "SCADA Fundamentals", level: "Intermediate" },
        { name: "HMI Interface Design", level: "Intermediate" },
        { name: "Variable Frequency Drives (VFD)", level: "Intermediate" },
        { name: "PID Control Systems", level: "Intermediate" },
        { name: "Modbus / Profibus / Profinet", level: "Intermediate" },
        { name: "Industrial Sensors & Encoders", level: "Intermediate" }
      ]
    },
    {
      id: "sk-research",
      name: "Academic Leadership & Soft Skills",
      description: "Scientific communication, team leadership, peer review, and event management",
      skills: [
        { name: "Scientific Writing & Publication", level: "Expert", highlight: true },
        { name: "Elsevier Peer Reviewing", level: "Advanced", highlight: true },
        { name: "IEEE Conference Oral Presentations", level: "Advanced", highlight: true },
        { name: "Executive Team Leadership (50+ Team)", level: "Advanced" },
        { name: "Large-Scale Event Management (500+)", level: "Advanced" },
        { name: "Analytical Problem Solving", level: "Advanced" },
        { name: "Cross-Functional Coordination", level: "Advanced" }
      ]
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science (B.Sc.) in Engineering",
      major: "Electrical and Electronic Engineering (EEE)",
      institution: "Pabna University of Science and Technology (PUST)",
      location: "Pabna, Bangladesh",
      duration: "March 2020 – October 2025",
      result: "3.40 / 4.00",
      resultType: "CGPA",
      thesisTitle: "Real-time Driver Activity Detection Using Advanced Deep Learning Models",
      thesisStatus: "Published in Cognitive Neurodynamics (Springer Nature, Q2, IF: 3.9)",
      mediumOfInstruction: "English",
      details: [
        "Four-year undergraduate engineering degree curriculum covering Electrical Power Systems, Power Electronics, Control Engineering, Telecommunications, Signal Processing, and Microprocessors.",
        "Conducted thesis research pioneering real-time driver state recognition using deep learning, yielding a lead-authored publication in Springer's Cognitive Neurodynamics journal.",
        "Served as Chair of the IEEE PUST Student Branch, leading technical conferences, workshops, and student mentorship initiatives."
      ]
    },
    {
      id: "edu-2",
      degree: "Higher Secondary Certificate (HSC)",
      major: "Science",
      institution: "Shahid A.H.M Kamaruzzaman Govt. Degree College",
      location: "Rajshahi, Bangladesh",
      duration: "2017 – 2019",
      result: "4.92 / 5.00",
      resultType: "GPA",
      details: [
        "Concentration in Physics, Chemistry, Higher Mathematics, and Biology.",
        "Graduated with top academic standing."
      ]
    },
    {
      id: "edu-3",
      degree: "Secondary School Certificate (SSC)",
      major: "Science",
      institution: "Collectorate Green View High School",
      location: "Chapainawabganj, Bangladesh",
      duration: "2015 – 2017",
      result: "5.00 / 5.00 (Golden GPA 5)",
      resultType: "GPA",
      details: [
        "Achieved the highest possible grade (GPA 5.00) in the National Board Examination.",
        "Participated actively in mathematics and science fairs."
      ]
    }
  ],

  leadership: [
    {
      id: "lead-1",
      role: "Chair",
      organization: "IEEE PUST Student Branch",
      location: "Pabna University of Science and Technology",
      duration: "Jan. 2023 – April 2025",
      awardOrRecognition: "Outstanding Leadership & Branch Growth",
      highlights: [
        "Led a 50+ member executive committee organizing academic workshops, seminars, and hackathons focusing on AI and Power Systems.",
        "Served as Chair of the flagship IEEE Day 2024 Event, leading comprehensive planning, fundraising, and execution for 500+ student attendees.",
        "Liaised directly with the IEEE Bangladesh Section to host national-level technical competitions and research symposia.",
        "Significantly elevated student enrollment, technical research publications, and IEEE member engagement across university departments."
      ]
    },
    {
      id: "lead-2",
      role: "Conference Ambassador",
      organization: "IEEE Bangladesh Section Conferences 2024",
      location: "Bangladesh Section",
      duration: "August 2024",
      awardOrRecognition: "Certificate of Appreciation for Outstanding Dedication",
      highlights: [
        "Recognized by the IEEE Bangladesh Section with a Certificate of Appreciation for outstanding dedication and contribution as a Conference Ambassador.",
        "Collaborated with the organizing and technical program committees of five major IEEE international conferences: ICCIT, MECON, SPICSCON, BECITHCON, and RAAICON.",
        "Promoted call-for-papers, author workshops, and technical outreach among university researchers nationwide."
      ]
    },
    {
      id: "lead-3",
      role: "Volunteer & Oral Presenter",
      organization: "27th International Conference on Computer and Information Technology (ICCIT 2024)",
      location: "Cox's Bazar, Bangladesh",
      duration: "December 2024",
      highlights: [
        "Delivered an oral presentation on 'Wheat Leaf Disease Detection Using Transfer Learning'.",
        "Assisted in conference logistics, technical session management, and keynote speaker coordination."
      ]
    },
    {
      id: "lead-4",
      role: "Technical Workshop Organizer",
      organization: "PUST Technical Research Community",
      location: "Pabna, Bangladesh",
      duration: "2022 – Present",
      highlights: [
        "Organized 10+ hands-on technical webinars and workshops on Deep Learning, MATLAB simulation, and Renewable Energy Systems.",
        "Facilitated interdisciplinary peer-learning sessions bridging power engineering and AI methodologies."
      ]
    }
  ],

  peerReviews: [
    {
      id: "pr-1",
      journal: "Biomedical Signal Processing and Control",
      publisher: "Elsevier",
      scope: "Signal processing, deep learning applications in electrophysiological data, EEG analysis, and healthcare diagnostics.",
      status: "Active Reviewer"
    },
    {
      id: "pr-2",
      journal: "Smart Agricultural Technology",
      publisher: "Elsevier",
      scope: "Computer vision, deep learning, precision agriculture, and automated crop disease detection.",
      status: "Active Reviewer"
    }
  ],

  references: [
    {
      id: "ref-1",
      name: "Md. Golam Sadeque",
      title: "Associate Professor",
      department: "Department of Electrical and Electronic Engineering (EEE)",
      organization: "Pabna University of Science and Technology (PUST)",
      location: "Pabna-6600, Bangladesh",
      email: "msadeque.eee@pust.ac.bd",
      phone: "+88 01725083838",
      relationType: "Academic"
    },
    {
      id: "ref-2",
      name: "Md. Ariful Islam",
      title: "Assistant Professor",
      department: "Department of Electrical and Electronic Engineering (EEE)",
      organization: "Pabna University of Science and Technology (PUST)",
      location: "Pabna-6600, Bangladesh",
      email: "arif.eee@pust.ac.bd",
      phone: "+88 01745363828",
      relationType: "Academic"
    },
    {
      id: "ref-3",
      name: "Md. Majidur Rahman",
      title: "Assistant Manager",
      department: "IP Network, NP",
      organization: "Fiber@Home Ltd.",
      location: "Gulshan-1, Dhaka-1212, Bangladesh",
      email: "majidur.rahman@fiberathome.net",
      phone: "+8801847183588",
      relationType: "Professional"
    },
    {
      id: "ref-4",
      name: "Md. Sarzil Mehrab",
      title: "Deputy Manager",
      department: "SCM Department",
      organization: "SANYO Engineering & Construction Inc. (Bangladesh Branch)",
      location: "Dhaka, Bangladesh",
      email: "sarzil@secbangla.com",
      phone: "+88 01728-654545",
      relationType: "Professional"
    }
  ],

  announcements: [
    {
      id: "ann-1",
      title: "Paper Accepted in Elsevier's 'Measurement' Journal",
      content: "Our paper 'ARTHX-Net: A Hybrid Transformer-XGBoost Framework for Motor Imagery EEG Decoding with Adaptive Feature Recalibration and Glowworm Swarm Optimization' has been officially accepted in Measurement (Elsevier).",
      date: "February 2026",
      tag: "Publication",
      active: true
    },
    {
      id: "ann-2",
      title: "New Springer Journal Publication Published Online",
      content: "Our paper 'Cross-Architecture Evaluation for Multi-Class Driver State Recognition: Unveiling the Performance Gap Between Hybrid Transformers and GNNs' is published online in Signal, Image and Video Processing (DOI: 10.1007/s11760-026-05162-3).",
      date: "February 2026",
      tag: "Publication",
      link: "https://doi.org/10.1007/s11760-026-05162-3",
      active: true
    },
    {
      id: "ann-3",
      title: "Nokia PSS 1830 L-Band Expansion Deployment Ongoing",
      content: "Actively contributing to national DWDM optical transmission capacity expansion at Fiber@Home Ltd., deploying ROADM and L-Band equipment across Central Offices.",
      date: "January 2026",
      tag: "Industry",
      active: true
    }
  ],

  messages: []
};
