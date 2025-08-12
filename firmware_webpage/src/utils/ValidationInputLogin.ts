import { showMessage } from "../adapters/showMessage";
import type { ValidationConfig, ValidationResult } from "../model/ValidationModel";

export function ValidationInput(
  formData: { [key: string]: string },
  config: ValidationConfig,
  e?: React.FormEvent<HTMLFormElement>
): ValidationResult {
  if (e) e.preventDefault();

  const errors: string[] = [];

  for (const [fieldName, value] of Object.entries(formData)) {
    const rule = config[fieldName];
    if (!rule) continue;

    if (rule.required && !value.trim()) {
      errors.push(`${fieldName} é obrigatório`);
      continue;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors.push(`${fieldName} deve ter pelo menos ${rule.minLength} caracteres`);
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push(`${fieldName} deve ter no máximo ${rule.maxLength} caracteres`);
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.customMessage || `${fieldName} está em formato inválido`);
    }
  }

  const isValid = errors.length === 0;

  // Mostrar mensagens
  if (!isValid) {
    errors.forEach(error => showMessage.error(error));
  } else {
    showMessage.success('Sucesso!');
  }

  return { isValid, errors };
}

export function validateLogin(usuario: string, senha: string, e?: React.FormEvent<HTMLFormElement>) {
  const config: ValidationConfig = {
    usuario: {
      required: true,
      minLength: 3,
      maxLength: 25
    },
    senha: {
      required: true,
      minLength: 3,
      maxLength: 25
    }
  };
  return ValidationInput({ usuario, senha }, config, e);
}

export function validateEmail(email: string, e?: React.FormEvent<HTMLFormElement>) {
  const config: ValidationConfig = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      customMessage: 'Email inválido'
    }
  };

  return ValidationInput({ email }, config, e);
}