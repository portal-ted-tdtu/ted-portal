// src/modules/schoolYears/repositories/getSchoolYearListCountRepository.js

import { first } from "../../../database/query.js";

export class getSchoolYearListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(keyword) {

        const result = await first(
            this.db,
            `
            SELECT COUNT(*) total
            FROM SCHOOL_YEARS
            WHERE (
                ? IS NULL
                OR school_year_name LIKE ?
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