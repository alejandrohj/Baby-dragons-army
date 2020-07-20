class Dragon {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'),
        this.DragonImgUp = new Image(),
        this.positionX = 50,
        this.positionY = 100,
        this.posIncrement = 5,
        this.DragonImgUp.src = 'images/DragonBlue1.png';
        this.breaths = [];
    }
    draw(){
        this.ctx.drawImage(this.DragonImgUp,this.positionX,this.positionY,70,50);
    }
    move(){
        const once = {
            once : true
          };
        document.addEventListener('keydown',(event)=>{
                if(event.key ==='ArrowUp') this.positionY -=this.posIncrement;
                if(event.key ==='ArrowDown') this.positionY +=this.posIncrement;
                console.log(event.key)
            
        });
    }
    breath(){
        document.addEventListener('keydown',(event)=>{
            if(event.key === 'ArrowRight') { 
                let newBreath = new DragonBreath(ctx,this.positionX,this.positionY);
                this.breaths.push(newBreath);
                console.log(newBreath);
                console.log(this.breath.length)
            }
        });
    }
}  