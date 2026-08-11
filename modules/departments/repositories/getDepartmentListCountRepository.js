// repositories/getDepartmentListCountRepository.js

import { first } from "../../../database/query.js";

export class getDepartmentListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(keyword) {

        const result =
            await first(
                this.db,
                `
                SELECT
                    COUNT(*) total
                FROM DEPARTMENTS
                WHERE (
                    ? IS NULL
                    OR department_name LIKE ?
                )
                `,
                [
                    keyword,
                    keyword
                        ? `%${keyword}%`
                        : null
                ]
            );

        return result.total;
    }
}