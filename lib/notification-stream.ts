// Store active connections
const connections = new Map<string, ReadableStreamDefaultController>()

// Function to send notification to a specific user
export function sendNotificationToUser(userId: string, notification: any) {
  const controller = connections.get(userId)
  if (controller) {
    try {
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify(notification)}\n\n`)
      )
    } catch (error) {
      console.error('Error sending notification:', error)
      connections.delete(userId)
    }
  }
}

// Function to broadcast notification to multiple users
export function sendNotificationToUsers(userIds: string[], notification: any) {
  userIds.forEach(userId => sendNotificationToUser(userId, notification))
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