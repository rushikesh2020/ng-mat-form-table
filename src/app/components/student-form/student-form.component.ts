import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentDataService } from '../../services/student-data.service';
import { Student } from '../../models/student.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
  ],
  standalone: true,
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  editingStudentId: string | null = null; // Track id of editing a student

  electives = [
    'Artificial Intelligence & Machine Learning',
    'Robotics & Automation',
    'Electric Vehicle Technology',
    'Business Analytics',
    'Supply Chain Management',
  ];

  branches = [
    'Computer Science & Engineering (CSE)',
    'Electronics & Communication Engineering (ECE)',
    'Mechanical Engineering (ME)',
    'Chemical Engineering (ChE)',
    'Information Technology (IT)',
  ];

  // Filtered branches for autocomplete
  filteredBranches: string[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentDataService
  ) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      year: ['', Validators.required],
      electives: this.fb.array(
        this.electives.map(() => this.fb.control(false))
      ), // Initialize FormArray for electives
      branch: [''],
    });

    // Subscribe to the student being edited
    this.studentService.studentToEdit$.subscribe((student) => {
      if (student) {
        this.editingStudentId = student.id; // Track the editing ID
        this.studentForm.patchValue({
          ...student,
          electives: this.electives.map((elective) =>
            student.electives.includes(elective)
          ), // Set the checkboxes based on the student's electives
        });
      } else {
        this.editingStudentId = null;
        this.studentForm.reset(); // Clear form for new student
      }
    });

    // Autocomplete filter logic for branches
    this.studentForm.get('branch')?.valueChanges.subscribe((value) => {
      this.filteredBranches = this.filterBranches(value || '');
    });
  }

  // Filter branches based on user input
  private filterBranches(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.branches.filter((branch) =>
      branch.toLowerCase().includes(filterValue)
    );
  }

  // Form submission
  onSubmit() {
    if (this.studentForm.valid) {
      const selectedElectives = this.studentForm.value.electives
        .map((checked: boolean, i: number) =>
          checked ? this.electives[i] : null
        )
        .filter((v: string | null) => v !== null);

      const formData: Student = {
        id: this.editingStudentId || '',
        fullName: this.studentForm.value.fullName,
        email: this.studentForm.value.email,
        gender: this.studentForm.value.gender,
        year: this.studentForm.value.year,
        electives: selectedElectives,
        branch: this.studentForm.value.branch || '',
      };

      if (this.editingStudentId) {
        // Update existing student
        this.studentService.updateStudent(this.editingStudentId, formData);
      } else {
        // Add new student
        this.studentService.addStudent(formData);
      }

      this.studentService.clearStudentToEdit(); // Clear editing state
    }
  }
}
