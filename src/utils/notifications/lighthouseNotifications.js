export const notifyAnnouncement = (socketConnection, message, url = undefined, lighthouseId = undefined) => {
    if(socketConnection)
        socketConnection.send(JSON.stringify({
            type: 'new_announcement',
            lighthouseId,
            url,
            message
        }))
}