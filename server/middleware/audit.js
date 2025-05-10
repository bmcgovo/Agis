// server/middleware/audit.js
const db = require('../db'); // Adjust the path as needed to your db module

const logAction = (userId, action, record) => {
    db.query(
      `INSERT INTO audit_log (user_id, action_type, affected_record)
       VALUES ($1, $2, $3)`,
      [userId, action, JSON.stringify(record)]
    );
  };
  