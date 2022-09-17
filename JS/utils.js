/* verificacao se a hitbox está adequada [ao ultrapassar o adversario e ao pular]*/
function hitBoxColision({
    playerOne,
    playerTwo
}){
    return(
       playerOne.attackBox.position.x + playerOne.attackBox.width >= playerTwo.position.x
       && playerOne.attackBox.position.x - 80 <= playerTwo.position.x + playerTwo.width
       && playerOne.attackBox.position.y + playerOne.attackBox.height >= playerTwo.position.y
       && playerOne.attackBox.position.y <= playerTwo.position.y + playerTwo.height
    )
}


// determina quem vai vencer ou se vai empatar
function determineWinner({playerOne, playerTwo, timerId}){
    clearTimeout(timerId);
    document.querySelector('#display-text').style.display = 'flex';
    if(playerOne.health === playerTwo.health){
        document.querySelector('#display-text').innerHTML = 'Tie';
    }
    else if(playerOne.health > playerTwo.health){
        document.querySelector('#display-text').innerHTML = 'Player One Wins';
    }
    else if(playerTwo.health > playerOne.health){
        document.querySelector('#display-text').innerHTML = 'Player Two Wins';
    }
}

let timer = 60;
let timerId

// determina algo apenas se o tempo terminar (chegar a 0)
function decreaseTimer(){
    if(timer > 0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    if(timer === 0){
    determineWinner({playerOne, playerTwo, timerId});
}
}