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
    | 'email'
    | 'number'
    | 'date'
    | 'select'
    | 'checkbox'
    | 'autocomplete'
    | 'multi-select';
  required?: boolean;
  options?: { value: any; label: string }[]; // For select, autocomplete, and multi-select fields
  disabled?: boolean;
}
