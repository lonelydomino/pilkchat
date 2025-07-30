// Store active connections
const connections = new Map<string, ReadableStreamDefaultController>()

// Function to send message to specific user
export function sendMessageToUser(userId: string, message: any) {
  const controller = connections.get(userId)
  if (controller) {
    try {
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({
          type: 'new_message',
          message: message
        })}\n\n`)
      )
    } catch (error) {
      console.error('Error sending message to user:', error)
      connections.delete(userId)
    }
  }
}

// Function to send message to multiple users
export function sendMessageToUsers(userIds: string[], message: any) {
  userIds.forEach(userId => sendMessageToUser(userId, message))
}

// Function to get connections map
export function getConnections() {
  return connections
}

// Function to add connection
export function addConnection(userId: string, controller: ReadableStreamDefaultController) {
  connections.set(userId, controller)
}

// Function to remove connection
export function removeConnection(userId: string) {
  connections.delete(userId)
} 