// modules/faculties/validations/getFacultyListValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { GetFacultyListRequest } from "../requests/GetFacultyListRequest.js";

export function getFacultyListValidation(query) {
    validateRequest(query, GetFacultyListRequest);
}