//#region Fields
let bodyElem = document.querySelector('body');
let playerName;
let myCanvas;
let ctx;

//Class fields:
let dragon;
let game;
let flyingBombs;

let bgImg = new Image();
bgImg.src = 'images/bgImg.png';
//let myGame = new Game();
//Classes:


//#endregion Fields

//#region Methods
function buildSplashScreen(){
    bodyElem.style.backgroundColor = '#a3f0b6'
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('splash');
    mainDiv.innerHTML = `
        <h1 id="title">Baby Dragons Army</h1>
        <h2>Instructions</h2>
        <p>Burn the bombs before them reach your mountain's home, be cafully these bombs have been sent by something.</p>
        <span>Arrow Up --> FlyUp</span><br>
        <span>Arrow Down --> FlyDown</span><br>
        <span>Space --> Dragon breath</span><br>
        <div class="startForm">
            <p>Name:</p>
            <input id="playerName">
            <button class="btn start">START!</button>
        </div>`;
    bodyElem.appendChild(mainDiv);
    
}
function buildGameScreen(){
    game = new Game(bodyElem);
    game.drawCanvas();
}
function buildGameOverScreen(){
    bodyElem.innerHTML = "";
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('splash');
    mainDiv.innerHTML = `
        <h1 id="title">Game Over</h1>
        <p>Remember : Burn the bombs before them reach your mountain's home, be cafully these bombs have been sent by something.</p>
        <span>Arrow Up --> FlyUp</span><br>
        <span>Arrow Down --> FlyDown</span><br>
        <span>Space --> Dragon breath</span><br>
        <div class="startForm">
            <p>Name:</p>
            <input id="playerName">
            <button class="btn restart">RESTART!</button>
        </div>`;
    bodyElem.appendChild(mainDiv);
    document.querySelector('.btn.restart').addEventListener('click',()=>{
        bodyElem.innerHTML = "";
        requestAnimationFrame(buildGameScreen);
    });
}
function buildGameWonScreen(){
    bodyElem.innerHTML = "";
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('splash');
    mainDiv.innerHTML = `
        <h1 id="title">YOU WIN!</h1>
        <h2>You are the strongest baby dragon!</h2>
        <p>YOU HAVE SAVED YOUR SIBLING'S LIVES</p>
        <span>Arrow Up --> FlyUp</span><br>
        <span>Arrow Down --> FlyDown</span><br>
        <span>Space --> Dragon breath</span><br>
        <div class="startForm">
            <p>Name:</p>
            <input id="playerName">
            <button class="btn restart">RESTART!</button>
        </div>`;
    bodyElem.appendChild(mainDiv);
    document.querySelector('.btn.restart').addEventListener('click',()=>{
        bodyElem.innerHTML = "";
        requestAnimationFrame(buildGameScreen);
    });
}
//#endregion Methods


//#region windowLoadListener
window.addEventListener('load',()=>{
    buildSplashScreen();
    document.querySelector('.btn.start').addEventListener('click',()=>{
        playerName = document.querySelector('#playerName');
        bodyElem.innerHTML = "";
        requestAnimationFrame(buildGameScreen);
    });
});
//#endregion windowLoadlistener

//#region Param

//#endregion Param