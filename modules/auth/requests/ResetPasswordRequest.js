// modules/auth/requests/ResetPasswordRequest.js

export const ResetPasswordRequest = {
    student_id: {
        required: true,
        type: "string",
        maxLength: 20
    }
};