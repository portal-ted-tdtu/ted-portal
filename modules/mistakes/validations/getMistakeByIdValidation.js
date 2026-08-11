// modules/mistakes/validations/getMistakeByIdValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";

import { GetMistakeByIdRequest } from "../requests/GetMistakeByIdRequest.js";

export function getMistakeByIdValidation(params) {

    validateRequest(
        params,
        GetMistakeByIdRequest
    );
}