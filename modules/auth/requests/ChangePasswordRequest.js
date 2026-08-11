// src/modules/auth/requests/ChangePasswordRequest.js

export const ChangePasswordRequest = {
    old_password: {
        required: true,
        type: "string",
        maxLength: 255
    },

    new_password: {
        required: true,
        type: "string",
        maxLength: 255
    }
};