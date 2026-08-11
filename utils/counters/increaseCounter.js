// src/utils/counters/increaseCounter.js

import { run } from "../../database/query.js";

export async function increaseCounter(db, tableName, prefix, length = 3) {

    await run(
        db,
        `
        INSERT INTO COUNTERS
        (
            table_name,
            prefix,
            current,
            length
        )
        VALUES
        (
            ?,
            ?,
            1,
            ?
        )
        ON CONFLICT(table_name, prefix)
        DO UPDATE SET
            current = current + 1
        `,
        [tableName, prefix, length]
    );
}