// modules/generations/requests/GetGenerationListRequest.js

export const GetGenerationListRequest = {
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
    }
};