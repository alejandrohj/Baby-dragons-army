class BigBoss {
    constructor(canvas, positionY){
        this.canvas = canvas,
        this.ctx = canvas.getContext('2d'),
        this.bombImg = new Image(),
        this.positionX = 1000,
        this.positionY = positionY,
        this.imgWidth = 280,
        this.imgHeight = 160,
        this.posIncrement = 0.2,
        this.numberOfLives = 4,
        this.bombImg.src = 'images/EnemyBmb.png',
        this.bombDestroyed = false
    }
    draw(){
        this.drawLive(this.numberOfLives);
        this.ctx.drawImage(this.bombImg,this.positionX,this.positionY,this.imgWidth,this.imgHeight);
    }
    move(){
        if(this.positionX !=0 && !this.bombDestroyed) this.positionX -= this.posIncrement;
        else {
            this.bombExplosion();
        }
    }
    bombExplosion(){
        this.bombImg.src ='images/StartExplosion.png';
        this.imgWidth = 300;
        this.imgHeight = 300;
        this.bombDestroyed = true;
    }
    drawLive(numberOfLives){
        for(let i=0; i<numberOfLives; i++){
        let num = i*31;
        this.ctx.beginPath();
        this.ctx.moveTo(850+num,420);
        this.ctx.lineTo(880+num,420);
        this.ctx.lineTo(880+num,435);
        this.ctx.lineTo(850+num,435);
        this.ctx.lineTo(850+num,420);
        this.ctx.fillStyle = "#c4463b";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        }
    }

}