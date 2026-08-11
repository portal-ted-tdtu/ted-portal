// modules/roles/validations/getRoleListValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { GetRoleListRequest } from "../requests/GetRoleListRequest.js";

export function getRoleListValidation(query) {
    validateRequest(query, GetRoleListRequest);
}