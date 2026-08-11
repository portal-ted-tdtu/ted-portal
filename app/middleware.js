// ./app/middleware.js

export async function executeMiddlewares(
    ctx,
    middlewares = []
) {
    for (const middleware of middlewares) {
        await middleware(ctx);
    }
}