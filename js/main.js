var canvas = document.getElementById("snake");
var context = canvas.getContext("2d");
var box = 32;
var snake = [];

snake[0]= {
    x: 8 * box,
    y: 8 * box
}

//Direção inicial da cobrinha
var direction = "right"; 

//Posição aleatória da comida
var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Background
function criarBG() {
    context.fillStyle = "#FFD39B";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Cobrinha
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Comidinha
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){
if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

//Fim de jogo, ao se chocar
for(i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert('Fim de jogo :(');
    }
}

criarBG();
criarCobrinha();
drawFood();

var snakeX = snake[0].x;
var snakeY = snake[0].y;

//Teclas de direção
if(direction == "right") snakeX += box;
if(direction == "left") snakeX -= box;
if(direction == "up") snakeY -= box;
if(direction == "down") snakeY += box;

//Come a cobrinha e cresce
if(snakeX != food.x || snakeY != food.y){
    snake.pop();
}
else{
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
}

var newHead = {
    x: snakeX,
    y: snakeY
}

snake.unshift(newHead);

}

var jogo = setInterval(iniciarJogo, 100);