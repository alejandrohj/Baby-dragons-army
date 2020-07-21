class Game {
    constructor(body){
        this.body = body,
        this.myCanvas = null,
        this.ctx = null,
        this.bgImg = new Image(),
        this.expSound = new Audio(),
        this.showBigBoss = false,
        this.startIntervalId,
        this.bigBossIntervalId,
        this.dragon,
        this.bigBoss,
        this.flyingBombs = [],
        this.bgImg.src ='images/bgImg.png',
        this.expSound.src = 'sounds/bombExplotion.flac'
        this.collRge = 15,
        this.bombDestroyed = false
    }
    startLoop = (callBack)=>{
        this.startIntervalId = setInterval(()=>{
            callBack();

        },5);
    }
    bigBossAppear(){
        setTimeout(()=>{
            this.bigBoss = new BigBoss(this.myCanvas, 200);
            
             this.showBigBoss = true;
           
            console.log('bbApp')
        },20000);
    }
    bigBossFigth(){
        this.bigBoss.draw();
        this.bigBoss.move();
    }
    drawCanvas(){
        let theGameDiv = document.createElement('div');
        theGameDiv.classList.add('gamePanel');
        theGameDiv.innerHTML = `<canvas id="game" width="1000" height="500"></canvas>`;
        this.body.appendChild(theGameDiv);
        this.myCanvas = document.querySelector('#game');
        this.ctx = this.myCanvas.getContext('2d');
        this.ctx.drawImage(this.bgImg,0,0,1000,500);
        this.dragon = new Dragon(this.myCanvas);
        this.addFlyingBomb();
        this.dragon.move();
        this.dragon.breath();
        //Start Game:
        this.bigBossAppear();
        this.startLoop(this.updateCanvas);
    }
    updateCanvas = ()=>{
        this.ctx.drawImage(this.bgImg,0,0,1000,500);
        this.dragon.draw();
        if (this.showBigBoss){
            this.bigBossFigth();
            //Check the BB lives:
            if(this.bigBoss.numberOfLives === 0){
                this.bigBoss.bombExplosion();
                this.bigBoss.draw();
                this.expSound.play();
                this.gameWon();
            }
        }
        
        for(let i=0; i<this.flyingBombs.length; i++){
            this.flyingBombs[i].draw();
            this.flyingBombs[i].move();
            if(this.flyingBombs[i].positionX == 800){this.addFlyingBomb();}
            if(this.flyingBombs[i].positionX == 1){this.dragon.dragonLives -= 1;}
        }

        for(let i=0; i < this.dragon.breaths.length; i++){
            this.dragon.breaths[i].move();
            this.dragon.breaths[i].draw();
            for(let j=0; j<this.flyingBombs.length; j++){
                if((this.dragon.breaths[i].positionX + this.collRge >= this.flyingBombs[j].positionX && this.dragon.breaths[i].positionX - this.collRge <= this.flyingBombs[j].positionX)
                    && (this.dragon.breaths[i].positionY + this.collRge >= this.flyingBombs[j].positionY && this.dragon.breaths[i].positionY - this.collRge <= this.flyingBombs[j].positionY )){
                    this.flyingBombs[j].bombExplosion();
                    this.dragon.breaths[i].collision();
                    this.expSound.play();
                    //this.bombDestroyed = true;
                }
            }
            if(this.showBigBoss){
                if((this.dragon.breaths[i].positionX >= this.bigBoss.positionX )
                && (this.dragon.breaths[i].positionY + 40 >= this.bigBoss.positionY && this.dragon.breaths[i].positionY <= this.bigBoss.positionY + this.bigBoss.imgHeight)){
                    this.dragon.breaths[i].collision();
                    this.bigBoss.numberOfLives --;
                }
            }
        }
        if(this.dragon.dragonLives === 0){
            this.gameOver();
        }
        // if(this.bombDestroyed){
        //     this.addFlyingBomb();
        //     this.bombDestroyed = false;
        // }
    }
    addFlyingBomb(){
        let randomPost = Math.floor(Math.random()* 480);
        let newflyingBomb = new FlyingBomb(this.myCanvas,randomPost);
        this.flyingBombs.push(newflyingBomb);
    }
    gameOver(){
        clearInterval(this.startIntervalId);
        buildGameOverScreen();
    }
    gameWon(){
        clearInterval(this.startIntervalId);
        setTimeout(()=>{
            buildGameWonScreen();
        },1000);
    }
}