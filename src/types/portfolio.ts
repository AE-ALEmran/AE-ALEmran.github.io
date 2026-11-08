export type PublicationType = 'journal' | 'ieee_conference' | 'under_review';
export type PublicationStatus = 'published' | 'accepted' | 'under_review';

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  publisher?: string;
  year: number;
  type: PublicationType;
  status: PublicationStatus;
  doi?: string;
  abstract?: string;
  category: string;
  impactFactor?: string;
  isCorrespondingAuthor?: boolean;
  isUndergradThesis?: boolean;
  bibtex?: string;
  keywords?: string[];
  pdfUrl?: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isPrimary?: boolean;
  tags: string[];
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  type: 'industry' | 'research';
  projectFocus?: string;
  responsibilities: string[];
  equipmentAndTools?: string[];
}

export interface IndustrialVisit {
  id: string;
  title: string;
  organization: string;
  location: string;
  date: string;
  type: 'Industrial Attachment' | 'Industrial Observation';
  highlights: string[];
  technicalExposure: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  description: string;
  highlights: string[];
  tools: string[];
  role?: string;
  link?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    highlight?: boolean;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  major: string;
  institution: string;
  location: string;
  duration: string;
  result: string;
  resultType: string;
  thesisTitle?: string;
  thesisStatus?: string;
  mediumOfInstruction?: string;
  details?: string[];
}

export interface LeadershipActivity {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  highlights: string[];
  awardOrRecognition?: string;
}

export interface PeerReviewItem {
  id: string;
  journal: string;
  publisher: string;
  scope: string;
  status: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  department: string;
  organization: string;
  location: string;
  email: string;
  phone?: string;
  relationType: 'Academic' | 'Professional';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: string;
  link?: string;
  active: boolean;
}

export interface PortfolioProfile {
  name: string;
  headline: string;
  shortBio: string;
  fullBio: string[];
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  bannerImage?: string;
  resumePdfUrl: string;
  academicResumePdfUrl: string;
  socialLinks: {
    linkedin: string;
    googleScholar: string;
    researchGate: string;
    ieeeXplorer: string;
    orcid?: string;
    github?: string;
  };
  metrics: {
    journalPapers: number;
    ieeeConferences: number;
    oralPresentations: number;
    totalCitationsEstimate?: string;
    peerReviewCount?: number;
  };
}

export interface PortfolioData {
  profile: PortfolioProfile;
  researchInterests: ResearchInterest[];
  publications: Publication[];
  experiences: Experience[];
  industrialVisits: IndustrialVisit[];
  projects: Project[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  leadership: LeadershipActivity[];
  peerReviews: PeerReviewItem[];
  references: ReferenceItem[];
  announcements: Announcement[];
  messages: ContactMessage[];
}
