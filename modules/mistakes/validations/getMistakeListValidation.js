// modules/mistakes/validations/getMistakeListValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { GetMistakeListRequest } from "../requests/GetMistakeListRequest.js";

export function getMistakeListValidation(query) {

    validateRequest(
        query,
        GetMistakeListRequest
    );
}