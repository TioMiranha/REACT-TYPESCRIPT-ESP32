export type ValidationRule = {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: RegExp;
  customMessage?: string;
};

export type ValidationConfig = {
  [fieldName: string]: ValidationRule;
};

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};