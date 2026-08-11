// src/modules/auth/validations/changePasswordValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { ChangePasswordRequest } from "../requests/ChangePasswordRequest.js";

export function changePasswordValidation(body) {
    validateRequest(
        body,
        ChangePasswordRequest
    );
}