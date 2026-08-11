// src/modules/roles/repositories/getRoleActiveRepository.js

import { all } from "../../../database/query.js";

export class getRoleActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getRoleActive() {

        return await all(
            this.db,
            `
            SELECT
                role_id,
                role_name
            FROM ROLES
            WHERE is_active = 1
            ORDER BY role_id
            `
        );
    }
}