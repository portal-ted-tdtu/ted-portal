// modules/mistakes/validations/updateMistakeValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { UpdateMistakeRequest } from "../requests/UpdateMistakeRequest.js";

export function updateMistakeValidation(body) {

    validateRequest(
        body,
        UpdateMistakeRequest
    );
}