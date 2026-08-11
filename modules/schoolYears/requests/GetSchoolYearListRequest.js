// src/modules/schoolYears/requests/GetSchoolYearListRequest.js

export const GetSchoolYearListRequest = {
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