/*variável que armazena o elemento canvas do html*/
const canvas = document.querySelector('canvas');

/* contexto que vai gerar a renderização em 2d */
const c = canvas.getContext('2d');


/* dimensão do jogo */
canvas.width = 1024;
canvas.height = 576;

/* retangulo que preenche toda a área do jogo */
c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7;


/* fundo */

const background = new Sprite({
    position: {
        x:0 ,
        y:0
    },
    imageSrc: './background/fightbackground2.jpg'
})

const shop = new Sprite({
    position: {
        x: 590,
        y: 150
    },
    imageSrc: './background/shop.png',
    scale: 2,
    framesMax: 6
})


/* criação do personagem */
/* player um */
const playerOne = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0, 
        y: 10
    },

    offset: {
        x: 0,
        y: 0
    },

    imageSrc: './KingPlayerOne/Idle.png',
    framesMax: 8,
    scale: 3,
    offset: {
        x:160,
        y:170
    },
    sprites: {
        idle: {
          imageSrc: './KingPlayerOne/Idle.png',
          framesMax: 8
        },
        run: {
          imageSrc: './KingPlayerOne/Run.png',
          framesMax: 8
        },
        jump: {
          imageSrc: './KingPlayerOne/Jump.png',
          framesMax: 2  
        },
        fall: {
            imageSrc: './KingPlayerOne/Fall.png',
            framesMax: 2
        },
        Attack1: {
            imageSrc: './KingPlayerOne/Attack1.png',
            framesMax: 4
        },
        TakeHit: {
            imageSrc: './KingPlayerOne/TakeHit2.png',
            framesMax: 4
        },
        Death: {
            imageSrc: './KingPlayerOne/Death.png',
            framesMax: 6
        },
    },
    attackBox: {
        offset:{
            x: 100,
            y: 40
        },
        width: 160,
        height: 50
    }
})


/* player dois */
const playerTwo = new Fighter({
    position: {
        x: 400,
        y: 100
    },

    velocity: {
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x: 50,
        y: 0
    },
    imageSrc: './HeroKnightPlayerTwo/Idle.png',
    framesMax: 11,
    scale: 3,
    offset: {
        x: 215,
        y: 197
    },
    sprites: {
        idle: {
          imageSrc: './HeroKnightPlayerTwo/Idle.png',
          framesMax: 11
        },
        run: {
          imageSrc: './HeroKnightPlayerTwo/Run.png',
          framesMax: 8
        },
        jump: {
          imageSrc: './HeroKnightPlayerTwo/Jump.png',
          framesMax: 3  
        },
        fall: {
            imageSrc: './HeroKnightPlayerTwo/Fall.png',
            framesMax: 3
        },
        Attack1: {
            imageSrc: './HeroKnightPlayerTwo/Attack1.png',
            framesMax: 7
        },
        TakeHit: {
            imageSrc: './HeroKnightPlayerTwo/Take Hit.png',
            framesMax: 4
        },
        Death: {
            imageSrc: './HeroKnightPlayerTwo/Death.png',
            framesMax: 11
        },
    },
    attackBox: {
        offset:{
            x: -75,
            y: 40
        },
        width: 185,
        height: 100
    }
});

/* renderização dos players */
playerOne.draw();
playerTwo.draw();


/* teclas por padrão não estão apertadas */
const key = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    w: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },

    ArrowUp: {
        pressed: false
    }
}


/* invocação da função que faz o tempo diminuir*/
decreaseTimer();

/* a cada frame faça: */
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.1)'
    c.fillRect(0,0,canvas.width, canvas.height)
    playerOne.update();
    playerTwo.update();


    /* MOVIMENTAÇÃO */
        /* player One */
    playerOne.velocity.x = 0;
   
    if(key.a.pressed && playerOne.lastKey === 'a'){
        playerOne.velocity.x = -3;
        playerOne.switchSprite('run')
    }
    else if(key.d.pressed && playerOne.lastKey === 'd'){
        playerOne.velocity.x = 3;
        playerOne.switchSprite('run')
    } else{
        playerOne.switchSprite('idle')
    }

    if(playerOne.velocity.y < 0){
        playerOne.switchSprite('jump')
    } else if(playerOne.velocity.y > 0){
        playerOne.switchSprite('fall')
    }


        /* Player Two */
    playerTwo.velocity.x = 0;

    if(key.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft'){
        playerTwo.velocity.x = -3;
        playerTwo.switchSprite('run')
    }
    else if(key.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight'){
        playerTwo.velocity.x = 3;
        playerTwo.switchSprite('run')
    } else {
        playerTwo.switchSprite('idle')
    }
    if(playerTwo.velocity.y < 0){
        playerTwo.switchSprite('jump')
    } else if(playerTwo.velocity.y > 0){
        playerTwo.switchSprite('fall')
    }


        /* CHECAGEM DE COLISÃO */
    if(hitBoxColision({
        playerOne: playerOne,
        playerTwo: playerTwo}) && playerOne.attacking && playerOne.frameCurrent === 2){
        playerTwo.TakeHit()
        playerOne.attacking = false;
        gsap.to('#playerTwoHealth', {
            width: playerTwo.health + '%'
        })
    }

        /* CASO O JOGADOR ERRE O ATAQUE*/
        if(playerOne.attacking && playerOne.frameCurrent === 2){
            playerOne.attacking = false;
        }

    if(hitBoxColision({
        playerOne: playerTwo,
        playerTwo: playerOne}) && playerTwo.attacking && playerTwo.frameCurrent === 3){
        playerOne.TakeHit()
        playerTwo.attacking = false;
        gsap.to('#playerOneHealth', {
            width: playerOne.health + '%'
        })
    }

    /* CASO O JOGADOR ERRE O ATAQUE*/
    if(playerTwo.attacking && playerTwo.frameCurrent === 3){
        playerTwo.attacking = false;
    }

    if(playerOne.health <= 0 || playerTwo.health <=0){
        determineWinner({playerOne, playerTwo, timerId})
    }

};


animate();

/* quando apertar alguma tecla, faça algo */
window.addEventListener('keydown', (event) => {
    if(!playerOne.dead){
    switch (event.key) {

        /* player one */
        case 'd': 
            key.d.pressed = true;
            playerOne.lastKey = 'd'
        break;
        case 'a':
            key.a.pressed = true;
            playerOne.lastKey = 'a'
        break;
        case 'w':
            playerOne.velocity.y = -15;
        break;
        case ' ':
            playerOne.attack();
        break;
    }
}
    
    if(!playerTwo.dead){
        switch(event.key){
            case 'ArrowRight': 
            key.ArrowRight.pressed = true;
            playerTwo.lastKey = 'ArrowRight'
            break;
            case 'ArrowLeft':
                key.ArrowLeft.pressed = true;
                playerTwo.lastKey = 'ArrowLeft'
            break;
            case 'ArrowUp':
                playerTwo.velocity.y = -15;
            break;
            case 'ArrowDown':
                playerTwo.attack();
            break;
        }
    }
})


/* quando soltar a tecla, faça algo */
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        /* Player one */ 
        case 'd': 
            key.d.pressed = false;
        break;
        case 'a':
            key.a.pressed = false;
        break;


        /* Player Two */ 
        case 'ArrowRight': 
            key.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false;
        break;


    }
})