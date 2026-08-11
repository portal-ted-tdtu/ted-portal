// src/modules/faculties/repositories/getFacultyActiveRepository.js

import { all } from "../../../database/query.js";

export class getFacultyActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getFacultyActive() {

        return await all(
            this.db,
            `
            SELECT
                faculty_id,
                faculty_name
            FROM FACUTIES
            WHERE is_active = 1
            ORDER BY faculty_id
            `
        );
    }
}