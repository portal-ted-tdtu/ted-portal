// ./utils/getBody.js

export async function getBody(
    request
) {

    const contentType =
        request.headers.get(
            "Content-Type"
        );

    if (
        contentType?.includes(
            "application/json"
        )
    ) {
        return await request.json();
    }

    return null;
}