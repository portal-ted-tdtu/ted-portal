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