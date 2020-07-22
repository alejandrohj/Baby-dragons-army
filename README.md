# Baby-dragons-army
## Description
The baby dragons have to fight for their and their brothe's live againts multiple flying bombs and big bosses. These dragons are small but their dragon breath is very strong! Use it!.

## MVP (DOM - CANVAS)
- The game has one dragon who moves vertically.
- The dragons shot dragon breath.
- Flying bombs appear randomly from the right of the screen.
- One bomb stacking will end the game.
- Dragon breath destroy the flying bombs.
- Reload time for dragon breath.

## Backlog
- Choose multiple maps (diferents backgrounds and bosses).
- Big end boss
- The big boss will dead if you multiples dragon breath.

## Data structure
# main.js
- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}
- buildGameWonScreen(){}

# game.js
- Game () {}
- starLoop () {}
- addFlyingBomb () {}
- bigBossAppear() {}
- bigBossFigth(){}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}
- GameWon () {}

# dragon.js 
- Dragon () {
    this.positionX;
    this.positionY;
    this.dragonLives;
    this.breaths;
}
- draw () {}
- move () {}
- breath () {}
- checkScreenCollision () {}
- drawLive(){}

# flyingBomb.js 
- FlyingBomb () {
    this.positionX;
    this.positionY;
    this.bombDestroyed;
}
- draw () {}
- move () {}
- bombExplosion(){}

# bigBoss.js 
- BigBoss () {
    this.positionX;
    this.positionY;
    this.bombDestroyed;
}
- draw () {}
- move () {}
- bombExplosion(){}
- drawLive(){}

# dragonBreath.js 
- breath () {
    this.x;
    this.y;
    this.direction;
}
- draw () {}
- move () {}
- checkCollisionTop () {}

# dragonArmy.js 
- DragonArmy () {
    this.positionX;
    this.positionY;
    this.dragonLives;
    this.breaths;
}
- armyCalled () {}
- callArmy () {}
- breath () {}

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen

## Task
- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- main - buildGameWonScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- flyingBomb - draw
- flyingBomb - move
- game - addFlyingBomb
- dragon - draw
- dragon - move
- dragon - breath
- game - addFlyingBomb 
- flyingBomb  - draw
- flyingBomb  - move
- game - checkCollision
- game - GameOver
- game - addEventListener

## Links


### Trello
[Link url](https://trello.com/b/uGwsCaER/baby-dragons-army)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)