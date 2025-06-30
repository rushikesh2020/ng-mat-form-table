import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDataService } from '../../services/student-data.service';
import { Student } from '../../models/student.interface';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormFieldConfig } from '../../models/modal.interface';
import { studentFields } from '../../models/student.interface';
import { FormModalComponent } from '../form-modal/form-modal.component';

// import { MatDialog } from '@angular/material/dialog';
// import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
  ],
  standalone: true,
})
export class StudentTableComponent implements OnInit {
  // DataSource for the Material table
  initialData: Student[] = [
    {
      id: 'STU001',
      fullName: 'Alice Johnson',
      email: 'alice.johnson@university.edu',
      gender: 'Female',
      year: '2024',
      electives: ['Data Structures', 'Web Development', 'Machine Learning'],
      branch: 'Computer Science',
    },
    {
      id: 'STU002',
      fullName: 'Michael Chen',
      email: 'michael.chen@university.edu',
      gender: 'Male',
      year: '2023',
      electives: ['Circuit Design', 'Signal Processing', 'Control Systems'],
      branch: 'Electrical Engineering',
    },
    {
      id: 'STU003',
      fullName: 'Sarah Williams',
      email: 'sarah.williams@university.edu',
      gender: 'Female',
      year: '2025',
      electives: ['Thermodynamics', 'Fluid Mechanics', 'Heat Transfer'],
      branch: 'Mechanical Engineering',
    },
    {
      id: 'STU004',
      fullName: 'David Rodriguez',
      email: 'david.rodriguez@university.edu',
      gender: 'Male',
      year: '2024',
      electives: [
        'Structural Analysis',
        'Geotechnical Engineering',
        'Transportation',
      ],
      branch: 'Civil Engineering',
    },
    {
      id: 'STU005',
      fullName: 'Emily Davis',
      email: 'emily.davis@university.edu',
      gender: 'Female',
      year: '2023',
      electives: [
        'Organic Chemistry',
        'Process Control',
        'Biochemical Engineering',
      ],
      branch: 'Chemical Engineering',
    },
    {
      id: 'STU006',
      fullName: 'James Thompson',
      email: 'james.thompson@university.edu',
      gender: 'Male',
      year: '2025',
      electives: ['Database Systems', 'Cybersecurity', 'Software Engineering'],
      branch: 'Computer Science',
    },
    {
      id: 'STU007',
      fullName: 'Maria Garcia',
      email: 'maria.garcia@university.edu',
      gender: 'Female',
      year: '2024',
      electives: ['Power Systems', 'Renewable Energy', 'Electronics'],
      branch: 'Electrical Engineering',
    },
    {
      id: 'STU008',
      fullName: 'Robert Lee',
      email: 'robert.lee@university.edu',
      gender: 'Male',
      year: '2023',
      electives: ['Manufacturing', 'Robotics', 'Materials Science'],
      branch: 'Mechanical Engineering',
    },
  ];

  dataSource = new MatTableDataSource<Student>(this.initialData);

  // Columns to display in the table
  displayedColumns: string[] = [
    'fullName',
    'email',
    'gender',
    'year',
    'electives',
    'branch',
    'actions',
  ];

  constructor(
    private studentService: StudentDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Subscribe to the student list from the service
    this.studentService.students$.subscribe((students) => {
      this.dataSource.data = this.initialData;
    });
  }

  // Handle the Edit button click
  onEdit(student: Student) {
    // const studentCopy = { ...student, electives: Array.isArray(student.electives) ? student.electives : [] };
    // console.log(studentCopy);
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '500px',
      data: {
        data: student,
        fields: studentFields,
        title: 'Edit Student',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
    this.studentService.setStudentToEdit(student); // Pass the student to the service
  }

  // Handle the Delete button click
  onDelete(id: string) {
    this.studentService.deleteStudent(id);
  }
}
