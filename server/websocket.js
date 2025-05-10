// server/websocket.js
import WebSocket from 'ws'
import { validateJWT } from './auth'

const wss = new WebSocket.Server({ noServer: true })

wss.on('connection', (ws, request) => {
  const token = request.url.split('token=')[1]
  const { role, caseAccess } = validateJWT(token)

  ws.on('message', (data) => {
    const message = JSON.parse(data)
    if (!verifyCaseAccess(message.caseId, caseAccess)) {
      return ws.close(4001, 'Unauthorized case access')
    }
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && 
          client.caseId === message.caseId) {
        client.send(JSON.stringify(message))
      }
    })
  })
})
wss.on('close', () => {
  console.log('WebSocket connection closed')
})
wss.on('error', (error) => {
  console.error('WebSocket error:', error)
}
)
export default wss


