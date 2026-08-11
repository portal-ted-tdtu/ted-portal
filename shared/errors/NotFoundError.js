// ./shared/errors/NotFoundError.js

import { AppError } from "./AppError.js";

export class NotFoundError
    extends AppError {

    constructor(
        message = "Data not found"
    ) {

        super(
            message,
            404
        );
    }
}