// modules/schoolYears/repositories/getSchoolYearListRepository.js

import { all } from "../../../database/query.js";

export class getSchoolYearListRepository {

    constructor(db) {
        this.db = db;
    }

    async getSchoolYearList(keyword, limit, offset) {

        return await all(
            this.db,
            `
            SELECT
                school_year_id,
                school_year_name,
                date_start,
                date_end,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM SCHOOL_YEARS
            WHERE (
                ? IS NULL
                OR school_year_name LIKE ?
            )
            ORDER BY school_year_id DESC
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