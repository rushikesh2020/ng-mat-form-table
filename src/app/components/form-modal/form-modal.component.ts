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
  filteredOptionsMap: { [key: string]: Observable<any[]> } = {};

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
    this.data.fields.forEach((field) => {
      if (field.type === 'autocomplete') {
        const control = this.editForm.get(field.key);
        if (control) {
          let options: { value: any; label: string }[] = [];
          // Use service for branch, otherwise use field.options
          if (field.key === 'branch') {
            options = this.studentDataService.getBranchOptions();
          } else if (field.options) {
            options = field.options;
          }
          this.filteredOptionsMap[field.key] = control.valueChanges.pipe(
            startWith(control.value || ''),
            map((value) => this.filterOptions(value || '', options))
          );
        }
      }
    });
  }

  private filterOptions(
    value: string,
    options: { value: any; label: string }[]
  ): { value: any; label: string }[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(field: FormFieldConfig): Observable<any[]> {
    return this.filteredOptionsMap[field.key] || [];
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
