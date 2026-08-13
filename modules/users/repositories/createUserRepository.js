// modules/users/repositories/createUserRepository.js

import { run } from "../../../database/query.js";

export class createUserRepository {
    constructor(db) { this.db = db; }

    async createUser(userId, userName, birthday, sex, studentId, studentEmail, facultyId, phone, email, password, departmentId, roleId, generationId, avatar, isActive, createdBy) {
        await run(this.db, `
            INSERT INTO USERS (
                user_id, user_name, birthday, sex, student_id, student_email,
                faculty_id, phone, email, password, department_id, role_id,
                generation_id, avatar, is_active, created_by, updated_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            userId, userName, birthday, sex, studentId, studentEmail,
            facultyId, phone, email, password, departmentId, roleId,
            generationId, avatar, isActive, createdBy, createdBy
        ]);
    }
}