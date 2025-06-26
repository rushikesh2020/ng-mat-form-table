import { FormFieldConfig } from './modal.interface';

export interface Student {
  id: string; // Unique ID for the student
  fullName: string; // Full name of the student
  email: string; // Contact email
  gender: string; // Gender
  year: string; // Class Year
  electives: string[]; // Array of electives selected
  branch: string; // Engineering branch
}

export const AVAILABLE_ELECTIVES = [
  'Machine Learning',
  'Data Structures',
  'Web Development',
  'Mobile App Development',
  'Database Management',
  'Artificial Intelligence',
  'Computer Networks',
  'Software Engineering',
  'Cybersecurity',
  'Cloud Computing',
];

// Available branches for autocomplete
export const AVAILABLE_BRANCHES = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics and Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
  'Biotechnology',
  'Industrial Engineering',
];

// Student fields configuration for the generic dialog
export const studentFields: FormFieldConfig[] = [
  {
    key: 'fullName',
    label: 'Full Name',
    type: 'text',
    required: true,
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    key: 'gender',
    label: 'Gender',
    type: 'select',
    required: true,
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    key: 'year',
    label: 'Year',
    type: 'select',
    required: true,
    options: [
      { value: '1st Year', label: '1st Year' },
      { value: '2nd Year', label: '2nd Year' },
      { value: '3rd Year', label: '3rd Year' },
      { value: 'Final Year', label: 'Final Year' },
    ],
  },
  {
    key: 'branch',
    label: 'Branch',
    type: 'autocomplete', // We'll need to add this type to the dialog
    required: true,
    options: AVAILABLE_BRANCHES.map((branch) => ({
      value: branch,
      label: branch,
    })),
  },
  {
    key: 'electives',
    label: 'Electives',
    type: 'multi-select', // We'll need to add this type to the dialog
    required: false,
    options: AVAILABLE_ELECTIVES.map((elective) => ({
      value: elective,
      label: elective,
    })),
  },
];
