import { FormFieldConfig } from './modal.interface';

// This interface is for the student form only (not for the modal form)
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

// Student fields configuration for the student form (not for the modal)
export const studentFields: FormFieldConfig[] = [
  {
    key: 'fullName',
    label: 'Full Name',
    type: 'text',
    required: true,
  },
  {
    key: 'rollNumber',
    label: 'Roll Number',
    type: 'number',
    required: true,
  },
  {
    key: 'gender',
    label: 'Gender',
    type: 'radio',
    required: true,
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    key: 'branch',
    label: 'Branch',
    type: 'autocomplete',
    required: true,
  },
];
