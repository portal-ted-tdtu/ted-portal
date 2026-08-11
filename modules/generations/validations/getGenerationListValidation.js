import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { GetGenerationListRequest } from "../requests/GetGenerationListRequest.js";

export function getGenerationListValidation(query) {
    validateRequest(query, GetGenerationListRequest);
}