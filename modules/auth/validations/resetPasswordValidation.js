// modules/auth/validations/resetPasswordValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { ResetPasswordRequest } from "../requests/ResetPasswordRequest.js";

export function resetPasswordValidation(body) {
    validateRequest(
        body,
        ResetPasswordRequest
    );
}