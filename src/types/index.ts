export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  badge?: string;
  result?: string;
  links?: { label: string; href: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
  initials?: string;
}
