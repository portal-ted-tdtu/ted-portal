// modules/mistakes/validations/createMistakeValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { CreateMistakeRequest } from "../requests/CreateMistakeRequest.js";

export function createMistakeValidation(body) {

    validateRequest(
        body,
        CreateMistakeRequest
    );
}