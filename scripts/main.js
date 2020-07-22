//#region Fields
let bodyElem = document.querySelector('body');
let playerName;
let myCanvas;
let ctx;
let generalDiv = document.querySelector('.all');
let mainDiv;
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
    mainDiv = document.createElement('div');
    mainDiv.classList.add('splash');
    mainDiv.innerHTML = `
        <h1 id="title">Baby Dragons Army</h1>
        <h2>Instructions</h2>
        <p>Burn the bombs before them reach your mountain's home, be cafully these bombs have been sent by something.</p>
        <span>Arrow Up --> FlyUp</span><br>
        <span>Arrow Down --> FlyDown</span><br>
        <span>Space --> Dragon breath</span><br>
        <span> q --> call The Dragon Army</span><br>
        <div class="startForm">
            <p>Name:</p>
            <input id="playerName">
            <button class="btn start">START!</button>
        </div>`;
    generalDiv.appendChild(mainDiv);
    
}
function buildGameScreen(){
    game = new Game(generalDiv);
    game.drawCanvas();
}
function buildGameOverScreen(){
    generalDiv.innerHTML = "";
    mainDiv = document.createElement('div');
    mainDiv.classList.add('splash');
    mainDiv.innerHTML = `
        <h1 id="title">Game Over</h1>
        <h2>${playerName.value}!! you have reached the level: ${game.level}</h2>
        <p>Remember : Burn the bombs before them reach you, be cafully these bombs have been sent by something.</p>
        <span>Arrow Up --> FlyUp</span><br>
        <span>Arrow Down --> FlyDown</span><br>
        <span>Space --> Dragon breath</span><br>
        <span> q --> call The Dragon Army</span><br>
        <div class="startForm">
            <p>Name:</p>
            <input id="playerName">
            <button class="btn restart">RESTART!</button>
        </div>`;
    generalDiv.appendChild(mainDiv);
    document.querySelector('.btn.restart').addEventListener('click',()=>{
        generalDiv.innerHTML = "";
        requestAnimationFrame(buildGameScreen);
    });
}
// function buildGameWonScreen(){ //Uncoment in case you want to display game won at some point
//     generalDiv.innerHTML = "";
//     mainDiv = document.createElement('div');
//     mainDiv.classList.add('splash');
//     mainDiv.innerHTML = `
//         <h1 id="title">YOU WIN!</h1>
//         <h2>You are the strongest baby dragon</h2>
//         <p></p>
//         <span>Arrow Up --> FlyUp</span><br>
//         <span>Arrow Down --> FlyDown</span><br>
//         <span>Space --> Dragon breath</span><br>
//         <span> q --> call The Dragon Army</span><br>
//         <div class="startForm">
//             <p>Name:</p>
//             <input id="playerName">
//             <button class="btn restart">RESTART!</button>
//         </div>`;
//     generalDiv.appendChild(mainDiv);
//     document.querySelector('.btn.restart').addEventListener('click',()=>{
//         generalDiv.innerHTML = "";
//         requestAnimationFrame(buildGameScreen);
//     });
// }
//#endregion Methods


//#region windowLoadListener
window.addEventListener('load',()=>{
    buildSplashScreen();
    document.querySelector('.btn.start').addEventListener('click',()=>{
        playerName = document.querySelector('#playerName');
        generalDiv.innerHTML = "";
        requestAnimationFrame(buildGameScreen);
    });
});
//#endregion windowLoadlistener

//#region Param

//#endregion Param