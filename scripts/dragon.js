"use strict";
class Dragon {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'),
        this.DragonImgUp = new Image(),
        this.dbreathSound = new Audio(),
        this.positionX = 50,
        this.positionY = 100,
        this.posIncrement = 20,
        this.dragonLives = 4,
        this.DragonImgUp.src = 'images/DragonBlue1.png',
        this.dbreathSound.src = 'sounds/dragonBreath.wav',
        this.breaths = [];
    }
    draw(){
        this.ctx.drawImage(this.DragonImgUp,this.positionX,this.positionY,70,50);
        //An his live:
        this.drawLive(this.dragonLives);

    }
    move(){
        const once = {
            once : true
          };
        document.addEventListener('keydown',(event)=>{
                if(event.key ==='ArrowUp') this.positionY -=this.posIncrement;
                if(event.key ==='ArrowDown') this.positionY +=this.posIncrement;

            
        });
    }
    breath(){
        document.addEventListener('keydown',(event)=>{
            if(event.key === 'ArrowRight') { 
                let newBreath = new DragonBreath(this.ctx,this.positionX,this.positionY);
                this.breaths.push(newBreath);
                this.dbreathSound.play();
            }
        });
    }
    drawLive(numberOfLives){
        for(let i=0; i<numberOfLives; i++){
        let num = i*31;
        this.ctx.beginPath();
        this.ctx.moveTo(20+num,420);
        this.ctx.lineTo(50+num,420);
        this.ctx.lineTo(50+num,435);
        this.ctx.lineTo(20+num,435);
        this.ctx.lineTo(20+num,420);
        this.ctx.fillStyle = "#7bff3d";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        }
    }
}  