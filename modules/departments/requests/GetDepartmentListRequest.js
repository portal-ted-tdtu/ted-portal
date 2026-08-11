// modules\departments\requests\GetDepartmentListRequest.js

export const GetDepartmentListRequest = {
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