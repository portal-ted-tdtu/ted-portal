// modules/mistakes/requests/GetMistakeListRequest.js

export const GetMistakeListRequest = {

    page: {
        required: false,
        type: "number"
    },

    page_size: {
        required: false,
        type: "number"
    },

    keyword: {
        required: false,
        type: "string",
        maxLength: 100
    },

    is_active: {
        required: false,
        type: "number"
    }
};