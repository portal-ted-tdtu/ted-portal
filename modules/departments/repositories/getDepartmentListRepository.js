// repositories/getDepartmentListRepository.js

import { all } from "../../../database/query.js";

export class getDepartmentListRepository {

    constructor(db) {
        this.db = db;
    }

    async getDepartmentList(
        keyword,
        limit,
        offset
    ) {

        return await all(
            this.db,
            `
            SELECT
                department_id,
                department_name,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM DEPARTMENTS
            WHERE (
                ? IS NULL
                OR department_name LIKE ?
            )
            ORDER BY department_name
            LIMIT ?
            OFFSET ?
            `,
            [
                keyword,
                keyword
                    ? `%${keyword}%`
                    : null,
                limit,
                offset
            ]
        );
    }
}