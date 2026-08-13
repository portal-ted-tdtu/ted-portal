// modules/users/validations/getUserByIdValidation.js

import { ValidationError } from "../../../shared/errors/ValidationError.js";

export function getUserByIdValidation(params = {}) {
    if (!params.user_id || typeof params.user_id !== "string") {
        throw new ValidationError("Validation failed", [
            { field: "user_id", message: "user_id is required" }
        ]);
    }

    return true;
}