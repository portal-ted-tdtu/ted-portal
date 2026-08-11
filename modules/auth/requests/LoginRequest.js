// ./modules/auth/requests/LoginRequest.js

export const LoginRequest = {

    student_id: {
        required: true,
        type: "string",
        maxLength: 20
    },

    password: {
        required: true,
        type: "string",
        maxLength: 255
    }
};