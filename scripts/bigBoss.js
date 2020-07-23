class BigBoss {
    constructor(canvas, positionX, positionY){
        this.canvas = canvas,
        this.ctx = canvas.getContext('2d'),
        this.bombImg = new Image(),
        this.positionX = positionX,
        this.positionY = positionY,
        this.imgWidth = 280,
        this.imgHeight = 160,
        this.posIncrement = 0.2,
        this.numberOfLives = 4,
        this.bombImg.src = 'images/EnemyBmb.png',
        this.bombDestroyed = false,
        this.showBigBoss = false
    }
    draw(){
        this.drawLive(this.numberOfLives);
        this.ctx.drawImage(this.bombImg,this.positionX,this.positionY,this.imgWidth,this.imgHeight);
    }
    move(){
        this.positionX !=0 && !this.bombDestroyed ? this.positionX -= this.posIncrement : this.bombExplosion();
    }
    bombExplosion(){
        this.bombImg.src ='images/StartExplosion.png';
        this.imgWidth = 300;
        this.imgHeight = 300;
        this.bombDestroyed = true;
        setTimeout(()=>{
            this.positionY = -100
            this.showBigBoss = false
        },1000);
    }
    drawLive(numberOfLives){
        for(let i=0; i<numberOfLives; i++){
        let num = i*31;
        this.ctx.beginPath();
        this.ctx.moveTo(this.positionX+40+num,this.positionY-50+20);
        this.ctx.lineTo(this.positionX+70+num,this.positionY-50+20);
        this.ctx.lineTo(this.positionX+70+num,this.positionY-50+35);
        this.ctx.lineTo(this.positionX+40+num,this.positionY-50+35);
        this.ctx.lineTo(this.positionX+40+num,this.positionY-50+20);
        this.ctx.fillStyle = "#c4463b";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        }
    }

}