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
- Big end boss
- The big boss will dead if you multiples dragon breath.

## Backlog
- Choose multiple maps (diferents backgrounds and bosses).

## Data structure
# main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js
- Game () {}
- starLoop () {}
- checkCollisions () {}
- addFlyingBomb () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# dragon.js 

- Dragon () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- breath () {}
- checkScreenCollision () {}

# flyingBomb.js 

- FlyingBomb () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollisionBotton () {}

# dragonBreath.js 

- Cannonball () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollisionTop () {}

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
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- flyingBomb - draw
- flyingBomb - move
- game - addTentacle
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
