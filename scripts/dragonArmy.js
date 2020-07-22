class DragonArmy {
    constructor(canvas){
        this.canvas = canvas,
        this.ctx = canvas.getContext('2d'),
        this.dragonMember,
        this.dbreathSound = new Audio(),
        // this.blackDragon = new Image(),
        // this.brownDragon = new Image(),
        // this.yellowDragon = new Image(),
        // this.orangeDragon = new Image(),
        // this.pinkDragon = new Image(),
        this.greenDragon = 'images/DragonGreen1.png',
        this.blackDragon = 'images/DragonBlack1.png',
        this.brownDragon = 'images/DragonBrown1.png',
        this.yellowDragon = 'images/DragonYellow1.png',
        this.orangeDragon = 'images/DragonOrange1.png',
        this.pinkDragon = 'images/DragonPink1.png',
        this.darkGreenDragon = 'images/DragonDarkGreen1.png'
        this.dbreathSound.src = 'sounds/dragonBreath.wav',
        this.positionX = 0,
        this.positionY = 40,
        this.dragonArmy = [this.greenDragon, this.blackDragon, this.brownDragon, this.yellowDragon, this.orangeDragon,this.pinkDragon, this.darkGreenDragon],
        this.armyCall = false,
        this.breaths =[],
        this.numberOfbreaths = 1,
        this.breathsCounts = [0,0,0,0,0,0,0] //Have to be the same length of dragonArmy
    }
    armyCalled(){
        this.positionY = 0;
        for(let i=0; i<this.dragonArmy.length; i++){
            this.dragonMember = new Image();
            this.dragonMember.src = this.dragonArmy[i];
            this.ctx.drawImage(this.dragonMember,this.positionX,this.positionY,70,50);
            if(this.breathsCounts[i] < this.numberOfbreaths) {
                for(let x=0; x<=1; x++){
                    let separation = x*35;
                    let newBreath = new DragonBreath(this.ctx,this.positionX - separation,this.positionY + separation);
                    this.breaths.push(newBreath);
                }
                
                this.breathsCounts[i]++;
                this.dbreathSound.play();
            }
            this.positionY +=  70;
        }
    }
    callArmy(){
        document.addEventListener('keypress',(event)=>{
            console.log(event.key);
            if(event.key === 'q') this.armyCall = true;
        });
    }
}