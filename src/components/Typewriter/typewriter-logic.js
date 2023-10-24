const timeoutIds = []
let container = undefined
const speedd = 150
let ii = 0;
const words = ["Teachers", "Recruiters", "Individuals", "Students"]
let index = -1;
const waitBeforeDelete = 1500
const acceleration = 50
let waitBeforeNextType = 200;

// document.querySelector("button").addEventListener("click",function(){
//     waitBeforeNextType = document.querySelector("input").value * 1000
//     words[0] = document.querySelector("#Text").value
// })


export const stopTypewriter = () => {
    for(let timeoutId of timeoutIds)
        clearTimeout(timeoutId)
}
export const startTypewriter = () => {
    container = document.querySelector(".container-typewriter")
    if (container) {
        container.innerHTML = ''
        helpTypeWrite()
    }
}
function helpTypeWrite(){
    index += 1
    if(index > words.length - 1)
        index = 0
    typeWrite(words[index])
}

function typeWrite(word){
    if(ii < word.length){
        container.innerHTML += (word[ii] + "<span class='pointer'>"+ '|' + "</span>")
        ii++
        const timeoutId = setTimeout(function(){helper(word)},waitBeforeNextType)
        timeoutIds.push(timeoutId)
    }
    else {
        timeoutIds.push(setTimeout(function () {
            deleteWord(word)
        }, waitBeforeDelete))
    }
}

function deleteWord(word){
    if(ii > 0){
        container.textContent = container.textContent.slice(0,ii - 1)
        ii--
        timeoutIds.push(setTimeout(function(){deleteWord(word)}, speedd - word.length * 11))
    }
    else
        helpTypeWrite()
}

function helper(word){
    container.textContent = container.textContent.slice(0, container.textContent.length - 1)
    timeoutIds.push(setTimeout(function(){typeWrite(word)},speedd - word.length * acceleration))
}