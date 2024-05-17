export const objectIn = (arr, obj) => {
    for(let arrEl of arr)
        if(arrEl.id === obj.id)
            return true
    return false
}

export const overdue = (targetTime, targetDate) => {
    const currentDate = new Date()
    const currentTime = currentDate.getTime()

    const targetStamp = new Date(`${targetDate}T${targetTime}Z`).getTime()

    return currentTime < targetStamp
}