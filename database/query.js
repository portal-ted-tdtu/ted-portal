// ./database/query.js

export async function first(db, sql, params = []) {

    const stmt = db
        .prepare(sql)
        .bind(...params);

    return await stmt.first();
}

export async function all(db, sql, params = []) {

    const stmt = db
        .prepare(sql)
        .bind(...params);

    const result = await stmt.all();

    return result.results || [];
}

export async function run(db, sql, params = []) {

    const stmt = db
        .prepare(sql)
        .bind(...params);

    return await stmt.run();
}

export async function batch(db, queries = []) {

    const statements = queries.map(item =>
        db
            .prepare(item.sql)
            .bind(...(item.params || []))
    );

    return await db.batch(statements);
}

export async function exists(
    db,
    sql,
    params = []
) {

    const result = await first(
        db,
        sql,
        params
    );

    return !!result;
}

export async function count(
    db,
    sql,
    params = []
) {

    const result = await first(
        db,
        sql,
        params
    );

    return result?.total || 0;
}

export async function foreignKeyReferences(
    db,
    referencedTable,
    referencedColumn,
    referencedId
) {

    const tables = await all(
        db,
        `
        SELECT
            name
        FROM sqlite_master
        WHERE
            type = 'table'
            AND name NOT LIKE 'sqlite_%'
        ORDER BY name
        `
    );

    const references = [];

    for (const table of tables) {

        const tableName = table.name;

        if (tableName === referencedTable) {
            continue;
        }

        const foreignKeys = await all(
            db,
            `
            PRAGMA foreign_key_list("${tableName}")
            `
        );

        for (const foreignKey of foreignKeys) {

            if (
                foreignKey.table !== referencedTable
            ) {
                continue;
            }

            if (
                referencedColumn &&
                foreignKey.to !== referencedColumn
            ) {
                continue;
            }

            const fromColumn = foreignKey.from;

            const result = await all(
                db,
                `
                SELECT
                    COUNT(*) total
                FROM "${tableName}"
                WHERE "${fromColumn}" = ?
                `,
                [referencedId]
            );

            const total =
                Number(
                    result?.[0]?.total || 0
                );

            if (total > 0) {

                references.push({
                    table_name: tableName,
                    column_name: fromColumn,
                    referenced_table: foreignKey.table,
                    referenced_column: foreignKey.to,
                    total
                });
            }
        }
    }

    return references;
}