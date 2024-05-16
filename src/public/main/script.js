let boxes = document.getElementsByClassName('box')
let difficulty = 'easy'
let players = {
    'x': { symbol: '✖', score: 0 },
    'o': { symbol: '𐤏', score: 0 }
}
let playersTurn = players['x'].symbol

document.body.innerHTML = document.body.innerHTML.replace('$player', playersTurn)
document.body.innerHTML = document.body.innerHTML.replace('$difficulty', formatString('easy'))

function formatString(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

function placeSymbol(element) {
    if (element.innerText === '') {
        element.innerText = playersTurn
        checkGrid(boxes, playersTurn, element)
        playersTurn = nextTurn(playersTurn)
    }
}

function nextTurn(playersTurn) {
    symbol = playersTurn

    if (symbol === players['x'].symbol) {
        symbol = players['o'].symbol
    } else {
        symbol = players['x'].symbol
    }
    
    document.getElementById('players-turn').innerText = symbol
    // document.body.innerHTML = document.body.innerHTML.replace('$player', symbol)
    return symbol
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
        winner(getPlayerFromSymbol(player))
    } else if (!Object.values(boxes).find((element) => element.innerText === '')) {
        draw()
    }
}

function getPlayerFromSymbol(symbol) {
    for (let player in players) {
        if (players[player].symbol === symbol) {
            return player
        }
    }
    return null
}

function winner(player) {
    players[player].score += 1
    document.getElementById(`${player}-score`).innerText = players[player].score
    gameEndedMessage(players[player].symbol, 'WINNER!')
    return player
}

function draw() {
    gameEndedMessage(`${players['x'].symbol}${players['o'].symbol}`, 'DRAW!')
    return `${players['x'].symbol}${players['o'].symbol}`
}

function hideElement(element) {
    element.hidden = true
    return element
}

function showElement(element) {
    element.hidden = false
    return element
}

function changeDifficulty(mode) {
    difficulty = mode
    console.log(mode)
}

function clearBoard() {
    Object.values(boxes).forEach((box) => {
        box.innerText = ''
    })
}

function gameEndedMessage(winner, message) {
    let popupContainer = document.getElementById('popup-container')
    showElement(popupContainer)
    document.body.innerHTML = document.body.innerHTML.replace('$winner', winner)
    document.body.innerHTML = document.body.innerHTML.replace('$outcome', message)
}

Object.values(boxes).forEach((box) => {
    box.addEventListener('click', placeSymbol.bind(null, box))
})

document.getElementById('restart').addEventListener('click', () => {
    clearBoard()
    players['x'].score = 0
    players['o'].score = 0
    document.getElementById('x-score') = 0
    document.getElementById('o-score') = 0
})

document.getElementById('expand').addEventListener('click', () => {
    let hiddenContainer = document.getElementById('hidden-container')

    if (!hiddenContainer.hidden) {
        hideElement(hiddenContainer)
        document.getElementById('expand').innerText = 'v'
    } else {
        showElement(hiddenContainer)
        document.getElementById('expand').innerText = '^'
    }
})

Object.values(document.getElementsByClassName('difficulty')).forEach((element) => {
    element.addEventListener('click', (value) => changeDifficulty(value.target.id))
})

document.getElementById('close-button').addEventListener('click', () => {
    console.log('hide1')
    hideElement(document.getElementById('popup-container'))
    console.log('hide2')
})

document.getElementById('continue-button').addEventListener('click', () => {
    console.log('continue-1')
    hideElement(document.getElementById('popup-container'))
    console.log('continue-2')
})