// ============================================
// TYPE DEFINITIONS
// ============================================
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  result: string;
  icon: React.ReactNode;
  details: {
    challenge: string;
    solution: string;
    impact: string;
    tech: string[];
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface Service {
  tier: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}