//start declaring variables

//selecting specified selectors and assigning each to a variable

let grid = document.querySelector(".grid-container");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let Top = document.querySelector(".top");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let bottom = document.querySelector(".bottom");

let width = 10;                 // width of the grid board
let currentIndex = 0;
let appleIndex = 0;           // intial location of the apple on the grid board
let currentSnake = [2,1,0]      // intial location of the snake on the frid board
let direction = 1;               // snake movement control in four direction
let score = 0;                   // eating apple score increase
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

// end of declaring variables

//Major control action

document.addEventListener("DOMContentLoaded",function(){       // loads after the html content fires on the page
   document.addEventListener("keyup", control)                  // listen to direction keypress action 
   createBoard();                                            // invoke the function to create a board
   startGame();                                             // invoke the function to start the game
   playAgain.addEventListener("click", replay);               // listen to popup click to restart the game
});

//End of major control action

//Create Board function
function createBoard(){
   popup.style.display = "none";       //hide popup
   for (let i= 0; i < 100; i++){
      let box = document.createElement("div")
      grid.appendChild(box);
   }
}
//End of creating board function 

//StartGame function
function  startGame(){
   let squares = document.querySelectorAll(".grid-container div");
   randomApple(squares) // display applex box in each squares. which is the grid div box
   direction = 1; // starting the game the snake direction should be right
   scoreDisplay.innerHTML = score;
   intervalTime = 1000;
   currentSnake = [2,1,0];
   currentIndex = 0;
   currentSnake.forEach(index => squares[index].classList.add(".snake"));
   interval = setInterval(moveOutcome,intervalTime)
}
//End of startGame function

//Snake movement outcome function
function  moveOutcome(){ 
   let squares = document.querySelectorAll(".grid-container div");
   if (checkForHit(squares)) {
      alert("You hit an edge,Game over!");
      popup.style.display ="flex";
      return clearInterval(interval);
   } else {
      moveSnake(squares);
   }
}
//End snake movement outcome function

//Snake movement function
function moveSnake(squares){
   let tail = currentSnake.pop();
   squares[tail].classList.remove("snake");
   currentSnake.unshift(currentSnake[0]+direction)
   eatApple(squares,tail) ;
   squares[currentSnake[0]].classList.add("snake");
}

//End snake movement function

// check for block edges function
function checkForHit(squares){
   if (
      (currentSnake[0] + width >= (width*width) && direction === width) ||
      (currentSnake[0] % width === width -1 && direction ===1) ||   
      (currentSnake[0] % width === 0 && direction === -1) ||   
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")) 
   {
      return true
   }else{
      return false
   }
}
// End check for block edges function

// check for block edges function
function eatApple(squares,tail){ 
   if( squares[currentSnake[0]].classList.contains("apple")) 
      { 
         squares[currentSnake[0]].classList.remove("apple") 
         squares[tail].classList.add("snake") 
         currentSnake.push(tail)
         randomApple(squares) 
         score++ 
         scoreDisplay.textContent = score; 
         clearInterval(interval) ;
         intervalTime = intervalTime * speed ;
         interval = setInterval(moveOutcome,intervalTime) 
      }
}

function randomApple(squares){ 
   do{ 
   appleIndex =Math.floor(Math.random() * squares.length) 
   console.log(appleIndex)
   }while(squares[appleIndex].classList.contains("snake")) 
   squares[appleIndex].classList.add("apple") 
}
// End for block edges function

//control function for direction
//Control for keyboard users
function control(e){
   if(e.keycode === 39){
      direction = 1; //right
   }else if(e.keycode === 38){
      direction = -width; // when arrow up 10 divs ups
   }else if(e.keycode === 37){
      direction = -1; // left
   }else if(e.keycode === 40){
      direction = +width; // when arrow down 10 divs down
   }
}

// from mobile device users
Top.addEventListener("click",()=>direction= -width);
bottom.addEventListener("click",()=>direction= +width);
left.addEventListener("click",()=>direction= -1);
right.addEventListener("click",()=>direction= 1);
// End of control function direction

// random apple position


// end of random apple position


// restart game function 
function replay() {
   grid.innerHTML ="";
   createBoard();
   startGame();
   popup.style.display = "none";
}
// End of restart game function