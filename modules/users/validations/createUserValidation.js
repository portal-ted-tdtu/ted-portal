// modules/users/validations/createUserValidation.js

import { ValidationError } from "../../../shared/errors/ValidationError.js";
import { CreateUserRequest } from "../requests/CreateUserRequest.js";

export function createUserValidation(body) {
    const errors = [];

    for (const [field, rule] of Object.entries(CreateUserRequest)) {
        const value = body?.[field];

        if (rule.required && (value === undefined || value === null || value === "")) {
            errors.push({ field, message: `${field} is required` });
            continue;
        }

        if (value === undefined || value === null || value === "") continue;

        if (rule.type === "string" && typeof value !== "string") {
            errors.push({ field, message: `${field} must be a string` });
        }

        if (rule.type === "number" && (typeof value !== "number" || Number.isNaN(value))) {
            errors.push({ field, message: `${field} must be a number` });
        }

        if (rule.maxLength && typeof value === "string" && value.length > rule.maxLength) {
            errors.push({ field, message: `${field} must not exceed ${rule.maxLength} characters` });
        }

        if (rule.minLength && typeof value === "string" && value.length < rule.minLength) {
            errors.push({ field, message: `${field} must be at least ${rule.minLength} characters` });
        }
    }

    if (body?.user_id && !/^[A-Za-z0-9]{8}$/.test(body.user_id)) {
        errors.push({ field: "user_id", message: "user_id must contain exactly 8 letters or numbers" });
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