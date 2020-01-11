
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

function initBoard(board){
    for(var i =0; i<9; i++){
        board[i]=' ';
    }

}
const game= async()=>{
 var board = [9];
 
 initBoard(board);
 //dispBoard(board);
 var players = ['X', 'O'];
 var playerNames= new Array(2);
 var player1, player2;
 var turn = 'X';
 
 var mode = await new Promise((resolve, reject) => {
    rl.question('Choose mode Computer(C) and Human(H) : ', (mode) => {
   resolve(mode.trim())})
});
while(mode.toUpperCase()!=='C' &&mode.toUpperCase()!=='H' ){
  console.log('Try again! Enter C or H.')
  var mode = await new Promise((resolve, reject) => {
    rl.question('Choose mode Computer(C) and Human(H) : ', (mode) => {
   resolve(mode.trim())})
});
}
if(mode.toUpperCase() =='H'){
  player1 = await new Promise((resolve, reject) => {
  rl.question(`Enter Player X name (optional): `, (input) => {
  resolve(input.trim())})
  });

  player2 = await new Promise((resolve, reject) => {
    rl.question(`Enter Player O name (optional): `, (input) => {
    resolve(input.trim())})
    });
  

}
else{
  player1 = 'ComputerAI'
  console.log('Player X is ', player1)
  player2 = await new Promise((resolve, reject) => {
    rl.question(`Enter Player O name (optional): `, (input) => {
    resolve(input.trim())})
    });
  
  
}
 

while(!gameOver(board)){
  if (turn==='X'){
    //X play

    if(mode.toUpperCase()==='C'){
      computerPlay(board, 'X');
      console.log('ComputerAI played!')
    }
    else{
      var pos = await new Promise((resolve, reject) => {
        rl.question(player1?player1+', enter a position (0-9) : ':'Player1, enter a position(0-9): ', (input) => {
       resolve(input)})
      
    });
    while(board[pos]!==' '||parseInt(pos) <0 ||parseInt(pos) >8){
      console.log('Spot is already taken or invalid position entered!')
      var pos = await new Promise((resolve, reject) => {
        rl.question(player1?player1+', enter a position (0-9) : ':'Player1, enter a position(0-9): ', (input) => {
       resolve(input)})
      
    });
    
    }
    board[pos] = 'X';
    
    }
    //dispBoard(board)
    turn = 'O';
  }
  else{
    
    var pos = await new Promise((resolve, reject) => {
      rl.question(player2?player2+', enter a position (0-9) : ':'Player2, enter a position(0-9): ', (input) => {
     resolve(input)})
    
  });
  while(board[pos]!==' '||parseInt(pos) <0 ||parseInt(pos) >8){
    console.log('Spot is already taken or invalid position entered!')
    var pos = await new Promise((resolve, reject) => {
      rl.question(player2?player2+', enter a position (0-9) : ':'Player2, enter a position(0-9): ', (input) => {
     resolve(input)})
    
  });
 
  }
  board[pos] = 'O';
  
  
    turn ='X';
  }
  dispBoard(board)

}

rl.close();
console.log('Game over!')
if(isWinner(board, 'X')){
  console.log(player1?player1:'Player1'," wins!")
}
else if(isWinner(board,'O')){
  console.log(player2?player2:'Player2', " wins!")
}
else
  console.log(`It's a draw!`)
// console.log(board[2], board[5],board[8])
// console.log(board[2]+board[5]+board[8]==='O'.repeat(3))

//  while(!gameOver(board)){

 
//  }
}
function computerVHumanMode(playerName, board){
    turn = 'X';
    while(!gameOver(board)){
    if(turn=='X')
        computerPlay(board, 'X')
  else{
    //   var pos = await new Promise((resolve, reject) => {
    //     rl.question(player+', enter a position (0-9) : ', (input) => {
    //    resolve(input)})
      
    // });
    while(board[pos]===' '||Number.isInteger(parseInt(pos))||parseInt(pos) <0 ||parseInt(pos) >8){ 
      console.log('Spot is already taken or invalid position is entered!')
    //   var pos = await new Promise((resolve, reject) => {
    //     rl.question(playerName?playerName+', enter a position (0-9) : ':'Player2, enter a position(0-9): ', (input) => {
    //    resolve(input)})
      
    // });
    }
  }
    turn = 'O'
}
}
function humanVHuman(play1,play2, board){
  
}

function gameOver(board){
    //check if game is over or there is winner
    return isFull(board)||isWinner(board,'X')||isWinner(board,'O');
}
function isFull(board){
  for(i=0;i<9;i++){
    if(board[i]===' '){
      return false;
    }
   
  }
  return true;

}
function isWinner(board, mark){
  for(i=0; i<9;i++){
    return board[0]+board[1]+board[2]===mark.repeat(3) ||board[0]+board[3]+board[6]===mark.repeat(3) ||board[0]+board[4]+board[8]===mark.repeat(3) ||
    board[3]+board[4]+board[5]===mark.repeat(3) ||board[6]+board[7]+board[8]===mark.repeat(3) ||board[1]+board[4]+board[7]===mark.repeat(3) ||
    board[2]+board[5]+board[8]===mark.repeat(3) ||board[2]+board[4]+board[6]===mark.repeat(3) ;
  }
}
// function markBoard(board, pos, mark){
//    if (board[pos] !== " "){
//       throw Error('spot already taken!')
//    }
//    board[pos] = mark
// }
function computerPlay(board, mark){
   for(i=0;i<9;i++){
     if(board[i]===' '){
       board[i]=mark;
       break;
     }
   }
}

function dispBoard(board){
    console.log(board[0]+'|'+board[1]+'|'+board[2]+'\n'+
    '_____'+'\n'+
    board[3]+'|'+board[4]+'|'+board[5]+'\n'+
    '_____'+'\n'+
    board[6]+'|'+board[7]+'|'+board[8]+'\n');
}
game();