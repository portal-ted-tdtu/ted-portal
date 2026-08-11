export function apiResponse({
    success = true,
    message = "",
    data = null,
    errors = [],
    paging = null,
    status = 200
}) {

    return Response.json(
        {
            success,
            message,
            data,
            errors,
            paging
        },
        {
            status
        }
    );
}