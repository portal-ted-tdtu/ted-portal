// repositories/getDepartmentActiveRepository.js

import { all } from "../../../database/query.js";

export class getDepartmentActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getDepartmentActive() {

        return await all(
            this.db,
            `
            SELECT
                department_id,
                department_name
            FROM DEPARTMENTS
            WHERE is_active = 1
            ORDER BY department_id
            `
        );
    }
}