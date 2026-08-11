// ./shared/errors/AppError.js

export class AppError extends Error {

    constructor(
        message,
        statusCode = 500,
        errors = []
    ) {

        super(message);

        this.name = this.constructor.name;

        this.statusCode = statusCode;

        this.errors = errors;
    }
}