// ./app/bindings.js

export function getBindings(env) {
    return {
        db: env.DB,

        jwtSecret: env.JWT_SECRET,

        environment: env.ENVIRONMENT || "development",

        appName: env.APP_NAME || "TED-PORTAL"
    };
}