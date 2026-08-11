// modules/schoolYears/repositories/createSchoolYearRepository.js

import { run } from "../../../database/query.js";

export class createSchoolYearRepository {

    constructor(db) {
        this.db = db;
    }

    async createSchoolYear(
        schoolYearId,
        schoolYearName,
        dateStart,
        dateEnd,
        createdBy
    ) {

        return await run(
            this.db,
            `
            INSERT INTO SCHOOL_YEARS
            (
                school_year_id,
                school_year_name,
                date_start,
                date_end,
                created_by,
                updated_by
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
            `,
            [
                schoolYearId,
                schoolYearName,
                dateStart,
                dateEnd,
                createdBy,
                createdBy
            ]
        );
    }
}