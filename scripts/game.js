class Game {
    constructor(body){
        this.body = body,
        this.myCanvas = null,
        this.ctx = null,
        this.bgImg = new Image(),
        this.expSound = new Audio(),
        this.bigBossSound = new Audio(),
        this.showBigBoss = false,
        this.startIntervalId,
        this.bigBossIntervalId,
        this.dragon,
        this.bigBoss,
        this.dragonArmy,
        this.flyingBombs = [],
        this.bgImg.src ='images/bgImg.png',
        this.expSound.src = 'sounds/bombExplotion.flac',
        this.bigBossSound.src = 'sounds/BigBossSound.flac',
        this.collRge = 20,
        this.bombDestroyed = false,
        this.armyUsed = false,
        this.level  = 1
    }
    startLoop = (callBack)=>{
        this.startIntervalId = setInterval(()=>{
            callBack();

        },5);
    }
    bigBossAppear(){
        this.bigBossIntervalId = setInterval(()=>{
            this.bigBoss = new BigBoss(this.myCanvas, 50 + Math.floor(Math.random()*400));
                this.bigBossSound.play();
                this.showBigBoss = true;
            
        },30000);
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
        this.dragonArmy = new DragonArmy(this.myCanvas);
        this.addFlyingBomb();
        this.dragon.move();
        this.dragon.breath();
        //Start Game:
        this.bigBossAppear();
        this.dragonArmy.callArmy(); //Add the callArmy listener
        this.startLoop(this.updateCanvas);
    }
    updateCanvas = ()=>{
        this.ctx.drawImage(this.bgImg,0,0,1000,500);
        this.dragon.draw();
        this.displayLevel();
        //dragonArmy called
        if(this.dragonArmy.armyCall && this.armyUsed == false) {
            this.dragonArmy.armyCalled();
            for(let i=0; i<this.dragonArmy.breaths.length; i++){ //Breaths of the army
                this.dragonArmy.breaths[i].move();
                this.dragonArmy.breaths[i].draw();
                for(let j=0; j<this.flyingBombs.length; j++){
                    if((this.dragonArmy.breaths[i].positionX + this.collRge >= this.flyingBombs[j].positionX && this.dragonArmy.breaths[i].positionX - this.collRge <= this.flyingBombs[j].positionX)
                        && (this.dragonArmy.breaths[i].positionY + this.collRge >= this.flyingBombs[j].positionY && this.dragonArmy.breaths[i].positionY - this.collRge <= this.flyingBombs[j].positionY )){
                        this.flyingBombs[j].bombExplosion();
                        this.dragonArmy.breaths[i].collision();
                        this.expSound.play();
                        //this.bombDestroyed = true;
                    }
                }
            }
            setTimeout(()=>{
                // this.dragonArmy.armyCall = false;
                this.armyUsed = true;
            },2700)
        }//Show the army
        //Bigboss appear
        if (this.showBigBoss){
            this.bigBossFigth();
            //Check the BB lives:
            if(this.bigBoss.positionX <= 5) {this.gameOver();}
            if(this.bigBoss.numberOfLives === 0){
                this.bigBoss.bombExplosion();
                this.bigBoss.draw();
                this.expSound.play();
                //for(let i=0; i<this.flyingBombs.length; i++)this.flyingBombs[i].bombExplosion(); //Uncoment in case you want to won at level 4
                //if(this.level === 4)this.gameWon(); //Uncoment in case you want to won at level 4
                this.level ++;
                this.showBigBoss = false;
            }
        }
        //Flying bombs managing 
        for(let i=0; i<this.flyingBombs.length; i++){
            this.flyingBombs[i].draw();
            this.flyingBombs[i].move();
            let newBombPosition = 700 + this.level*50;
            if(this.flyingBombs[i].positionX == newBombPosition){
                this.addFlyingBomb();
                console.log(newBombPosition)
            }
            if(this.flyingBombs[i].positionX == 1){this.dragon.dragonLives -= 1;}
        }
        //dragon breath and flying bomb reached
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
            //BigBoss reached
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
        let randomPost = Math.floor(Math.random()* 470);
        let newflyingBomb = new FlyingBomb(this.myCanvas,randomPost);
        this.flyingBombs.push(newflyingBomb);
    }
    gameOver(){
        clearInterval(this.startIntervalId);
        clearInterval(this.bigBossIntervalId);
        buildGameOverScreen();
    }
    // gameWon(){ //Uncoment in case you want to won at level 4
    //     clearInterval(this.startIntervalId);
    //     setTimeout(()=>{
    //         buildGameWonScreen();
    //     },1000);
    // }
    displayLevel(){
        this.ctx.beginPath();
        this.ctx.font = 'bold 16px verdana';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Level : ${this.level}`,40,20);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}