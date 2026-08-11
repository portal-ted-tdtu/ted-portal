// ./utils/basePagination.js

export function buildPagination(
    page = 1,
    pageSize = 20,
    total = 0
) {

    const totalPages =
        Math.ceil(
            total / pageSize
        );

    return {
        page,
        pageSize,
        total,
        totalPages
    };
}

export function buildOffset(
    page = 1,
    pageSize = 20
) {

    return (page - 1)
        * pageSize;
}