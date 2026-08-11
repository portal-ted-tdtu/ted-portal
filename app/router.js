// ./app/router.js

import { authRouter } from "../modules/auth/routers/authRouter.js";
// import { userRouter } from "../modules/users/routers/userRouter.js";
// import { eventRouter } from "../modules/events/routers/eventRouter.js";

import { departmentRouter } from "../modules/departments/routers/departmentRouter.js";
import { eventStatusRouter } from "../modules/eventStatus/routers/eventStatusRouter.js";
import { eventTypeRouter } from "../modules/eventTypes/routers/eventTypeRouter.js";

import { facultyRouter } from "../modules/faculties/routers/facultyRouter.js";
import { generationRouter } from "../modules/generations/routers/generationRouter.js";
import { mistakeRouter } from "../modules/mistakes/routers/mistakeRouter.js";
import { roleRouter } from "../modules/roles/routers/roleRouter.js";
import { schoolYearRouter } from "../modules/schoolYears/routers/schoolYearRouter.js";


const ROUTES = [
    {
        prefix: "/api/auth",
        handler: authRouter
    },
    // {
    //     prefix: "/api/users",
    //     handler: userRouter
    // },
    // {
    //     prefix: "/api/events",
    //     handler: eventRouter
    // },
    {
        prefix: "/api/departments",
        handler: departmentRouter
    },
    {
        prefix: "/api/event-status",
        handler: eventStatusRouter
    },
    {
        prefix: "/api/event-types",
        handler: eventTypeRouter
    },
    {
        prefix: "/api/faculties",
        handler: facultyRouter
    },
    {
        prefix: "/api/generations",
        handler: generationRouter
    },
    {
        prefix: "/api/mistakes",
        handler: mistakeRouter
    },
    {
        prefix: "/api/roles",
        handler: roleRouter
    },
    {
        prefix: "/api/school-years",
        handler: schoolYearRouter
    },
];

export async function router(ctx) {

    const url = new URL(ctx.request.url);

    const path = url.pathname;

    for (const route of ROUTES) {
        if (path.startsWith(route.prefix)) {
            return await route.handler(ctx);
        }
    }

    return new Response(
        JSON.stringify({
            success: false,
            message: "Route not found"
        }),
        {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}