export interface Student {
  id: string; // Unique ID for the student
  fullName: string; // Full name of the student
  email: string; // Contact email
  gender: string; // Gender
  year: string; // Class Year
  electives: string[]; // Array of electives selected
  branch: string; // Engineering branch
}
