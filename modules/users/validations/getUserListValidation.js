// modules/users/validations/getUserListValidation.js

import { ValidationError } from "../../../shared/errors/ValidationError.js";
import { SYSTEM } from "../../../shared/constants/system.js";

export function getUserListValidation(query = {}) {
    const errors = [];

    const page = Number(query.page ?? SYSTEM.DEFAULT_PAGE);
    const pageSize = Number(query.page_size ?? SYSTEM.DEFAULT_PAGE_SIZE);

    if (!Number.isInteger(page) || page < 1) {
        errors.push({ field: "page", message: "page must be a positive integer" });
    }

    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > SYSTEM.MAX_PAGE_SIZE) {
        errors.push({ field: "page_size", message: `page_size must be between 1 and ${SYSTEM.MAX_PAGE_SIZE}` });
    }

    if (query.sex !== undefined && query.sex !== "" && ![0, 1].includes(Number(query.sex))) {
        errors.push({ field: "sex", message: "sex must be 0 or 1" });
    }

    if (query.is_active !== undefined && query.is_active !== "" && ![0, 1].includes(Number(query.is_active))) {
        errors.push({ field: "is_active", message: "is_active must be 0 or 1" });
    }

    if (errors.length > 0) throw new ValidationError("Validation failed", errors);

    return true;
}