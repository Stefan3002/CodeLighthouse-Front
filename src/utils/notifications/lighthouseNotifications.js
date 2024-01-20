export const notifyAnnouncement = (socketConnection, message, lighthouseId = undefined) => {
    if(socketConnection)
        socketConnection.send(JSON.stringify({
            type: 'new_announcement',
            lighthouseId,
            message
        }))
}