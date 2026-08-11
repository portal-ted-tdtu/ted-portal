// src/modules/mistakes/validations/getMistakeDetailValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { GetMistakeDetailRequest } from "../requests/GetMistakeDetailRequest.js";

export function getMistakeDetailValidation(params) {

    validateRequest(
        params,
        GetMistakeDetailRequest
    );
}