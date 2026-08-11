// modules/eventStatus/validations/getEventStatusListValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { GetEventStatusListRequest } from "../requests/GetEventStatusListRequest.js";

export function getEventStatusListValidation(query) {
    validateRequest(query, GetEventStatusListRequest);
}