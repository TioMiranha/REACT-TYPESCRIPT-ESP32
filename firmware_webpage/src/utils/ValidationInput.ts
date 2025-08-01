import { showMessage } from "../adapters/showMessage";

type ValidationRule = {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: RegExp;
  customMessage?: string;
};

type ValidationConfig = {
  [fieldName: string]: ValidationRule;
};

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

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

export function ValidationInputWifi(
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

export function validateWifi(IP: string, Gateway: string, Mask: string, DNS: string, MAC: string, e?: React.FormEvent<HTMLFormElement>) {
  const config: ValidationConfig = {
    IP: {
      required: false,
      minLength: 11,
      maxLength: 11
    },
    Gateway: {
      required: false,
      minLength: 11,
      maxLength: 11
    },
    Mask: {
      required: false,
      minLength: 13,
      maxLength: 13
    },
    DNS: {
      required: false,
      minLength: 7,
      maxLength: 7
    },
    MAC: {
      required: false,
      minLength: 14,
      maxLength: 14
    },
  };

  return ValidationInputWifi({ IP, Gateway, Mask, DNS, MAC }, config, e);
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