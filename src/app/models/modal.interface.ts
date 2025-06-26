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
}
