// modules/users/validations/updateUserValidation.js

import { ValidationError } from "../../../shared/errors/ValidationError.js";
import { UpdateUserRequest } from "../requests/UpdateUserRequest.js";

export function updateUserValidation(body) {
    const errors = [];

    for (const [field, rule] of Object.entries(UpdateUserRequest)) {
        if (!Object.prototype.hasOwnProperty.call(body || {}, field)) continue;

        const value = body[field];

        if (value === null) continue;

        if (rule.type === "string" && typeof value !== "string") {
            errors.push({ field, message: `${field} must be a string` });
        }

        if (rule.type === "number" && (typeof value !== "number" || Number.isNaN(value))) {
            errors.push({ field, message: `${field} must be a number` });
        }

        if (rule.maxLength && typeof value === "string" && value.length > rule.maxLength) {
            errors.push({ field, message: `${field} must not exceed ${rule.maxLength} characters` });
        }
    }

    if (body?.sex !== undefined && body?.sex !== null && ![0, 1].includes(body.sex)) {
        errors.push({ field: "sex", message: "sex must be 0 or 1" });
    }

    if (body?.is_active !== undefined && body?.is_active !== null && ![0, 1].includes(body.is_active)) {
        errors.push({ field: "is_active", message: "is_active must be 0 or 1" });
    }

    if (errors.length > 0) throw new ValidationError("Validation failed", errors);

    return true;
}