class FlyingBomb {
    constructor(canvas, positionY){
        this.canvas = canvas,
        this.ctx = canvas.getContext('2d'),
        this.bombImg = new Image(),
        this.positionX = 1000,
        this.positionY = positionY,
        this.imgWidth = 70,
        this.imgHeight = 40,
        this.posIncrement = 0.5,
        this.bombImg.src = 'images/EnemyBmb.png',
        this.bombDestroyed = false
    }
    draw(){
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
        this.imgWidth = 100;
        this.imgHeight = 100;
        this.bombDestroyed = true;
        setTimeout(()=>{
          this.positionX = -100

         },1000);
    }

}