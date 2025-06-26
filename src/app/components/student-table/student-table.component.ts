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
  dataSource = new MatTableDataSource<Student>();

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

  studentFields: FormFieldConfig[] = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'moderator', label: 'Moderator' },
      ],
    },
    { key: 'isActive', label: 'Active', type: 'checkbox' },
  ];

  constructor(
    private studentService: StudentDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Subscribe to the student list from the service
    this.studentService.students$.subscribe((students) => {
      this.dataSource.data = students;
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
        fields: this.studentFields,
        title: 'Edit User',
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
