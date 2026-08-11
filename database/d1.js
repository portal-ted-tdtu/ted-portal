// ./database/d1.js

export function getDatabase(env) {

    if (!env?.DB) {
        throw new Error("D1 Database binding not found");
    }

    return env.DB;
}