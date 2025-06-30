import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { FormFieldConfig, DialogData } from '../../models/modal.interface';
import { map, Observable, startWith } from 'rxjs';
import { StudentDataService } from '../../services/student-data.service';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule,
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent implements OnInit {
  editForm: FormGroup;
  filteredOptions = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private studentDataService: StudentDataService
  ) {
    this.editForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.setupAutocomplete();
  }

  private buildForm(): void {
    const formControls: { [key: string]: any } = {};
    console.log('Data: ', this.data, 'formControls: ', formControls);
    this.data.fields.forEach((field) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      // Handle different data types for initial values
      let initialValue = this.data.data[field.key];

      formControls[field.key] = [
        { value: initialValue, disabled: field.disabled || false },
        validators,
      ];
    });

    this.editForm = this.fb.group(formControls);
  }

  private setupAutocomplete(): void {
    const branchControl = this.editForm.get('branch');

    if (!branchControl) return;

    const branchOptions = this.studentDataService.getBranchOptions();
    // this.filterBranchOptions(branchControl.valueChanges, branchOptions)

    this.filterBranchOptions(branchControl.valueChanges, branchOptions);
  }

  private filterBranchOptions(
    searchValue: any,
    branches: { [key: string]: string }
  ): string[] {
    const filterValue = searchValue.toLowerCase();
    return Object.keys(branches).filter((key) =>
      branches[key].toLowerCase().includes(filterValue)
    );
  }

  onSave(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.getRawValue();
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
