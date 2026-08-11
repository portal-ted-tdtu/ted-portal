// modules\departments\validations\getDepartmentListValidation.js

import { validateRequest } from "../../../utils/validators/validateRequest.js";
import { GetDepartmentListRequest } from "../requests/GetDepartmentListRequest.js";

export function getDepartmentListValidation(query) {
    validateRequest(
        query,
        GetDepartmentListRequest
    );
}