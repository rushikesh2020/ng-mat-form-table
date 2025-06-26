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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface DialogData {
  data: any;
  fields: FormFieldConfig[];
  title: string;
}

export interface FormFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'select' | 'checkbox';
  required?: boolean;
  options?: { value: any; label: string }[]; // For select fields
  disabled: boolean;
}

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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.editForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const formControls: Record<string, any> = {};

    this.data.fields.forEach((field) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      // Handle different data types for initial values
      let initialValue = this.data.data[field.key];

      if (field.type === 'date' && initialValue) {
        initialValue = new Date(initialValue);
      }

      if (field.type === 'checkbox') {
        initialValue = !!initialValue;
      }

      formControls[field.key] = [
        { value: initialValue, disabled: field.disabled || false },
        validators,
      ];
    });

    this.editForm = this.fb.group(formControls);
  }

  onSave(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.getRawValue(); // getRawValue() includes disabled fields

      // Process form data before returning
      const processedData = { ...formValue };

      this.data.fields.forEach((field) => {
        if (field.type === 'date' && processedData[field.key]) {
          // Convert date to ISO string or your preferred format
          processedData[field.key] = processedData[field.key].toISOString();
        }
      });

      this.dialogRef.close(processedData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
