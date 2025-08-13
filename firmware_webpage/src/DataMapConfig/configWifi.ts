import { ValidationInputWifi } from "../DataValidation/DataInputWifi";
import type { ValidationConfig, ValidationResult } from "../model/ValidationModel";

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