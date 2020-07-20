class Game {
    constructor(body){
        this.body = body,
        this.myCanvas,
        this.bgImg = new Image(),
        this.startIntervalId
    }
    startLoop(callBack){
        this.startIntervalId = setInterval(()=>{
            callBack();

        },10);
    }
    drawCanvas(){
        let theGameDiv = document.createElement('div');
        theGameDiv.classList.add('gamePanel');
        theGameDiv.innerHTML = `<canvas id="game" width="1000" height="500"></canvas>`;
        this.body.appendChild(theGameDiv);
        myCanvas = document.querySelector('#game');
        ctx= myCanvas.getContext('2d');
        ctx.drawImage(bgImg,0,0,1000,500);

        dragon = new Dragon(myCanvas);
        flyingBombs = new FlyingBomb(myCanvas);
        flyingBombs.draw();
        dragon.move();
        dragon.breath();
        //Start Game:
        this.startLoop(this.updateCanvas);
    }
    updateCanvas(){
        ctx.drawImage(bgImg,0,0,1000,500);
        dragon.draw();
        flyingBombs.draw();
        flyingBombs.move();
        for(let i=0; i < dragon.breaths.length; i++){
            dragon.breaths[i].move();
            dragon.breaths[i].draw();
        }
    }
}