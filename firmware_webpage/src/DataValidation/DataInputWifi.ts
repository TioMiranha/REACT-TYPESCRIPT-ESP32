import { showMessage } from "../adapters/showMessage";
import type { ValidationConfig, ValidationResult } from "../model/ValidationModel";

export function ValidationInputWifi(
  formData: { [key: string]: string | undefined },
  config: ValidationConfig,
  e?: React.FormEvent<HTMLFormElement>
): ValidationResult {
  if (e) e.preventDefault();

  const errors: string[] = [];

  for (const [fieldName, rawValue] of Object.entries(formData)) {

    if (errors.length >= 2) {
      errors.push("Muitos inputs receberam um valor inválido");
      break;
    };

    const rule = config[fieldName];
    const value = rawValue ?? '';


    if (!rule) continue;

    if (rule.required && !value.trim()) {
      errors.push(`${fieldName} é obrigatório`);
      continue;
    }

    if (!rule.required && !value.trim()) {
      continue;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors.push(`${fieldName} deve ter pelo menos ${rule.minLength} caracteres`);
      continue;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push(`${fieldName} deve ter no máximo ${rule.maxLength} caracteres`);
      continue;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.customMessage || `${fieldName} está em formato inválido`);
      continue;
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
