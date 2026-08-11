// src/modules/mistakes/requests/UpdateMistakeRequest.js

export const UpdateMistakeRequest = {

    mistake_id: {
        required: true,
        type: "string"
    },

    mistake_name: {
        required: true,
        type: "string",
        maxLength: 255
    },

    level: {
        required: true,
        type: "number"
    },

    is_active: {
        required: true,
        type: "number"
    }
};