export interface Framework {
  id: string;
  name: string;
  categories: Category[];
  ratingScale: RatingScale[];
}

export interface Category {
  id: string;
  name: string;
}

export interface RatingScale {
  value: number;
  label: string;
  description: string;
}

export interface Assessment {
  employeeId: string;
  frameworkId: string;
  ratings: Record<string, number>;
  comments: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export const FRAMEWORKS: Framework[] = [
  {
    id: 'framework1',
    name: 'Leadership & Innovation Framework',
    categories: [
      { id: 'driving-results', name: 'Driving Results' },
      { id: 'delivering-expertise', name: 'Delivering Expertise' },
      { id: 'inspiring-others', name: 'Inspiring Others' },
      { id: 'continuous-improvement', name: 'Continuous Improvement & Innovation' }
    ],
    ratingScale: [
      { value: 5, label: 'Distinctive', description: 'Consistently exceeds expectations' },
      { value: 4, label: 'Very Strong', description: 'Frequently exceeds expectations' },
      { value: 3, label: 'Strong', description: 'Meets expectations consistently' },
      { value: 2, label: 'Needs Development', description: 'Partially meets expectations' },
      { value: 1, label: 'Did Not Meet', description: 'Does not meet expectations' }
    ]
  },
  {
    id: 'framework2',
    name: 'Project Management Framework',
    categories: [
      { id: 'project-management', name: 'Project & Task Management' },
      { id: 'stakeholder-engagement', name: 'Stakeholder Engagement' },
      { id: 'quality', name: 'Quality' },
      { id: 'strategic-initiatives', name: 'Strategic Initiatives' }
    ],
    ratingScale: [
      { value: 5, label: 'Significantly Exceeds', description: 'Far exceeds expectations' },
      { value: 4, label: 'Exceeds', description: 'Exceeds expectations' },
      { value: 3, label: 'Meets', description: 'Meets expectations' },
      { value: 2, label: 'Almost Met', description: 'Nearly meets expectations' },
      { value: 1, label: 'Did Not Meet', description: 'Does not meet expectations' }
    ]
  }
];