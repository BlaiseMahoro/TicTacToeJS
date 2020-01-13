//loads the standard input library
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })


function initBoard(board){
  //resets the board
    for(var i =0; i<9; i++){
        board[i]=' ';
    }

}



function gameOver(board){
    //check if board is full or there is winner
    return isFull(board)||isWinner(board,'X')||isWinner(board,'O');
}
function isFull(board){
  //checks if board is full
  for(i=0;i<9;i++){
    if(board[i]===' '){
      return false;
    }
   
  }
  return true;

}
function isWinner(board, mark){
  //checks if the mark(X,O) passed is the winner
  for(i=0; i<9;i++){
    return board[0]+board[1]+board[2]===mark.repeat(3) ||board[0]+board[3]+board[6]===mark.repeat(3) ||board[0]+board[4]+board[8]===mark.repeat(3) ||
    board[3]+board[4]+board[5]===mark.repeat(3) ||board[6]+board[7]+board[8]===mark.repeat(3) ||board[1]+board[4]+board[7]===mark.repeat(3) ||
    board[2]+board[5]+board[8]===mark.repeat(3) ||board[2]+board[4]+board[6]===mark.repeat(3) ;
  }
}
function computerPlay(board, mark){
  //looks for an empty spot and plays in that spot
   for(i=0;i<9;i++){
     if(board[i]===' '){
       board[i]=mark;
       break;
     }
   }
}

function dispBoard(board){
  //displays the current board 
  console.log(board[0]+'|'+board[1]+'|'+board[2]+'\n'+
  '_____'+'\n'+
  board[3]+'|'+board[4]+'|'+board[5]+'\n'+
  '_____'+'\n'+
  board[6]+'|'+board[7]+'|'+board[8]+'\n');
}



const game= async()=>{
  //this is where the game is played.Takes care of the inputs and outputs.
  
   var board = [9];//declares an array that will represent the board
  
   var play_again = 'Y';//initially play_again is set to Y to allow playing
  
   while(play_again==='Y'){
   initBoard(board);//resets board
   
   var player1, player2;
   var turn = 'X';//by deault player1 is X and player2 is O
   
   var mode = await new Promise((resolve, reject) => {
      rl.question('Choose mode Computer(C) and Human(H) : ', (input) => {
     resolve(input.trim())})
  });
  //validates user input
  while(mode.toUpperCase()!=='C' &&mode.toUpperCase()!=='H' ){
    console.log('Try again! Enter C or H.')
    var mode = await new Promise((resolve, reject) => {
      rl.question('Choose mode Computer(C) and Human(H) : ', (input) => {
     resolve(input.trim())})
    });
  }
  if(mode.toUpperCase() =='H'){
    //prompts for player1's name
    player1 = await new Promise((resolve, reject) => {
    rl.question(`Enter Player X's name (optional): `, (input) => {
    resolve(input.trim())})
    });
    //prompts for player2's name
    player2 = await new Promise((resolve, reject) => {
      rl.question(`Enter Player O's name (optional): `, (input) => {
      resolve(input.trim())})
      });
    
  
  }
  else{
    //By default computerAI is X in computer mode
    player1 = 'ComputerAI'
    console.log('Player X is ', player1)
    player2 = await new Promise((resolve, reject) => {
      rl.question(`Enter Player O's name (optional): `, (input) => {
      resolve(input.trim())})
      });
    
    
  }
   
  while(!gameOver(board)){
    //this loops allows checking if there is a winner or board is full.
    if (turn==='X'){
      //player X play
  
      if(mode.toUpperCase()==='C'){
        computerPlay(board, 'X');
        console.log('ComputerAI played!')
      }
      else{
        var pos = await new Promise((resolve, reject) => {
          rl.question(player1?player1+', enter a position (0-8) : ':'Player1, enter a position(0-8): ', (input) => {
         resolve(input)})
        
      });
      while(board[pos]!==' '||parseInt(pos) <0 ||parseInt(pos) >8){
        console.log('Spot is already taken or invalid position entered!')
        var pos = await new Promise((resolve, reject) => {
          rl.question(player1?player1+', enter a position (0-8) : ':'Player1, enter a position(0-8): ', (input) => {
         resolve(input)})
        
      });
      
      }
      board[pos] = 'X';
      
      }
      //change turn 
      turn = 'O';
    }
    else{
      //playerO plays 
      var pos = await new Promise((resolve, reject) => {
        rl.question(player2?player2+', enter a position (0-8) : ':'Player2, enter a position(0-8): ', (input) => {
       resolve(input)})
      
    });
    //validates user input  
    while(board[pos]!==' '||parseInt(pos) <0 ||parseInt(pos) >8){
      console.log('Spot is already taken or invalid position entered!')
      var pos = await new Promise((resolve, reject) => {
        rl.question(player2?player2+', enter a position (0-8) : ':'Player2, enter a position(0-8): ', (input) => {
       resolve(input)})
      
    });
   
    }
    board[pos] = 'O';
    
    
      turn ='X';
    }
    dispBoard(board)
  
  }
  
  console.log('Game over!')
  
  //determines and displays winner.
  if(isWinner(board, 'X')){
    console.log(player1?player1:'Player1'," wins!")
  }
  else if(isWinner(board,'O')){
    console.log(player2?player2:'Player2', " wins!")
  }
  else
    console.log(`It's a draw!`)
  
  //asks the user whether they want to continue palying
  play_again = await new Promise((resolve,reject)=>{
    rl.question('Do you want to play another game? (N)o or (Y)es: ', (input)=>{
      resolve(input)
    })
  })
  //looking for the first character
  play_again=play_again.trim()[0].toUpperCase()
  //validates input
  while( play_again != 'N'&& play_again!='Y'){
    console.log('Invalid answer. \n')
    play_again = await new Promise((resolve,reject)=>{
      rl.question('Do you want to play another game? (N)o or (Y)es: ', (input)=>{
        resolve(input)
      })
    })
    play_again=play_again.trim()[0].toUpperCase()
  }
  }
  rl.close();
  console.log('Good bye!')
  }
game();