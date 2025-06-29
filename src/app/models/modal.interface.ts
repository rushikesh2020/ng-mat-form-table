export interface DialogData {
  data: any;
  fields: FormFieldConfig[];
  title: string;
}

export interface FormFieldConfig {
  key: string;
  label: string;
  type:
    | 'text'
    | 'number'
    | 'autocomplete'
    | 'radio';
  required?: boolean;
  options?: { value: any; label: string }[]; // For autocomplete and radio fields
  disabled?: boolean;
}
