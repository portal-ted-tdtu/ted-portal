// modules/roles/repositories/getRoleListRepository.js

import { all } from "../../../database/query.js";

export class getRoleListRepository {

    constructor(db) {
        this.db = db;
    }

    async getRoleList(keyword, limit, offset) {

        return await all(
            this.db,
            `
            SELECT
                role_id,
                role_name,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM ROLES
            WHERE (
                ? IS NULL
                OR role_name LIKE ?
            )
            ORDER BY role_id
            LIMIT ?
            OFFSET ?
            `,
            [
                keyword,
                keyword ? `%${keyword}%` : null,
                limit,
                offset
            ]
        );
    }
}