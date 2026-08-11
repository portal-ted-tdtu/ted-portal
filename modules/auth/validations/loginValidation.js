// ./modules/auth/validations/loginValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { LoginRequest } from "../requests/LoginRequest.js";

export function loginValidation(
    body
) {

    validateRequest(
        body,
        LoginRequest
    );
}