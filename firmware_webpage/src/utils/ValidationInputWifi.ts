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

export function validateWifi(
  IP?: string,
  Gateway?: string,
  Mask?: string,
  DNS?: string,
  MAC?: string,
  e?: React.FormEvent<HTMLFormElement>
): ValidationResult {
  const config: ValidationConfig = {
    IP: {
      required: true,
      minLength: 7,
      maxLength: 15,
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      customMessage: "IP inválido"
    },
    Gateway: {
      required: true,
      minLength: 7,
      maxLength: 15,
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      customMessage: "Gateway inválido"
    },
    Mask: {
      required: true,
      minLength: 9,
      maxLength: 15,
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      customMessage: "Máscara inválida"
    },
    DNS: {
      required: DNS !== undefined,
      minLength: 7,
      maxLength: 15,
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      customMessage: "DNS inválido"
    },
    MAC: {
      required: MAC !== undefined,
      minLength: 11,
      maxLength: 17,
      pattern: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,
      customMessage: "MAC inválido"
    },
  };

  return ValidationInputWifi({ IP, Gateway, Mask, DNS, MAC }, config, e);
}

export function validateCredentialsWifi(
  apIP: string,
  apGateway: string,
  apMask: string,
  apNetWorkName: string,
  apPassword: string,
  e?: React.FormEvent<HTMLFormElement>
): ValidationResult {

  const apConfig: ValidationConfig = {
    apIP: {
      required: true,
      minLength: 7,
      maxLength: 15,
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      customMessage: "IP inválido"
    },

    apGateway: {
      required: true,
      minLength: 7,
      maxLength: 15,
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      customMessage: "Gateway inválido"
    },
    apMask: {
      required: true,
      minLength: 9,
      maxLength: 15,
      pattern: /^(?:\d{1,3}\.){3}\d{1,3}$/,
      customMessage: "Máscara inválida"
    },
    apNetWorkName: {
      required: true,
      minLength: 3,
      maxLength: 25
    },
    apPassword: {
      required: true,
      minLength: 3,
      maxLength: 25
    }
  };

  // Passe todos os campos juntos
  return ValidationInputWifi(
    { apIP, apGateway, apMask, apNetWorkName, apPassword },
    apConfig,
    e
  );

}