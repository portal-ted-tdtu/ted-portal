// src/modules/faculties/repositories/getFacultyListRepository.js

import { all } from "../../../database/query.js";

export class getFacultyListRepository {

    constructor(db) {
        this.db = db;
    }

    async getFacultyList(keyword, limit, offset) {

        return await all(
            this.db,
            `
            SELECT
                faculty_id,
                faculty_name,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM FACUTIES
            WHERE (
                ? IS NULL
                OR faculty_name LIKE ?
            )
            ORDER BY faculty_id
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