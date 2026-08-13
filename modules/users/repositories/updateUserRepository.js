// modules/users/repositories/updateUserRepository.js

import { run } from "../../../database/query.js";

export class updateUserRepository {
    constructor(db) { this.db = db; }

    async updateUser(userId, fields, updatedBy) {
        const allowedFields = [
            "user_name",
            "birthday",
            "sex",
            "faculty_id",
            "phone",
            "email",
            "department_id",
            "role_id",
            "generation_id",
            "avatar",
            "is_active"
        ];

        const updates = [];
        const values = [];

        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(fields, field)) {
                updates.push(`${field} = ?`);
                values.push(fields[field]);
            }
        }

        if (updates.length === 0) return;

        updates.push("updated_by = ?");
        values.push(updatedBy);
        values.push(userId);

        await run(this.db, `
            UPDATE USERS
            SET ${updates.join(", ")}
            WHERE user_id = ?
        `, values);
    }

    async updateMyProfile(userId, fields, updatedBy) {
        const allowedFields = [
            "user_name",
            "birthday",
            "sex",
            "phone",
            "email",
            "avatar"
        ];

        const updates = [];
        const values = [];

        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(fields, field)) {
                updates.push(`${field} = ?`);
                values.push(fields[field]);
            }
        }

        if (updates.length === 0) return;

        updates.push("updated_by = ?");
        values.push(updatedBy);
        values.push(userId);

        await run(this.db, `
            UPDATE USERS
            SET ${updates.join(", ")}
            WHERE user_id = ?
        `, values);
    }
}