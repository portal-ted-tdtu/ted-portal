// ./shared/errors/ForbiddenError.js

import { AppError } from "./AppError.js";

export class ForbiddenError
    extends AppError {

    constructor(
        message = "Forbidden"
    ) {

        super(
            message,
            403
        );
    }
}