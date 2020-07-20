class FlyingBomb {
    constructor(canvas){
        this.canvas = canvas,
        this.ctx = canvas.getContext('2d'),
        this.bombImg = new Image(),
        this.positionX = 1000,
        this.positionY = 50,
        this.posIncrement = 1,
        this.bombImg.src = 'images/EnemyBmb.png'
    }
    draw(){
        this.ctx.drawImage(this.bombImg,this.positionX,this.positionY,70,40);
    }
    move(){
        this.positionX -= this.posIncrement;
    }
    //PositionX = this.positionX;
}