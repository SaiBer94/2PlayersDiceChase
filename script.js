'use strict'

let turns = 1;
let onHand = 0;
let cubeImg = document.querySelector('.diceImg');
let text =document.querySelector('.message');
let modal = document.querySelector('.modal');
let middleScreen = document.querySelector('.middleScreen');

function endTurn (player) {
    let currentTot = (Number(document.querySelector(`.p${player}Tot`).textContent));
        console.log("current total: " + currentTot)
        let tot = currentTot + onHand;
        console.log("after calculations: " + tot)
        if(tot >= 100) {
            text.textContent = `Player ${player} Won!`;
            if(player === 1) {
                middleScreen.style.background = 'red';
            } else if (player === 2) {
                middleScreen.style.background = 'blue';
            }
        } else {
            document.querySelector(`.p${player}Tot`).textContent = tot;
            onHand = 0;
            document.querySelector(`.p${player}Hand`).textContent = 0;
            if(player === 1) {
                turns++;
                document.querySelector('.curTurn').textContent = `Player ${turns}`;
            } else {
                turns--;
                document.querySelector('.curTurn').textContent = `Player ${turns}`;
            }
            
        }
}

function turn (player, score) {
    if(score === 15) {
        document.querySelector(`.p${player}Tot`).textContent = 0;
        document.querySelector(`.p${player}Hand`).textContent = 0;
        onHand = 0;
        text.innerHTML = `Rolled 1!<br>  turn ended &  scores resets`;
        endTurn(player);

    } else {
        onHand+= score;
        document.querySelector(`.p${player}Hand`).textContent = onHand;
        text.innerHTML = `Rolled ${score}!`;
    }
}



function rollDice() {
    let number = Number(Math.trunc(Math.random()*6 +1));
    console.log(number)

    switch (number) {
        case 1: 
            cubeImg.src = 'Assets/dice1.png';
            break;
        case 2:
            cubeImg.src = 'Assets/dice2.png';
            break;;
        case 3:
            cubeImg.src = 'Assets/dice3.png';
            break;
        case 4:
            cubeImg.src = 'Assets/dice4.png';
            break;
        case 5:
            cubeImg.src = 'Assets/dice5.png';
            break;
        case 6:
            cubeImg.src = 'Assets/dice6.png';
            break;
    }

    if(turns === 1) {
        turn(turns, number);
    } else if (turns === 2) {
        turn(turns, number);
    }
}


document.querySelector('.btnRoll').addEventListener('click', function() {
    rollDice();
})

document.querySelector('.btnHold').addEventListener('click', function() {
    if(turns === 1) {
        endTurn(turns);
    } else if(turns === 2){
        endTurn(turns);
    }
})

document.querySelector('.btnNew').addEventListener('click', function() {
    onHand = 0;
    text.textContent = 'Game on!';
    turns = 1;
    document.querySelector(`.p1Tot`).textContent = 0;
    document.querySelector(`.p1Hand`).textContent = 0;
    document.querySelector(`.p2Tot`).textContent = 0;
    document.querySelector(`.p2Hand`).textContent = 0;
    document.querySelector(`.curTurn`).textContent = `Player ${turns}`;
    middleScreen.style.background = '#e0e0e0';
})

document.querySelector('.btnInst').addEventListener('click', function() {
    modal.classList.remove("hidden");
})

document.querySelector('.close-modal').addEventListener('click', function() {
    modal.classList.add("hidden");
})