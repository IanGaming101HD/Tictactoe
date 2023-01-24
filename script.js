let boxes = document.getElementsByClassName('box')
let playersTurn = 'x'

function onClick(element) {
    console.log(element)
    if (element.innerText === '') {
        element.innerText = playersTurn
        checkGrid(boxes, playersTurn, element)
        playersTurn = nextTurn(playersTurn)
    }
}

function nextTurn(playersTurn) {
    if (playersTurn === 'x') {
        return 'o'
    } else {
        return 'x'
    }
}

function checkGrid(boxes, player, element) {
    let a1 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row1') && Object.values(element.classList).includes('column1')).innerText
    let a2 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row1') && Object.values(element.classList).includes('column2')).innerText
    let a3 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row1') && Object.values(element.classList).includes('column3')).innerText
    let b1 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row2') && Object.values(element.classList).includes('column1')).innerText
    let b2 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row2') && Object.values(element.classList).includes('column2')).innerText
    let b3 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row2') && Object.values(element.classList).includes('column3')).innerText
    let c1 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row3') && Object.values(element.classList).includes('column1')).innerText
    let c2 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row3') && Object.values(element.classList).includes('column2')).innerText
    let c3 = Object.values(boxes).find((element) => Object.values(element.classList).includes('row3') && Object.values(element.classList).includes('column3')).innerText

    if ([a1, a2, a3].every((element) => element === player) || [b1, b2, b3].every((element) => element === player) || [c1, c2, c3].every((element) => element === player) || [a1, b1, c1].every((element) => element === player) || [a2, b2, c2].every((element) => element === player) || [a3, b3, c3].every((element) => element === player) || [a1, b2, c3].every((element) => element === player) || [a3, b2, c1].every((element) => element === player)) {
        winner(player)
    } else if (!Object.values(boxes).find((element) => element.innerText !== '')) {
        draw()
    }
}

function winner(player) {
    gameEndedMessage(`Player ${player} wins!`)
    return player
}

function draw() {
    gameEndedMessage('Draw!')
    return
}

function hideElement(element) {
    element.hidden = true
    return
}

function showElement(element) {
    element.hidden = false
    return
}

function gameEndedMessage(message) {
    let popupContainer = document.getElementById('popup-container')

    Object.values(boxes).forEach((element) => {
        element.removeEventListener('click', onClick)
    })

    setTimeout(function () {
        showElement(popupContainer)
        document.body.innerHTML = document.body.innerHTML.replace('$outcome', message)

        document.getElementById('close').addEventListener('click', () => location.reload())
        document.getElementById('continue').addEventListener('click', () => location.reload())
    }, 3000)
}

Object.values(boxes).forEach((element) => {
    element.addEventListener('click', onClick.bind(null, element))
})