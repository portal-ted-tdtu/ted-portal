// ./repositories/baseRepository.js

import {
    first,
    all,
    run
} from "../database/query.js";

export class BaseRepository {

    constructor(
        db,
        tableName,
        primaryKey
    ) {
        this.db = db;
        this.tableName = tableName;
        this.primaryKey = primaryKey;
    }

    async findById(id) {

        return first(
            this.db,
            `
            SELECT *
            FROM ${this.tableName}
            WHERE ${this.primaryKey} = ?
            `,
            [id]
        );
    }

    async findAll() {

        return all(
            this.db,
            `
            SELECT *
            FROM ${this.tableName}
            WHERE is_active = 1
            `
        );
    }

    async softDelete(id) {

        return run(
            this.db,
            `
            UPDATE ${this.tableName}
            SET is_active = 0
            WHERE ${this.primaryKey} = ?
            `,
            [id]
        );
    }
}