// shared/constants/permission.js

export const ROLE = {
    ADMIN: "ADMIN",
    CAPTAIN: "CAPTAIN",
    LEADER: "LEADER",
    DEPUTY: "DEPUTY",
    TREASURER: "TREASURER",
    MEMBER: "MEMBER",
    SUPPORTER: "SUPPORTER"
};

export const ROLE_GROUP = {
    MB: [
        ROLE.CAPTAIN,
        ROLE.LEADER,
        ROLE.DEPUTY
    ],

    TEAMLEAD: [
        ROLE.LEADER,
        ROLE.LEADER
    ]
};

export const DEPARTMENT = {
    PD: "PD",
    DD: "DD",
    PRD: "PRD"
};