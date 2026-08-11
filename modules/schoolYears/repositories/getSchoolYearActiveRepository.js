// modules/schoolYears/repositories/getSchoolYearActiveRepository.js

import { all } from "../../../database/query.js";

export class getSchoolYearActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getSchoolYearActive() {

        return await all(
            this.db,
            `
            SELECT
                school_year_id,
                school_year_name
            FROM SCHOOL_YEARS
            WHERE is_active = 1
            ORDER BY school_year_id DESC
            `
        );
    }
}