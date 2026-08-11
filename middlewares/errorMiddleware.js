// ./middlewares/errorMiddleware.js

import { apiResponse
 } from "../shared/responses/apiResponse.js";

import { AppError
 } from "../shared/errors/AppError.js";

/**
 * Global error handler
 *
 * @param {Error} error
 */
export function errorMiddleware(
    error
) {

    if (
        error instanceof AppError
    ) {

        return apiResponse({
            success: false,
            message:
                error.message,
            errors:
                error.errors,
            status:
                error.statusCode
        });
    }

    console.error(error);

    return apiResponse({
        success: false,
        message:
            "Internal server error",
        status: 500
    });
}