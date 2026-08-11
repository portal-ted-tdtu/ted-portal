// src/modules/schoolYears/validations/getSchoolYearListValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { GetSchoolYearListRequest } from "../requests/GetSchoolYearListRequest.js";

export function getSchoolYearListValidation(query) {
    validateRequest(query, GetSchoolYearListRequest);
}