import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { CreateGenerationRequest } from "../requests/CreateGenerationRequest.js";

export function createGenerationValidation(body) {
    validateRequest(body, CreateGenerationRequest);
}