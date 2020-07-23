class DragonBreath {
    constructor(ctx,x,y){
        this.dbImg = new Image(),
        this.ctx = ctx,
        this.positionX = x + 60,
        this.positionY = y + 10,
        this.dbImg.src = 'images/DragonBreath1.png'
    }
    draw(){
        this.ctx.drawImage(this.dbImg,this.positionX,this.positionY, 40,40);
    }
    move(){
        this.positionX >=750? this.positionY = -100 : this.positionX += 2
    }
    collision(){
        //this.positionX = 1100;
        this.positionY = -400;
    }
}