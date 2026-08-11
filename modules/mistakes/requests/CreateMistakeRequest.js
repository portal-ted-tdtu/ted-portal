// modules/mistakes/requests/CreateMistakeRequest.js

export const CreateMistakeRequest = {

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