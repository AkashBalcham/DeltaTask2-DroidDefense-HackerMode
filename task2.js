let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth-17;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let score1 = localStorage.getItem('top1') || '';
let score2 = localStorage.getItem('top2') || '';
let score3 = localStorage.getItem('top3') || '';



//Creating the necessary variables
let t1 = 0, t2 = 0, t3 = 0, tRef;

let bullets = [];
let bulletsToRemove = [];
let enemyBullets = [];
let enemyBulletsToRemove = [];
let enemies = [];
let defeatedEnemies = [];
let powerUps = [];

let initPCount;
let shieldActive = 0;
let playerDir = '';
let bulletSpam = 0;
let bulletVelocity = 10;
let enemyVelocity = 3;
let lives = 11;
let maxLives = 11;
let enemiesKilled = 0;
let score = 0;
let moveSpeed = 10;

let isPaused = 0;

function drawHealthBar() {              //Giving a white background to the health bar
    c.fillStyle = 'white';
    c.fillRect(50, 30, 50*maxLives, 30);
}

function drawPlayerHealthBar() {
    c.fillStyle = 'white';
    c.fillRect(750, 30, 50*10, 30);
}

function drawScore() {                  //Updates the score every frame
    c.fillStyle = 'white';
    c.fillText(`Score: ${score}`, 1550, 55);
}

window.addEventListener('resize', function() {      
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

/*
//Moves the player left and right using arrow keys
window.addEventListener('keydown', function(event) {        
    if(event.code === 'ArrowLeft' || event.code === 'KeyA') {
        console.log('left');
        playerDir = 'left';
        
        if(playerPos.x > p1.radius) {
            playerPos.x -= 20;
            playerText.x -= 20; 
        } 
        
    } else if(event.code === 'ArrowRight' || event.code === 'KeyD') {
        console.log('right');
        playerDir = 'right';
        
        if(playerPos.x < canvas.width - p1.radius-2) {
            playerPos.x += 20;
            playerText.x += 20;
        }
    } else if (event.code === 'ArrowUp' || event.code === 'KeyW') {
        if(playerPos.y > p1.radius) {
            playerPos.y -= 20;
            playerText.y -= 20; 
        }
    } else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
        if(playerPos.x < canvas.height - p1.radius-2) {
            playerPos.y += 20;
            playerText.y += 20;
        }
    }
})
*/





let keyStates = {};

window.addEventListener('keydown', function(event) {
    keyStates[event.code] = true;
  });
  
window.addEventListener('keyup', function(event) {
        keyStates[event.code] = false;
});
  
  // Update the player's position based on key states
function updatePlayerPosition() {
    if (keyStates['ArrowLeft'] || keyStates['KeyA']) {
      // Move left
      if (playerPos.x > p1.radius) {
        playerPos.x -= moveSpeed;
        playerText.x -= moveSpeed;
      }
    }
    if (keyStates['ArrowRight'] || keyStates['KeyD']) {
      // Move right
      if (playerPos.x < canvas.width - p1.radius - 2) {
        playerPos.x += moveSpeed;
        playerText.x += moveSpeed;
      }
    }
    if (keyStates['ArrowUp'] || keyStates['KeyW']) {
      // Move up
      if (playerPos.y > p1.radius) {
        playerPos.y -= moveSpeed;
        playerText.y -= moveSpeed;
      }
    }
    if (keyStates['ArrowDown'] || keyStates['KeyS']) {
      // Move down
      if (playerPos.y < canvas.height - p1.radius - 2) {
        playerPos.y += moveSpeed;
        playerText.y += moveSpeed;
      }
    }
}










//Keeps track of the mouse position
window.addEventListener('mousemove', function(event) {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;

})

//Notes the position when we click and creates a bullet object
window.addEventListener('click', function(event) {          //c.fillRect(1600, 800, 90, 40);
    if(event.button === 0) {
        /*
        tRef = new Date();
        
        console.log(bulletSpam);
        mouseClickPos.x = mousePos.x;
        mouseClickPos.y = mousePos.y;
        console.log("time difference: ", tRef-t3);
        if(tRef - t3 >= 800) {
            if(bulletSpam === 0) {
                bulletSpam++;
                t1 = new Date();
                console.log(t1);
                bullets.push(new Bullet('Player', p1.x, p1.y));
            } else if (bulletSpam === 2) {
                bulletSpam++;
                t3 = new Date();
                console.log(t3);
                if(t3-t2 >= 800) {
                    bulletSpam = 0;
                }
                bullets.push(new Bullet('Player', p1.x, p1.y));
                bulletSpam = 0;
            } else {
                t2 = new Date();
                bulletSpam++;
                console.log(t2);
                if(t2-t1 >= 800) {
                    bulletSpam = 0;
                }
                bullets.push(new Bullet('Player', p1.x, p1.y));
            }
            /*
            if((t2-t1) >= 700 || (t3-t2) >= 700) {
                bulletSpam = 0;
                bullets.push(new Bullet());
            } else if((t3-t1) >= 700){
                bullets.push(new Bullet());
            } 
            */
        mouseClickPos.x = mousePos.x;
        mouseClickPos.y = mousePos.y;
        bullets.push(new Bullet('Player', p1.x, p1.y));
    }
        

        //bullets.push(new Bullet());
    
        /*
        if(mouseClickPos.x >= 1600 && mouseClickPos.x <= 1690 && mouseClickPos.y >= 800 && mouseClickPos.y <= 840) {
            isPaused = 1;
            pauseGame();
        } else {
            bullets.push(new Bullet());
        }
        */
    
})

//Useful objects to store the required data
let playerPos = {x: undefined,
                 y: undefined
};

let mousePos = {x: undefined,
                y: undefined
};

let mouseClickPos = {x: undefined,
                     y: undefined
};

let playerText = {x: 163,
                  y: canvas.height - 30
};

//A class containing attributes and methods for the controllable player
class Player {
    constructor() {
        this.x = 200;
        this.y = window.innerHeight - 100;
        this.lives = 10;
        playerPos.x = this.x;
        playerPos.y = this.y;
        this.radius = 40;
        this.colour = 'rgb(204, 51, 153)';
        
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.colour;
        c.fill();
        c.stroke();
    }

    update() {
        this.draw();

        
        if(playerDir === 'left') {
            if(playerPos.x > p1.radius) {
                playerPos.x -= 20;
                playerText.x -= 20; 
            }
        } else if (playerDir === 'right') {
            if(playerPos.x < canvas.width - p1.radius-2) {
                playerPos.x += 20;
                playerText.x += 20;
            } 
        }
        playerDir = '';
        this.x = playerPos.x;
        this.y = playerPos.y;
    }
}

//A class which dictates behaviour of every bullet
class Bullet {
    constructor(type, x, y) {
        this.type = type;
        this.radius = 10;
        if(this.type === 'Player') {
            this.colour = 'rgb(209, 71, 163)';
            this.x = x;
            this.y = y;
            this.angle = Math.atan((mouseClickPos.y - p1.y) / (mouseClickPos.x - p1.x));
            this.direction = Math.sign(mouseClickPos.x - p1.x);
            this.dx = Math.cos(this.angle) * bulletVelocity * this.direction;
            this.dy = Math.sin(this.angle) * bulletVelocity * this.direction;
        } else if (this.type === 'Enemy') {
            this.count = 0;
            this.colour = 'rgb(0, 204, 153)';
            this.x = x;
            this.y = y;
            this.angle = Math.atan((this.y - p1.y) / (this.x - p1.x));
            this.direction = Math.sign(this.x - p1.x);
            this.dx = Math.cos(this.angle) * (bulletVelocity-3) * -this.direction;
            this.dy = Math.sin(this.angle) * (bulletVelocity-3) * -this.direction;
        }
        
        
    }
    

    shoot() {
        c.beginPath();
        c.arc(this.x, this.y, 10, 0, Math.PI * 2);
        c.fillStyle = this.colour;
        c.fill();
    }

    update() {
        
        this.shoot();
       
        this.x += this.dx;
        this.y += this.dy;

        if (
            this.x <= this.radius ||
            this.x >= canvas.width - this.radius ||
            this.y <= this.radius ||
            this.y >= canvas.height - this.radius
          ) {
            if(this.type === 'Player') {
                bulletsToRemove.push(this);
            } else if (this.type === 'Enemy') {
                enemyBulletsToRemove.push(this);
            }
            
          }
    }
}

//Dictatres behaviour of the enemy bot
class Enemy {
    constructor(x) {
        this.count = 0;
        this.x = x;
        this.y = 100;
        this.width = 40;
        this.height = 40;
        this.isAlive = true;
        this.targetX = home.x + home.width/2;
        this.targetY = home.y + home.height/2;
        this.angle = Math.atan((this.targetY - this.y)/(this.targetX - this.x));
        this.direction = Math.sign(this.targetX - this.x);
        this.target = 'home';
        this.dx = Math.cos(this.angle) * enemyVelocity * this.direction;
        this.dy = Math.sin(this.angle) * enemyVelocity * this.direction;
    }

    shoot() {
        /*
        const angle = Math.atan2(p1.y - this.y, p1.x - this.x);
        const dx = Math.cos(angle) * bulletVelocity;
        const dy = Math.sin(angle) * bulletVelocity;
        const bullet = new Bullet('Enemy', this.x, this.y, dx, dy);
        enemyBullets.push(bullet);
        */
    }

    draw() {
        c.fillStyle = 'rgb(255, 51, 51)';
        c.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.shoot();
        this.x += this.dx;
        this.y += this.dy;

        const angle = Math.atan2(p1.y - this.y, p1.x - this.x);
        const dx = Math.cos(angle) * bulletVelocity * -1;
        const dy = Math.sin(angle) * bulletVelocity * -1;

        if (this.count % 100 === 0) { // Shoot every 400 frames
        const bullet = new Bullet('Enemy', this.x, this.y, dx, dy);
        enemyBullets.push(bullet);
        }
        this.count++;
        
    }
}

/*
class EnemyBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.atan((p1.y - this.y) / (p1.x - this.x));
        this.direction = Math.sign(p1.x - this.x);
        this.dx = Math.cos(this.angle) * bulletVelocity * this.direction;
        this.dy = Math.sin(this.angle) * bulletVelocity * this.direction;
        this.radius = 10;
    }

    shoot() {
        c.beginPath();
        c.arc(this.x, this.y, 10, 0, Math.PI * 2);
        c.fillStyle = 'grey';
        c.fill();
    }

    update() {
        this.shoot();

        this.x += this.dx;
        this.y += this.dy;

        this.angle = Math.atan((p1.y - this.y) / (p1.x - this.x));
        this.direction = Math.sign(p1.x - this.x);

        if(collideCircle(this.x, this.y, p1.x, p1.y, this.radius, p1.radius)) {
            enemyBulletsToRemove.push(this);
        }
    }
}
*/

//A class for the home base to be defened
class HomeBase {
    constructor() {
        this.width = 150;
        this.height = 150;
        this.x = (canvas.width-this.width)/2;
        this.y = canvas.height - 300;
        this.colour ='rgb(200, 200, 0)';
        this.count = 0;
    }

    draw() {
        if(shieldActive) {
            c.beginPath();
            c.arc(this.x + this.width/2, this.y + this.height/2, this.width / 2**0.5, 0, Math.PI * 2);
            c.fillStyle = 'rgba(242, 242, 242, 0.5)';
            c.fill();

            this.count++;
            
            if(this.count % 500 === 0) {
                shieldActive = 0;
                p = setInterval(generatePowerUp, 6000);
            }

        }
        


        c.fillStyle = this.colour;
        c.fillRect(this.x, this.y, this.width, this.height);
       

        c.font = '25px';
        c.fillStyle = 'white';
        c.fillText('Home', this.x+40, this.y+80);
    }

    update() {
        this.draw();
    }
}

//A class to set the width of the health bar based on number of lives
class HealthBar {
    constructor() {
        this.x = 50;
        this.y = 30;
        //this.width = 500;
        this.height = 30;
        //this.colour = ;
    }

    draw() {
        this.width = lives * 50;
        if(lives >= 7) {
            this.colour = 'rgb(0, 204, 0)';
        } else if (lives < 7 && lives >= 4) {
            this.colour = 'rgb(255, 204, 0)';
        } else if (lives >= 1 && lives < 4) {
            this.colour = 'rgb(255, 51, 0)';
        }
        c.fillStyle = this.colour;
        c.fillRect(this.x, this.y, this.width, this.height);

        c.fillStyle = 'black';
        c.fillText('Home Health', 70, 55);
    }

    update() {
        this.draw();
    }
}


class PlayerHealthBar {
    constructor() {
        this.x = 750;
        this.y = 30;
        //this.width = 500;
        this.height = 30;
        //this.colour = ;
    }

    draw() {
        this.width = p1.lives * 50;
        if(p1.lives >= 7) {
            this.colour = 'rgb(0, 204, 0)';
        } else if (p1.lives < 7 && p1.lives >= 4) {
            this.colour = 'rgb(255, 204, 0)';
        } else if (p1.lives >= 1 && p1.lives < 4) {
            this.colour = 'rgb(255, 51, 0)';
        }
        c.fillStyle = this.colour;
        c.fillRect(this.x, this.y, this.width, this.height);

        c.fillStyle = 'black';
        c.fillText('Player Health', 750, 55);
    }

    update() {
        this.draw();
    }
}

class PowerUp {
    constructor() {
        this.radius = 10;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height - 2*this.radius) + this.radius;
        shieldActive = 0;
        this.count = 0;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'rgb(51, 51, 255)';
        c.fill();
    }

    update() {
        this.draw();
        if(shieldActive) {
            console.log('protective shield');
            
        }    
    }
}

phb1 = new PlayerHealthBar();


hb1 = new HealthBar();      //Creating a health bar
home = new HomeBase();      //Creating a home base
p1 = new Player();          //Creating the user-controlled player

//Creating initial 4 enemy bots
e1 = new Enemy(Math.floor(Math.random() * canvas.width - 2*80) + 80);
e2 = new Enemy(Math.floor(Math.random() * canvas.width - 2*80) + 80);
e3 = new Enemy(Math.floor(Math.random() * canvas.width - 2*80) + 80);
e4 = new Enemy(Math.floor(Math.random() * canvas.width - 2*80) + 80);

//Storing the bots in an array
enemies.push(e1);
enemies.push(e2);
enemies.push(e3);
enemies.push(e4);


//Keeps creating 3 enemies after 4 seconds
function generateEnemy() {
    clearInterval(x);

    let posX1 = Math.floor(Math.random() * canvas.width - 2*80) + 80;
    let posX2 = Math.floor(Math.random() * canvas.width - 2*80) + 80;
    let posX3 = Math.floor(Math.random() * canvas.width - 2*80) + 80;
    enemies.push(new Enemy(posX1));
    enemies.push(new Enemy(posX2));
    enemies.push(new Enemy(posX3));

    x = setInterval(generateEnemy, 4000);
}
let x = setInterval(generateEnemy, 4000);


function generatePowerUp() {
    clearInterval(p);
    if(powerUps) {
        for(let i=0; i<powerUps.length; i++) {
            powerUps.splice(0, 1);
        }
        
    }
    powerUps = [];
    powerUps.push(new PowerUp());
    p = setInterval(generatePowerUp, 6000);
}
p = setInterval(generatePowerUp, 6000);

function init() {
    p1.update();
}

function collideCircle(x1, y1, x2, y2, r1, r2) {
    return (((x1-x2)**2 + (y1-y2)**2))**0.5 <= r1+r2;
}


//Checks if 2 rectangles are colliding
function collideRect(r1, r2) {
    if(r1.x <= r2.x + r2.width && r1.x + r1.width >= r2.x && r1.y <= r2.y + r2.height && r1.y + r1.height >= r2.y) {
        return true;
    } else {return false;}
}

//Checks if a circle and a rectangle are colliding
function checkCollision(circle, rectangle) {
    let circleDistanceX = Math.abs(circle.x - rectangle.x - rectangle.width / 2);
    let circleDistanceY = Math.abs(circle.y - rectangle.y - rectangle.height / 2);
  
    if (circleDistanceX > (rectangle.width / 2 + circle.radius)) {
      return false;
    }
    if (circleDistanceY > (rectangle.height / 2 + circle.radius)) {
      return false;
    }
  
    if (circleDistanceX <= (rectangle.width / 2) && (circleDistanceY <= (rectangle.height / 2))) {
      return true;
    }
    /*
    if (circleDistanceY <= (rectangle.height / 2)) {
      return true;
    }
    */
  
    let cornerDistanceSq = Math.pow(circleDistanceX - rectangle.width / 2, 2) +
                           Math.pow(circleDistanceY - rectangle.height / 2, 2);
  
    return (cornerDistanceSq <= Math.pow(circle.radius, 2));
}

//Redraws the entire screen after each frame
function animate() {
    requestAnimationFrame(animate);         //Calls the animate function after each frame
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);       //Clears the canvas to redraw

    drawHealthBar();            //Updates the health bar width
    drawPlayerHealthBar();

    //p1.update();                //Updates the player position
    home.update();          
    for(let i=0; i<bullets.length; i++) {
        bullets[i].update();        //Updates the bullets shot which is in the frame
    }

    for(let i=0; i<enemyBullets.length; i++) {
        enemyBullets[i].update();
        
    }

    //Removes the bullets which are out of the frame
    for (let i = 0; i < bulletsToRemove.length; i++) {
        const bullet = bulletsToRemove[i];
        const index = bullets.indexOf(bullet);
        if (index > -1) {
          bullets.splice(index, 1);
        }
    }
    bulletsToRemove = [];

    for(let i=0; i<enemyBulletsToRemove.length; i++) {
        const bulletE = enemyBulletsToRemove[i];
        const indexE = enemyBullets.indexOf(bulletE);
        if(indexE > -1) {
            enemyBullets.splice(indexE, 1);
        }
    }
    enemyBulletsToRemove = [];

    //Creates the text below the player
    c.font = '25px Arial';
    c.fillStyle = 'white';
    c.fillText('Player', playerText.x, playerText.y);
    
    for(let i=0; i<enemies.length; i++) {
        if(enemies[i].isAlive) {
            enemies[i].update();
        }

        //Checking if the enemy has attacked the home base successfully
        if(collideRect(home, enemies[i])) {
            console.log("Destroying!!");
            if(!shieldActive) {
                --lives;                //Decreases the width of the health bar
                if(lives === 0) {       //Checking if all lives are lost
                    clearInterval(x);   //Stops generating enemies
                    enemies = [];
                    break;
                }
            }
            
            enemies[i].isAlive = false;
            defeatedEnemies.push(i);
        }
        
    }

    if(lives === 0 || p1.lives === 0) {
        endGame();
    }

    //console.log(defeatedEnemies);
    for(let i=0; i<defeatedEnemies.length; i++) {
        enemies.splice(defeatedEnemies[i], 1);
    }
    defeatedEnemies = [];

    

    for(let i=0; i<enemyBullets.length; i++) {
        if(collideCircle(enemyBullets[i].x, enemyBullets[i].y, p1.x, p1.y, enemyBullets[i].radius, p1.radius)) {
            console.log('Player hit');
            p1.lives--;
            enemyBullets.splice(i, 1);
        }
    }

    //Checks if the bullet hits the enemy bot
    for(let i=0; i<bullets.length; i++) {
        for(let j=0; j<enemies.length; j++) {
            if(checkCollision(bullets[i], enemies[j])) {
                score += 20;               
                enemiesKilled++;
                if(score > 0 && score%100 === 0) {
                    if(lives < maxLives) {
                        ++lives;
                    }
                }
                if(score > 0 && score%200 === 0) {
                    if(p1.lives < 10) {
                        p1.lives++;
                    }
                }
                bullets.splice(i, 1);
                enemies[j].isAlive = false;
                defeatedEnemies.push(j);
            }
        }
    }

    //Removes the killed enemies from the screen
    for(let i=0; i<defeatedEnemies.length; i++) {
        enemies.splice(defeatedEnemies[i], 1);
    }
    defeatedEnemies = [];
    

    hb1.update();
    phb1.update();
    drawScore();        //Updates the score

    for(let i=0; i<powerUps.length; i++) {
        powerUps[i].update();
    }

    for(let i=0; i<powerUps.length; i++) {
        if(collideCircle(powerUps[i].x, powerUps[i].y, p1.x, p1.y, powerUps[i].radius, p1.radius)) {
            //initPCount = powerUps[i].count;
            //console.log(obt)
            shieldActive = 1;
            clearInterval(p);
            for(let i=0; i<powerUps.length; i++) {
                powerUps.splice(0, 1);
            }
            powerUps = [];
            
        }
    }

    updatePlayerPosition();
    p1.update();
    //drawPauseButton();

}

/*
function drawPauseButton() {
    c.fillStyle = 'white';
    c.fillRect(1600, 800, 90, 40);

    c.fillStyle = 'black';
    c.fillText('Pause', 1610, 827, 90, 40);
}


function pauseGame() {
    clearInterval(x);
    cancelAnimationFrame(animate);
    document.querySelector('.overlay2').style.display = 'block';
}

function resumeGame() {
    x = setInterval(generateEnemy, 4000);
    document.querySelector('.overlay2').style.display = 'none';
    animate();
}
*/

//A function when the game ends
function endGame() {
    clearInterval(p);
    clearInterval(x);
    if(score1 === '') {
        document.querySelector('.first').innerHTML = `1.${score}`;
        localStorage.setItem('top1', `${score}`);
    } else if (score2 === '') {
        if(score > score1) {
            document.querySelector('.first').innerHTML = `1)${score} pts`;
            localStorage.setItem('top1', `${score}`);
            document.querySelector('.second').innerHTML = `2)${score1} pts`; 
            localStorage.setItem('top2', `${score1}`);
        } else {
            document.querySelector('.first').innerHTML = `1)${score1} pts`;
            localStorage.setItem('top1', `${score1}`);
            document.querySelector('.second').innerHTML = `2)${score} pts`; 
            localStorage.setItem('top2', `${score}`);
        }
    } else if (score3 === '') {
        if(score > score1) {
            document.querySelector('.first').innerHTML = `1)${score} pts`;
            localStorage.setItem('top1', `${score}`);
            document.querySelector('.second').innerHTML = `2)${score1} pts`; 
            localStorage.setItem('top2', `${score1}`);
            document.querySelector('.third').innerHTML = `3)${score2} pts`;
            localStorage.setItem('top3', `${score2}`);
        } else if (score > score2 && score <= score1) {
            document.querySelector('.first').innerHTML = `1)${score1} pts`;
            localStorage.setItem('top1', `${score1}`);
            document.querySelector('.second').innerHTML = `2)${score} pts`; 
            localStorage.setItem('top2', `${score}`);
            document.querySelector('.third').innerHTML = `3)${score2} pts`;
            localStorage.setItem('top3', `${score2}`);
        } else if (score <= score2) {
            document.querySelector('.first').innerHTML = `1)${score1} pts`;
            localStorage.setItem('top1', `${score1}`);
            document.querySelector('.second').innerHTML = `2)${score2} pts`; 
            localStorage.setItem('top2', `${score2}`);
            document.querySelector('.third').innerHTML = `3)${score} pts`;
            localStorage.setItem('top3', `${score}`);
        }
    } else {
        if(score > score1) {
            document.querySelector('.first').innerHTML = `1)${score} pts`;
            localStorage.setItem('top1', `${score}`);
            document.querySelector('.second').innerHTML = `2)${score1} pts`; 
            localStorage.setItem('top2', `${score1}`);
            document.querySelector('.third').innerHTML = `3)${score2} pts`;
            localStorage.setItem('top3', `${score2}`);
        } else if (score > score2) {
            document.querySelector('.first').innerHTML = `1)${score1} pts`;
            localStorage.setItem('top1', `${score1}`);
            document.querySelector('.second').innerHTML = `2)${score} pts`; 
            localStorage.setItem('top2', `${score}`);
            document.querySelector('.third').innerHTML = `3)${score2} pts`;
            localStorage.setItem('top3', `${score2}`);
        } else if (score > score3) {
            document.querySelector('.first').innerHTML = `1)${score1} pts`;
            localStorage.setItem('top1', `${score1}`);
            document.querySelector('.second').innerHTML = `2)${score2} pts`; 
            localStorage.setItem('top2', `${score2}`);
            document.querySelector('.third').innerHTML = `3)${score} pts`;
            localStorage.setItem('top3', `${score}`);
        }
    }
    document.querySelector('.score').innerHTML = `Score: ${score}`;
    document.querySelector('.enemies-killed').innerHTML = `Enemy bots destroyed: ${enemiesKilled}`;
    document.querySelector('.overlay').style.display = 'block';
}

//Keeps updating all the elements on the canvas
animate();
