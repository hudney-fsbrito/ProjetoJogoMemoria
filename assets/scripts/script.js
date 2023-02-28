const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame();

function startGame() {
    initalizeCards(game.creatCardFromTechs());
};

function initalizeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        creatCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    // console.log(gameBoard);
};

function creatCardContent(card, cardElement){
    creatCardFace(FRONT, card, cardElement);
    creatCardFace(BACK, card, cardElement);
};

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
};

function flipCard() {

    if(game.setCard(this.id)){
        this.classList.add("flip");
        if (game.checkMatch()) {
            game.clearCard()
        } else {
            setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
    
                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.clearCard();
            }, 1000);
        };
    };

};