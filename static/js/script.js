// Challange number 1 age in days 

const ageinDays = () => {
    var birthyear = prompt("What's your age ??");
    var ageindayss = (2021 - birthyear) * 365;
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode('You are ' + ageindayss + ' years old !!!')
    h1.appendChild(textAnswer)
    h1.setAttribute('id', 'ageinday')
    document.getElementById('flex__box__result').appendChild(h1)
}
const reset = () => {
    document.getElementById('ageinday').remove();
}

// Challange 2 ===========

const generateCat = () => {
    const div = document.getElementById('cat__gen');
    const image = document.createElement('img')
    image.src = ("https://cdn2.thecatapi.com/images/bj.jpg");
    div.appendChild(image);


}
// Challange 3 ============
const rpsfunction = (yourChoice) => {
    // console.log(yourChoice.id) 
    let humanChoice, botChoice;
    humanChoice = yourChoice.id
    botChoice = numberToChoice(randomNumber())
    // console.log("Bot", botChoice) 
    result = decideWinner(humanChoice, botChoice)
    // console.log(result)
    message = finalMessage(result)
    // console.log("mess", message)

    rpsFrontEnd(humanChoice, botChoice, message)


}
const randomNumber = () => {
    return Math.floor(Math.random() * 3)
}
const numberToChoice = (number) => {
    return ['rock', 'paper', 'scissor'][number]

}
const decideWinner = (yourchoice, compChoice) => {
    var rpsdatabase = {
        'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 },
        'scissor': { 'paper': 1, 'scissor': 0.5, 'rock': 0 }
    }
    var yourScore = rpsdatabase[yourchoice][compChoice]
    var compScore = rpsdatabase[compChoice][yourchoice]
    return [yourScore, compScore]
}

const finalMessage = ([yourScore, compScore]) => {
    if (yourScore === 0) {
        return { 'message': 'You Loose', 'color': 'red' }
    } else if (yourScore === 0.5) {
        return { 'message': 'You Tied', 'color': 'yellow' }
    }
    else {
        return { 'message': 'You won', 'color': 'green' }
    }

}

const rpsFrontEnd = (humanImageChoice, CompImageChoice, message) => {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    }

    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    var humandiv = document.createElement('div')
    var botdiv = document.createElement("div")
    var messageDiv = document.createElement("div")

    humandiv.innerHTML = "<img src'" + imageDatabase[humanImageChoice] + "' height=150 width=150>"
    messageDiv.innerHTML = "<h1 style='color:" + message['color'] + "; font-size:50px; padding;10px '>" + message['message'] + "</h1>"
    botdiv.innerHTML = "<img src'" + imageDatabase[CompImageChoice] + "' height=150 width=150>"

    document.getElementById("rpc__div__id").appendChild(humandiv)
    document.getElementById("rpc__div__id").appendChild(messageDiv)
    document.getElementById("rpc__div__id").appendChild(botdiv)


}
// challange 4 color all button 
var all_button = document.getElementsByTagName("button")
console.log(all_button)
var copyButtons = []
for (let i = 0; i < all_button.length; i++) {
    copyButtons.push(all_button[i].classList[1])

}
console.log(copyButtons)

const buttoncolorChange = (buttonThingy) => {
    if (buttonThingy.value === 'red') {
        buttonRed();
    } else if (buttonThingy.value === 'green') {
        buttonGreen()
    } else if (buttonThingy.value === 'reset') {
        buttonReset()
    } else if (buttonThingy.value === 'random') {
        randomColor()
    }
}
const buttonRed = () => {
    for (let j = 0; j < all_button.length; j++) {
        all_button[j].classList.remove(all_button[j].classList[1])
        all_button[j].classList.add("btn-danger")
    }
}
const buttonGreen = () => {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[1])
        all_button[i].classList.add("btn-success")
    }
}
const buttonReset = () => {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[1])
        all_button[i].classList.add(copyButtons[i])
    }
}
const randomColor = () => {
    let choose = ["btn-primary", "btn-warning", "btn-success", "btn-danger"]
    for (i = 0; i < all_button.length; i++) {
        let randomNum = Math.floor(Math.random() * 4)
        all_button[i].classList.remove(all_button[i].classList[1])
        all_button[i].classList.add(choose[randomNum])
    }
}
// challange 5 

let blackJackGame = {
    'you': { 'scoreSpan': '#yourbox_result', 'div': '#yourbox', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealerbox_result', 'div': '#dealerbox', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'tied': 0,
    'isStand': false,
    'turnOver': false
}
const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']
console.log(YOU, DEALER)
const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lostSound = new Audio('static/sounds/aww.mp3')


document.querySelector('#blackjack_hit_btn').addEventListener('click', blackjackHit)
document.querySelector('#blackjack_deal_btn').addEventListener('click', blackjackDeal)
document.querySelector('#blackjack_stand_btn').addEventListener('click', dealerLogic)

function blackjackHit() {
    if (blackJackGame['isStand'] === false) {
        let card = randomCard()
        // console.log(card)
        showCard(YOU, card)
        updateScore(card, YOU)
        showScore(YOU)
        // console.log(YOU['score'])
    }

}
function dealerLogic() {
    blackJackGame['isStand'] = true
    let card = randomCard()
    showCard(DEALER, card)
    updateScore(card, DEALER)
    showScore(DEALER)
    if (DEALER['score'] > 15) {
        blackJackGame['turnOver'] = true
        let winner = computeWinner()
        showResult(winner)
        console.log(blackJackGame['turnOver'])
    }

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13)
    return blackJackGame['cards'][randomIndex]
}

function blackjackDeal() {
    if (blackJackGame['turnOver'] === true) {
        blackJackGame['isStand'] = false
        let yourImages = document.querySelector('#yourbox').querySelectorAll('img')
        let dealerImage = document.querySelector('#dealerbox').querySelectorAll('img')

        console.log(yourImages)
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove()
        }

        for (i = 0; i < dealerImage.length; i++) {
            dealerImage[i].remove()
        }
        YOU['score'] = 0
        DEALER['score'] = 0
        document.querySelector('#yourbox_result').textContent = 0
        document.querySelector('#dealerbox_result').textContent = 0
        document.querySelector('#blackjack_result').textContent = "Let's Play !!"



        document.querySelector('#yourbox_result').style.color = '#ffffff'
        document.querySelector('#dealerbox_result').style.color = '#ffffff'
        document.querySelector('#blackjack_result').style.color = 'black'
        blackJackGame['turnOver'] = true
    }
}

const showCard = (activePlayer, card) => {
    if (activePlayer['score'] <= 21) {
        let cardImg = document.createElement('img')
        cardImg.src = `static/images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImg)
        hitSound.play()
    }
}
function updateScore(card, activePlayer) {
    // If adding 11 keep me below 21, add 11, Otherwise add only 1
    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardMap'][card][1]
        } else {
            activePlayer['score'] += blackJackGame['cardMap'][card][0]
        }
    } else {
        activePlayer['score'] += blackJackGame['cardMap'][card]

    }

}
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']

    }
}
function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        // higher score than dealer or dealer busts but you are 21 or under 
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackJackGame['wins']++;
            winner = YOU
        } else if (YOU['score'] < DEALER['score']) {
            blackJackGame['losses']++;
            winner = DEALER
        } else if (YOU['score'] === DEALER['score']) {
            blackJackGame['tied']++;
        }
        // when user hust but dealer don't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackJackGame['losses']++;
        winner = DEALER
        // when both busts 
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackJackGame['tied']++;
    }
    console.log("Winner is ", winner)
    console.log(blackJackGame)
    return winner
}
function showResult(winner) {
    if (blackJackGame['turnOver'] === true) {
        let message, messageColor
        if (winner === YOU) {
            document.querySelector('#win').textContent = blackJackGame['wins']
            message = 'You Won !!!'
            messageColor = 'green'
            winSound.play()
        } else if (winner === DEALER) {
            document.querySelector('#lose').textContent = blackJackGame['losses']
            message = 'You Lost !!!'
            messageColor = 'red'
            lostSound.play()
        } else {
            document.querySelector('#tied').textContent = blackJackGame['tied']
            message = 'Tied !!'
            messageColor = 'yellow'
        }
        document.querySelector('#blackjack_result').textContent = message
        document.querySelector('#blackjack_result').style.color = messageColor
    }


}