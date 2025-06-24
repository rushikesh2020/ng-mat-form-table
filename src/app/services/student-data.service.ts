import { Injectable } from '@angular/core';
import { Student } from '../models/student.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentDataService {
  private studentList = new BehaviorSubject<Student[]>([]);
  students$ = this.studentList.asObservable(); // Observable for components to subscribe to

  // BehaviorSubject to track the student being edited
  private studentToEdit = new BehaviorSubject<Student | null>(null);
  studentToEdit$ = this.studentToEdit.asObservable();

  constructor() {}

  // Generate a unique ID for each student
  private generateId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
    );
  }

  // Add a new student to the list
  addStudent(newStudent: Student) {
    const { id, ...studentData } = newStudent;
    const studentWithId: Student = { id: this.generateId(), ...studentData };
    const currentStudents = this.studentList.value;
    this.studentList.next([...currentStudents, studentWithId]);
  }

  // Update an existing student
  updateStudent(id: string, updatedStudent: Student) {
    const currentStudents = [...this.studentList.value];
    const index = currentStudents.findIndex((student) => student.id === id);
    if (index !== -1) {
      const { id: _, ...studentData } = updatedStudent;
      currentStudents[index] = { id, ...studentData }; // Retain ID and update data
      this.studentList.next(currentStudents);
    }
  }

  // Delete a student
  deleteStudent(id: string) {
    const currentStudents = this.studentList.value.filter(
      (student) => student.id !== id
    );
    this.studentList.next(currentStudents);
  }

  // Set the student to be edited
  setStudentToEdit(student: Student) {
    this.studentToEdit.next(student);
  }

  // Clear the student being edited
  clearStudentToEdit() {
    this.studentToEdit.next(null);
  }
}
