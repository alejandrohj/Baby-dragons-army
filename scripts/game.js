class Game {
    constructor(body){
        this.body = body,
        this.myCanvas = null,
        this.ctx = null,
        this.bgImg = new Image(),
        this.expSound = new Audio(),
        this.startIntervalId,
        this.enemiesIntervalId,
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
    // enemiesLoop = (callBack) =>{
    //     this.enemiesIntervalId = setInterval(()=>{
    //         callBack();
    //     },1000);
    // }
    drawCanvas(){
        let theGameDiv = document.createElement('div');
        theGameDiv.classList.add('gamePanel');
        theGameDiv.innerHTML = `<canvas id="game" width="1000" height="500"></canvas>`;
        this.body.appendChild(theGameDiv);
        this.myCanvas = document.querySelector('#game');
        this.ctx = this.myCanvas.getContext('2d');
        this.ctx.drawImage(this.bgImg,0,0,1000,500);
        dragon = new Dragon(this.myCanvas);
        this.addFlyingBomb();
        dragon.move();
        dragon.breath();
        //Start Game:
        this.startLoop(this.updateCanvas);
    }
    updateCanvas = ()=>{
        this.ctx.drawImage(this.bgImg,0,0,1000,500);
        dragon.draw();
        for(let i=0; i<this.flyingBombs.length; i++){
            this.flyingBombs[i].draw();
            this.flyingBombs[i].move();
            if(this.flyingBombs[i].positionX == 800){this.addFlyingBomb();}
            if(this.flyingBombs[i].positionX == 1){dragon.dragonLives -= 1;}
        }

        for(let i=0; i < dragon.breaths.length; i++){
            dragon.breaths[i].move();
            dragon.breaths[i].draw();
            for(let j=0; j<this.flyingBombs.length; j++){
                if((dragon.breaths[i].positionX + this.collRge >= this.flyingBombs[j].positionX && dragon.breaths[i].positionX - this.collRge <= this.flyingBombs[j].positionX)
                    && (dragon.breaths[i].positionY + this.collRge >= this.flyingBombs[j].positionY && dragon.breaths[i].positionY - this.collRge <= this.flyingBombs[j].positionY )){
                    this.flyingBombs[j].bombExplosion();
                    dragon.breaths[i].collision();
                    this.expSound.play();
                    //this.bombDestroyed = true;
                }
            }
        }
        if(dragon.dragonLives == 0){
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
}