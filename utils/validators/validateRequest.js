// ./utils/validators/validateRequest.js

import { ValidationError
 } from "../../shared/errors/ValidationError.js";

export function validateRequest(
    body,
    schema
) {

    const errors = [];

    for (
        const [field, rules]
        of Object.entries(schema)
    ) {

        const value =
            body?.[field];

        /*
        Required
        */
        if (
            rules.required &&
            (
                value === undefined ||
                value === null ||
                value === ""
            )
        ) {

            errors.push({
                field,
                message:
                    `${field} is required`
            });

            continue;
        }

        /*
        Skip if null
        */
        if (
            value === undefined ||
            value === null
        ) {
            continue;
        }

        /*
        Type
        */
        if (
            rules.type &&
            typeof value !== rules.type
        ) {

            errors.push({
                field,
                message:
                    `${field} must be ${rules.type}`
            });

            continue;
        }

        /*
        Min Length
        */
        if (
            rules.minLength &&
            value.length <
            rules.minLength
        ) {

            errors.push({
                field,
                message:
                    `${field} minimum length is ${rules.minLength}`
            });
        }

        /*
        Max Length
        */
        if (
            rules.maxLength &&
            value.length >
            rules.maxLength
        ) {

            errors.push({
                field,
                message:
                    `${field} maximum length is ${rules.maxLength}`
            });
        }
    }

    if (
        errors.length > 0
    ) {

        throw new ValidationError(
            "Validation failed",
            errors
        );
    }
}