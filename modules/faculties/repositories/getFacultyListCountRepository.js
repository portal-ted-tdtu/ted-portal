// src/modules/faculties/repositories/getFacultyListCountRepository.js

import { first } from "../../../database/query.js";

export class getFacultyListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(keyword) {

        const result = await first(
            this.db,
            `
            SELECT COUNT(*) total
            FROM FACUTIES
            WHERE (
                ? IS NULL
                OR faculty_name LIKE ?
            )
            `,
            [
                keyword,
                keyword ? `%${keyword}%` : null
            ]
        );

        return result.total;
    }
}