// ./app/context.js

import { getBindings } from "./bindings.js";

export function createContext(
    request,
    env
) {

    return {

        request,

        env,

        bindings:
            getBindings(env),

        body: null,

        query: {},

        params: [],

        user: null,

        startTime:
            Date.now()
    };
}