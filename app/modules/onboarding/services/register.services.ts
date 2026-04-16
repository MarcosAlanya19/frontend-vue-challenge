import { existsByDocument } from "~/modules/auth/services/exists-by-document.services";
import { existsByEmail } from "~/modules/auth/services/exists-by-email.services";
import { existsByPhone } from "~/modules/auth/services/exists-by-phone.services";
import { saveUser } from "~/modules/auth/services/save-user.services";
import type { EDocumentType } from "~/modules/auth/enums/document-type.enum";
import type { APIError } from "~/types";
import type { IRegisterPayload } from "~/modules/onboarding/types/register-payload.type";
import { generateEmail } from "~/modules/onboarding/lib/generateEmail";
import { MOCK_PASSWORD } from "~/modules/onboarding/constants";

interface IRegister {
  payload: IRegisterPayload;
}

export const register = ({ payload }: IRegister): string => {
  if (
    existsByDocument({
      payload: {
        documentType: payload.documentType,
        documentNumber: payload.documentNumber,
      },
    })
  ) {
    throw {
      success: false,
      data: {
        name: "DUPLICATE_DNI",
        title: "Documento en uso",
        message: "El número de documento registrado ya está en uso.",
      },
    } satisfies APIError;
  }

  if (existsByPhone({ payload: { phone: payload.phone } })) {
    throw {
      success: false,
      data: {
        name: "DUPLICATE_PHONE",
        title: "Teléfono en uso",
        message: "El número de teléfono registrado ya está en uso.",
      },
    } satisfies APIError;
  }

  const email = generateEmail(payload.fullName);

  if (existsByEmail({ payload: { email } })) {
    throw {
      success: false,
      data: {
        name: "DUPLICATE_EMAIL",
        title: "Correo en uso",
        message:
          "El correo generado ya está en uso. Intenta con un nombre diferente.",
      },
    } satisfies APIError;
  }

  saveUser({
    payload: {
      user: {
        email,
        password: MOCK_PASSWORD,
        fullName: payload.fullName,
        documentType: payload.documentType as EDocumentType,
        documentNumber: payload.documentNumber,
        phone: payload.phone,
        birthDate: payload.birthDate,
      },
    },
  });

  return email;
};
