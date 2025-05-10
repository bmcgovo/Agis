-- server/db/migrations/20240510090000_create_audit_log.sql
CREATE TABLE audit_log (
  event_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  affected_record JSONB NOT NULL
);

COMMENT ON TABLE audit_log IS 'AGIS 4.4-compliant audit trail for all system actions';
COMMENT ON COLUMN audit_log.affected_record IS 'JSON structure of modified record pre/post change';

