const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
];

let cards = null;

startGame()

function startGame() {
    cards = creatCardFromTechs(techs);
    shuffleCards(cards);
    // console.log(cards);

    initalizeCards(cards);
}

function initalizeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");

    cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        creatCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);



    });

    // console.log(gameBoard);
}

function creatCardContent(card, cardElement){
    creatCardFace(FRONT, card, cardElement);
    creatCardFace(BACK, card, cardElement);
}

function creatCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON)
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace);
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];

    }
}

function creatCardFromTechs(techs) {

    let cards = [];

    techs.forEach((tech) => {
        cards.push(createPairFromTechs(tech));
    })
    return cards.flatMap(pair => pair);
}

function createPairFromTechs(tech) {

    return [
        {
            id: createIdWithTech(tech),
            icon: tech,
            flipped: false,
        },
        {
            id: createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }
    ]

}

function createIdWithTech(tech) {
    return tech + parseInt(Math.random() * 1000);
}

function flipCard() {

    this.classList.add("flip");

}