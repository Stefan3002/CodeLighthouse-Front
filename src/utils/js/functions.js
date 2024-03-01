export const objectIn = (arr, obj) => {
    for(let arrEl of arr)
        if(arrEl.id === obj.id)
            return true
    return false
}