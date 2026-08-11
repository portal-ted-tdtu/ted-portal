// modules/eventTypes/validations/getEventTypeListValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { GetEventTypeListRequest } from "../requests/GetEventTypeListRequest.js";

export function getEventTypeListValidation(query) {
    validateRequest(query, GetEventTypeListRequest);
}