// server/monitoring.js
import { createLogger, transports } from 'winston'
import { Logtail } from '@logtail/node'

const logtail = new Logtail(process.env.LOGTAIL_KEY)

const complianceLogger = createLogger({
  level: 'info',
  transports: [
    new transports.Http({
      host: 'logs.agis-monitor.gov.au',
      path: '/v1/compliance',
      ssl: true
    })
    // Optionally add Logtail Winston transport here if available
  ]
})

// Optionally log to Logtail directly
export const logComplianceEvent = (event) => {
  const logObj = {
    message: 'AGIS Compliance Event',
    ...event,
    system: process.env.SYSTEM_ID,
    environment: process.env.NODE_ENV
  }
  complianceLogger.info(logObj)
  logtail.log(logObj) // Direct log to Logtail
}
