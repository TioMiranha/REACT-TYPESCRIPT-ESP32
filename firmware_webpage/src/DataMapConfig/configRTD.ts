import type { ValidationConfig, ValidationResult } from "../model/ValidationModel";
import { ValidationInputWifi } from "../DataValidation/DataInputWifi";

export function validateCredentialsWifi(
  tagName: string,
  tempFalha: string,
  minRange: string,
  maxRange: string,
  e?: React.FormEvent<HTMLFormElement>
): ValidationResult {

  const rtdConfig: ValidationConfig = {
    tagName: {
      required: true,
      minLength: 3,
      maxLength: 15,
      customMessage: "Nome da Tag inválido"
    },

    tempFalha: {
      required: true,
      customMessage: "Temperatura de falha inválida"
    },
    minRange: {
      required: true,
      customMessage: "Min Range inválido"
    },
    maxRange: {
      required: true,
      minLength: 3,
      maxLength: 25,
      customMessage: "Max Range inválido"
    },
  };

  // Passe todos os campos juntos
  return ValidationInputWifi(
    { tagName, tempFalha, minRange, maxRange },
    rtdConfig,
    e
  );
}
