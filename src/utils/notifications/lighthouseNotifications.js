export const notifyAnnouncement = (socketConnection, message) => {
    if(socketConnection)
        socketConnection.send(JSON.stringify({
            type: 'new_announcement',
            message
        }))
}