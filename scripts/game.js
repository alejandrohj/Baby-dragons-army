class Game {
    constructor(body){
        this.body = body,
        this.myCanvas = null,
        this.ctx = null,
        this.bgImg = new Image(),
        this.expSound = new Audio(),
        this.bigBossSound = new Audio(),
        this.showBigBoss = false,
        this.armyCall = false,
        this.startIntervalId,
        this.bigBossIntervalId,
        this.dragon,
        this.bigBoss = [],
        this.dragonArmy,
        this.flyingBombs = [],
        this.bgImg.src ='images/bgImg.png',
        this.expSound.src = 'sounds/bombExplotion.flac',
        this.bigBossSound.src = 'sounds/BigBossSound.flac',
        this.collRge = 20,
        this.bombDestroyed = false,
        this.armyUsed = 1,
        this.level  = 1
    }
    startLoop = (callBack)=>{
        this.startIntervalId = setInterval(()=>{
            callBack();

        },5);
    }
    bigBossAppear(){
        this.bigBossIntervalId = setInterval(()=>{
            
        if(this.level >2){
            let newBigBoss = new BigBoss(this.myCanvas, 1000, 20 + Math.floor(Math.random()*30));
            this.bigBoss.push(newBigBoss);
            newBigBoss = new BigBoss(this.myCanvas, 1000, 260 + Math.floor(Math.random()*120));
            this.bigBoss.push(newBigBoss);
        }
        else{
            let newBigBoss = new BigBoss(this.myCanvas, 1000, 50 + Math.floor(Math.random()*290));
            this.bigBoss.push(newBigBoss);
        }
                
        this.bigBossSound.play();
        this.showBigBoss = true;
            
        },25000);
    }
    bigBossFigth(){
        for(let i=0; i<this.bigBoss.length; i++){
            this.bigBoss[i].draw();
            this.bigBoss[i].move();
        }
    }
    callArmy(){
        document.addEventListener('keypress',(event)=>{
            this.dragonArmy = new DragonArmy(this.myCanvas);
            if(event.key === 'q' && this.armyUsed >= 1 && !this.armyCall) {
                this.armyCall = true;
                setTimeout(()=>{
                    // this.dragonArmy.armyCall = false;
                    this.armyUsed -=1;
                },2700)
            }

        });
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
        this.callArmy(); //Add the callArmy listener
        this.startLoop(this.updateCanvas);
    }
    updateCanvas = ()=>{
        this.ctx.drawImage(this.bgImg,0,0,1000,500);
        this.dragon.draw();
        this.displayLevel();
        //dragonArmy called
        this.displayArmyAvailable(); //Show the user that the army is available
        //
        if(this.armyCall && this.armyUsed > 0) {
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
                this.armyCall = false;
                this.dragonArmy.breathsCol();
            },2700)
        }//Show the army
        //Bigboss appears
        if (this.showBigBoss){
            this.bigBossFigth();
            //Check the BB lives:
            for(let i=0; i<this.bigBoss.length; i++){
                if(this.bigBoss[i].positionX <= 5) {this.gameOver();}
                if(this.bigBoss[i].numberOfLives === 0){
                    //this.bigBoss[i].bombExplosion();
                    this.bigBoss[i].draw();
                    this.bigBoss[i].bombExplosion();
                    this.expSound.play();
                    //for(let i=0; i<this.flyingBombs.length; i++)this.flyingBombs[i].bombExplosion(); //Uncoment in case you want to won at level 4
                    //if(this.level === 4)this.gameWon(); //Uncoment in case you want to won at level 4
                    //if(this.level ==1) this.addFlyingBomb();
                    this.armyUsed += 1;
                    if(this.level >=3) this.armyUsed +=1;
                    setTimeout(()=>{
                        this.positionY = 600
                        this.bigBoss.splice(i,1);
                        if(this.bigBoss.length == 0) this.level ++;
                    },800);
                    this.bigBoss[i].numberOfLives = -1
                    //if(this.bigBoss.length == 0)this.showBigBoss = false;
                }
            }
        }
        //Flying bombs managing 
        for(let i=0; i<this.flyingBombs.length; i++){
            this.flyingBombs[i].draw();
            this.flyingBombs[i].move();
            let newBombPosition = 750 + this.level*25;
            if(this.flyingBombs[i].positionX <= newBombPosition+(this.level - 1) * 0.26 && this.flyingBombs[i].positionX >= newBombPosition-(this.level - 1) * 0.26 && this.level < 4){
                this.addFlyingBomb();
            }
            else if(this.level >=4 && this.flyingBombs[i].positionX <= newBombPosition+(this.level - 2) * 0.25 && this.flyingBombs[i].positionX >= newBombPosition-(this.level - 2) * 0.25){
                this.addFlyingBomb();
            }
            if(this.flyingBombs[i].positionX <= 4 + (this.level - 1) * 0.25 && this.flyingBombs[i].positionX >= 4 - (this.level - 1) * 0.25){
                this.dragon.dragonLives -= 1;
            }
        }
        //let randomApp = Math.floor(Math.random()*10000);
        //if(randomApp == 1){this.addFlyingBomb();}
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
                for(let j=0; j<this.bigBoss.length; j++){
                    if((this.dragon.breaths[i].positionX >= this.bigBoss[j].positionX )
                    && (this.dragon.breaths[i].positionY + 40 >= this.bigBoss[j].positionY && this.dragon.breaths[i].positionY <= this.bigBoss[j].positionY + this.bigBoss[j].imgHeight)){
                        this.dragon.breaths[i].collision();
                        this.bigBoss[j].numberOfLives --;
                    }
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
        let bombSpeed = 0.5;
        let randomPost = Math.floor(Math.random()* 470);
        let newflyingBomb = new FlyingBomb(this.myCanvas,randomPost);
        if(this.level <=3) newflyingBomb.posIncrement = bombSpeed + (this.level - 1) * 0.1;
        else newflyingBomb.posIncrement = bombSpeed + (this.level - 1.5) * 0.1;
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
    displayArmyAvailable(){
        // if(this.armyUsed < 0 ){
        //     this.ctx.beginPath();
        //     this.ctx.font = 'bold 14px verdana';
        //     this.ctx.fillStyle = 'green';
        //     this.ctx.fillText(`Armies available: 0`,800,25);
        //     this.ctx.stroke();
        //     this.ctx.closePath();
        // }
        // else{
            this.ctx.beginPath();
            this.ctx.font = 'bold 14px verdana';
            this.ctx.fillStyle = 'green';
            this.ctx.fillText(`Armies available: ${this.armyUsed}`,800,25);
            this.ctx.stroke();
            this.ctx.closePath();
       // }
        
    }
}