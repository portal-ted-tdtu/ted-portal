// ./app/router.js

import { authRouter } from "../modules/auth/routers/authRouter.js";
// import { userRouter } from "../modules/users/userRouter.js";
// import { eventRouter } from "../modules/events/eventRouter.js";

// import { departmentRouter } from "../modules/departments/departmentRouter.js";
// import { facultyRouter } from "../modules/faculties/facultyRouter.js";
// import { generationRouter } from "../modules/generations/generationRouter.js";
// import { roleRouter } from "../modules/roles/roleRouter.js";
// import { mistakeRouter } from "../modules/mistakes/mistakeRouter.js";
// import { schoolYearRouter } from "../modules/schoolYears/schoolYearRouter.js";
// import { eventTypeRouter } from "../modules/eventTypes/eventTypeRouter.js";
// import { eventStatusRouter } from "../modules/eventStatus/eventStatusRouter.js";

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
    // {
    //     prefix: "/api/departments",
    //     handler: departmentRouter
    // },
    // {
    //     prefix: "/api/faculties",
    //     handler: facultyRouter
    // },
    // {
    //     prefix: "/api/generations",
    //     handler: generationRouter
    // },
    // {
    //     prefix: "/api/roles",
    //     handler: roleRouter
    // },
    // {
    //     prefix: "/api/mistakes",
    //     handler: mistakeRouter
    // },
    // {
    //     prefix: "/api/school-years",
    //     handler: schoolYearRouter
    // },
    // {
    //     prefix: "/api/event-types",
    //     handler: eventTypeRouter
    // },
    // {
    //     prefix: "/api/event-status",
    //     handler: eventStatusRouter
    // }
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