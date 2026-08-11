// modules/mistakes/validations/deleteMistakeValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { DeleteMistakeRequest } from "../requests/DeleteMistakeRequest.js";

export function deleteMistakeValidation(params) {

    validateRequest(
        params,
        DeleteMistakeRequest
    );
}