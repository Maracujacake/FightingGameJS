class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}}){
        this.position = position;
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 4
        this.offset = offset
    }

    /* métodos */

    draw(){
        c.drawImage(this.image,
                    this.frameCurrent * (this.image.width / this.framesMax),
                    0,
                    this.image.width / this.framesMax,
                    this.image.height, 
                    this.position.x - this.offset.x, 
                    this.position.y - this.offset.y, 
                    (this.image.width / this.framesMax) * this.scale, 
                    this.image.height * this.scale);
        }


    animateFrames(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.frameCurrent < this.framesMax - 1){
            this.frameCurrent ++;
            } else{
            this.frameCurrent = 0;  
            }
        }
    }
        
    update(){
        this.draw();
        this.animateFrames();
    }

};



class Fighter extends Sprite{
    constructor({position,
                 velocity, 
                 color = 'red', 
                 imageSrc, 
                 scale = 1, 
                 framesMax = 1, 
                 offset = {x:0, y:0}, 
                 sprites,
                 attackBox = { offset: {}, width: undefined, height: undefined} }){
        super({
            position,
            imageSrc,
            framesMax,
            offset,
            scale,
        });


        this.velocity = velocity;
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x, 
                y: this.position.y
            }, 
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.attacking;
        this.health = 100;
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 4
        this.sprites = sprites
        this.dead = false
    
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
          }
          
        console.log(this.sprites)    
    }
    /* métodos */
    
    update(){
        this.draw();
        if(!this.dead)  this.animateFrames();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;


        /*attack box */
        /*c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)*/

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        /* GRAVIDADE / QUEDA  */
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 30){
            this.velocity.y = 0;
            this.position.y = 400;
        }
        else{ this.velocity.y += gravity }
    
        
    }


    attack(){
        this.switchSprite('Attack1')
        this.attacking = true;
    }

    TakeHit(){
        this.health -= 20

        if(this.health <= 0)
            this.switchSprite('Death')
        
        else this.switchSprite('TakeHit')
    }


    switchSprite(sprite){

    if(this.image === this.sprites.Death.image){
        if(this.frameCurrent === this.sprites.Death.framesMax - 1) 
            this.dead = true
    return
    }

        if(this.image === this.sprites.Attack1.image && this.frameCurrent < this.sprites.Attack1.framesMax - 1) 
        return

           if(this.image === this.sprites.TakeHit.image && this.frameCurrent < this.sprites.TakeHit.framesMax - 1)
           return

                switch(sprite){
                    case 'idle':
                        if(this.image !== this.sprites.idle.image){
                        this.image = this.sprites.idle.image
                        this.framesMax = this.sprites.idle.framesMax
                        this.frameCurrent = 0;
                        }
                    break;
                    case 'run':
                        if(this.image !== this.sprites.run.image){
                        this.image = this.sprites.run.image
                        this.framesMax = this.sprites.run.framesMax 
                        this.frameCurrent = 0;   
                        }
                    break;
                    case 'jump':
                        if(this.image !== this.sprites.jump.image){
                        this.image = this.sprites.jump.image
                        this.framesMax = this.sprites.jump.framesMax
                        this.frameCurrent = 0;
                        }
                    break;
                    case 'fall':
                        if(this.image !== this.sprites.fall.image){
                            this.image = this.sprites.fall.image
                            this.framesMax = this.sprites.fall.framesMax
                            this.frameCurrent = 0;
                            }
                    break;
                    case 'Attack1':
                        if(this.image !== this.sprites.Attack1.image){
                            this.image = this.sprites.Attack1.image
                            this.framesMax = this.sprites.Attack1.framesMax
                            this.frameCurrent = 0;
                            }
                    break;
                    case 'TakeHit':
                        if(this.image !== this.sprites.TakeHit.image){
                            this.image = this.sprites.TakeHit.image
                            this.framesMax = this.sprites.TakeHit.framesMax
                            this.frameCurrent = 0;
                            }
                    break;
                    case 'Death':
                        if(this.image !== this.sprites.Death.image){
                            this.image = this.sprites.Death.image
                            this.framesMax = this.sprites.Death.framesMax
                            this.frameCurrent = 0;
                            }
                    break;
            }
    }


};