var selectedOption = 'X'; 
var nonSelectedOption = 'O';
var noOfRows = document.getElementById('rows');
var arrayOfMartixCells = []; // array of td's that form matrix
var winFlag = 0 ; // flag for win
var counter = 0; //counter to keep track ofplayers turn
var timer = 60; 
var intervalId;
var matrixSize = parseInt(noOfRows.options[noOfRows.selectedIndex].text); //stores matrix size 
var myTable = document.querySelector('#matrix');
var playerName ;
var player1Win = 0;
var player2Win = 0;
drawMatrix(); // draws matrix
var profileInfo = 0;
var colourStorage;
var backgroundColour;
var squares = document.getElementById('heading');

// function expression
var randomRGB = function () {
  return Math.floor(Math.random() * (235));
}

var rave = function() {
  setInterval(function() {
    
    var fillColor = 'rgb(' + randomRGB() + ',' + randomRGB() + ',' + randomRGB() + ')'
    squares.style.fill = fillColor; 
    squares.style.backgroundColor = 'rgb(' + randomRGB() + ',' + randomRGB() + ',' + randomRGB() + ')';
  }, 800);
}
//rave();// change background color randomly for heading

if(winFlag !== 1){
	document.getElementById('result').style.display = 'none'; //hides modal
}
document.getElementById('closeSpan').addEventListener('click',function(){
	document.getElementById('result').style.display = 'none';
	reload();
});

if(profileInfo === 0) {
	document.getElementById('profile').style.display = "none";
}
//store background colour in local storage
if(localStorage.getItem('backgroundColourStorage') === "") {
	localStorage.setItem('backgroundColourStorage',"white");
	var color = localStorage.getItem('backgroundColourStorage');
	document.body.style.backgroundColor = color;
} //else set default background as white if no local storage
else if(localStorage.getItem('backgroundColourStorage') !== "") {
	var colour = localStorage.getItem('backgroundColourStorage');
	document.body.style.backgroundColor = colour;
}

//onclick function for Reset Score Button
//takes the value of bgcolour from local storage
document.getElementById('resetScore').addEventListener("click",function () {
	localStorage.setItem('backgroundColourStorage',"white");
	document.body.style.backgroundColor = localStorage.getItem('backgroundColourStorage');
	localStorage.setItem('player1WinStorage', 0);
	player1Win = localStorage.getItem(player1Win);
	localStorage.setItem('player2WinStorage', 0);
	player2Win = localStorage.getItem(player2Win);
	document.getElementById('p1Span').innerHTML = player1Win;
	document.getElementById('p2Span').innerHTML = player2Win;
	clearMatrix();
	drawMatrix();		
	document.getElementById('resultSpan').innerHTML = "";
	document.getElementById('time').innerHTML = "";
});
//once there is a win timer function will not be activated on click
if(winFlag !== 1) {
document.getElementById('click').addEventListener('click',function() {
document.getElementById('matrix').style.pointerEvents = 'auto';
document.getElementById('topBar').style.pointerEvents = 'auto';
	intervalId = setInterval(function() { timer--; 
		if(timer === 0) {
			alert("Time Out");
			reload();
		}
		document.getElementById('time').innerHTML = timer + "seconds to make your move";
	}, 1000);
});
}

// On click of profile button, matrix is hidden and profile form is displayed
document.getElementById("profileBtn").addEventListener("click",function(){
	profileInfo = 1;
	document.getElementById('matrix').style.display = "none";
	document.getElementById('profile').style.display = "inline-block"; //pops up the form and hide matrix
	// document.getElementById('profile').style.textAlign = "center";
	document.getElementById('profile').style.position = "absolute";
	document.getElementById('profile').style.width = "1000px";
	//document.getElementById('bottomBar').style.display = "none";
	clearMatrix();
	document.getElementById('submitBtn').addEventListener("click", function() {
		playerName = document.getElementById('name').value;
		localStorage.setItem('PlayerNameStorage', playerName); //sets playername in local storage
		profileInfo = 0;
		backgroundColour = document.getElementById('bgColor').value;		
		document.getElementById('matrix').style.display = "block";
		//document.getElementById('bottomBar').style.display = "block";
		document.getElementById('profile').style.display = "none";	
		//drawMatrix();
		localStorage.setItem('backgroundColourStorage', backgroundColour );
		document.body.style.backgroundColor = backgroundColour;
		playerName = localStorage.getItem('PlayerNameStorage');
		if(playerName === "" || playerName === undefined || playerName === null) {
		document.getElementById('profileInfo').innerHTML = "Hello! Guest";
	}
	else if(playerName !== "") {
		document.getElementById('profileInfo').innerHTML = "Hello! " + playerName;
	}
		//drawMatrix();
	});
	drawMatrix();
});

// loads the paig again
function reload() {
	location.reload();
}
function checkBtn(event) {
	selectedOption = event.target.id;
	console.log(selectedOption);
}


// =======================================================================//
//when matrix size is chosen by user, matrix before is cleared and redrawn//
// =======================================================================//
function chooseMatrixSize() {
winFlag = 0;
matrixSize = parseInt(noOfRows.options[noOfRows.selectedIndex].text);
clearMatrix();
drawMatrix();
//do 
}
// =======================================================================//
// Clears the matrix, set the array to empty and result span is set to null
// =======================================================================//
function clearMatrix() {
	newTable.remove();
	arrayOfMartixCells = [];
	document.getElementById('resultSpan').innerHTML = "";
}
// =======================================================================//
// Draws the matrix as per the user input for matrix size
// =======================================================================//
function drawMatrix() {
	playerName = localStorage.getItem('PlayerNameStorage');
	console.log("1 >> "+playerName);
	console.log(playerName);
	if(playerName === "" || playerName === undefined || playerName === null) {
		document.getElementById('profileInfo').innerHTML = "Hello! Guest";
		console.log("111");
	}
	else if(playerName !== "") {
		document.getElementById('profileInfo').innerHTML = "Hello! " + playerName;
		console.log("set1");
	}
	// creating table dynamically
	var myTable = document.querySelector('#matrix');
	console.log(myTable);
	var table = document.createElement('TABLE');
	// table.style.border = "1px solid white";

	var tableBody = document.createElement('TBODY');
	tableBody.id = "tbody";
	table.appendChild(tableBody);
	table.id = "newTable"; // giving id to table
	table.style.border = "2px solid black"; // styling table
	table.style.borderRadius = "20px";
	table.style.padding = "5px";
	for(var i=0; i<matrixSize; i++) {
		var tr = document.createElement('TR');
		tableBody.appendChild(tr);

		tr.style.border = "1px solid black";
		for(var j = 0; j<matrixSize; j++) {
			var td = document.createElement('TD');
			td.id = ""+i+j;
			var id = td.id;
			arrayOfMartixCells.push(td);
			td.style.border = "1px solid black";
			td.style.borderRadius = "20px";
			td.width = "100px";
			td.height = "100px";
			td.onmouseover = function(){this.style.backgroundColor = "tomato"};
			td.onmouseout = function() {if(this.innerHTML === "")
				{this.style.backgroundColor = localStorage.getItem('backgroundColourStorage');}
				else 
				{
				this.style.backgroundColor = "tomato";
				}
				};
			tr.appendChild(td);
			td.style.fontSize = "25px";
		}
	}
	myTable.appendChild(table);
	document.getElementById('playerTurn').innerHTML = ""; // keeping record of players win by local storage
	player1Win = localStorage.getItem('player1WinStorage');
	player2Win = localStorage.getItem('player2WinStorage');
	document.getElementById('p1Span').innerHTML = player1Win;
	document.getElementById('p2Span').innerHTML = player2Win;
}

var dropdown = document.getElementById('players');
var noOfPlayers = dropdown.options[dropdown.selectedIndex].value;

// this function accepts the user input of no of players and stores in a variable
function choosePlayers() {
	console.log('finnaly m called');
	winFlag = 0;
	counter = 0;
	var noOfPlayers = dropdown.options[dropdown.selectedIndex].value;
	// for(var i=0; i<arrayOfMartixCells.length; i++){
	// 	arrayOfMartixCells[i].innerHTML = "";
	// 	arrayOfMartixCells[i].style.backgroundColor = "white";
	// }
	document.getElementById('resultSpan').innerHTML = "";
	clearMatrix();
	console.log("drawn matrix")
	drawMatrix();
	move();	
}

// this functin is called for single player
var playerMove1 = function(event){
	if(selectedOption === "O"){
	nonSelectedOption = "X";
	}
	console.log(counter);
if((event.target.tagName === 'TD') && (event.target.innerHTML === "")) {
	console.log(event.target.innerHTML)
var usedCellId  = event.target ;
var p = document.createElement('P');
p.textContent = selectedOption;
usedCellId.appendChild(p);
usedCellId.style.backgroundColor = "tomato";
event.target.style.textAlign = "center";
var noOfPlayers = dropdown.options[dropdown.selectedIndex].value;
checkWinPlayer(); // checking win
// when there is win following if is executed
if(winFlag === 1) {
	clearInterval(intervalId); 
	document.getElementById('matrix').style.pointerEvents = 'none';
	document.getElementById('topBar').style.pointerEvents = 'none';
	document.getElementById('playerTurn').innerHTML = "";
	document.getElementById('time').innerHTML = "";
	document.getElementById('result').style.display = 'auto';
	player1Win = localStorage.getItem('player1WinStorage');
	document.getElementById('p1Span').innerHTML = player1Win;
	document.getElementById('result').style.backgroundColor = "tomato";
	// document.body.style.backgroundColor = "gray";
	document.getElementById
}
else {
	checkTie(); //checking tie
	if(winFlag === 1) {
	clearInterval(intervalId); 
	document.getElementById('matrix').style.pointerEvents = 'none';
	document.getElementById('topBar').style.pointerEvents = 'none';	
	document.getElementById('playerTurn').innerHTML = "";
	document.getElementById('time').innerHTML = "";
	player2Win = localStorage.getItem('player1WinStorage');
	$('p1Span').html(player1Win);
	document.getElementById('result').style.backgroundColor = "tomato";
	// document.body.style.backgroundColor = "gray";

}
	if(noOfPlayers === "1") {
		timer = 10; //reseting timer
		document.getElementById('playerTurn').innerHTML = "waiting... for computer";
		document.getElementById('matrix').style.pointerEvents = 'none';
		setTimeout(function() { compMove(); }, 1000); // calling computer to play
		console.log("");
		
	}
	else
	{
		counter ++;
		timer = 10;
		document.getElementById('playerTurn').innerHTML = "waiting... for Player 2";
	}
}

console.log(event);
} 
timer = 10;
}
// Following function is called on every click
// based of variable value of noOfPlayes, function is called and game is played
function move() {
	noOfPlayers = dropdown.options[dropdown.selectedIndex].value;

	// 1 player game
	if(noOfPlayers === "1") {
		playerMove1(event);

	}
	else if(noOfPlayers === "2") {
		console.log(counter);
		if(counter === 0) {
		playerMove1(event);}
		else if(counter === 1) {
		playerMove2(event);
		if(winFlag !== 1) {		
		document.getElementById("resultSpan").innerHTML = "";}
	}
	}
}
//=====================================================//
// Function checks the player win and displays message 
// returns winFlag as 1 if there is win
//=====================================================//
function checkWinPlayer() {
	if(matrixSize === 3) {
	for(var i=0; i<arrayOfMartixCells.length; i++) {
		if(arrayOfMartixCells[i].textContent !== "") {
			
				if((arrayOfMartixCells[1].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) || (arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption) ||(arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption) || (arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) || (arrayOfMartixCells[1].textContent === selectedOption && arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption) || (arrayOfMartixCells[2].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption) || ( arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) || ( arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption) 
					){
					
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					localStorage.setItem('player1WinStorage',player1Win);
					winFlag = 1 ;
					document.getElementById('result').style.display = 'block';
					return true;
				}
		}
	}
	}

	if(matrixSize === 4){
		for(var i=0; i<arrayOfMartixCells.length; i++) {
			if(arrayOfMartixCells[i].textContent !== "") {
				if( arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption && arrayOfMartixCells[1].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === selectedOption && arrayOfMartixCells[8].textContent === selectedOption && arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[15].textContent === selectedOption && arrayOfMartixCells[10].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[0].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[13].textContent === selectedOption && arrayOfMartixCells[9].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[1].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[14].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[10].textContent === selectedOption && arrayOfMartixCells[2].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption && arrayOfMartixCells[11].textContent === selectedOption && arrayOfMartixCells[15].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === selectedOption && arrayOfMartixCells[5].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[7].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[8].textContent === selectedOption && arrayOfMartixCells[9].textContent === selectedOption && arrayOfMartixCells[10].textContent === selectedOption && arrayOfMartixCells[11].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === selectedOption && arrayOfMartixCells[13].textContent === selectedOption && arrayOfMartixCells[14].textContent === selectedOption && arrayOfMartixCells[15].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === selectedOption && arrayOfMartixCells[6].textContent === selectedOption && arrayOfMartixCells[9].textContent === selectedOption && arrayOfMartixCells[12].textContent === selectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 1 Wins";
					player1Win ++;
					winFlag = 1 ;
					return true;
				}

			}
		}
	}
}

// Function checks the win for player 2
// Returns winFlas as 1 and displays proper win message
function checkWinComp() {
	if(matrixSize === 3) {
	for(var i=0; i<arrayOfMartixCells.length; i++) {
		if(arrayOfMartixCells[i].textContent !== "") {
				if( (arrayOfMartixCells[1].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption)||(arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption)|| (arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption)||(arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption)||(arrayOfMartixCells[1].textContent === nonSelectedOption && arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption)
					){
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					document.getElementById('result').style.display = 'block';
					return true;
				}
				
				else if(arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption){
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					document.getElementById('result').style.display = 'block';
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					document.getElementById('result').style.display = 'block';
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption) {
					
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					player2Win ++;
					localStorage.setItem('player2WinStorage',player2Win);
					winFlag = 1 ;
					document.getElementById('result').style.display = 'block';
					return true;
				}
			//finish row

		}
	}
	}
	if(matrixSize === 4){
		for(var i=0; i<arrayOfMartixCells.length; i++) {
			if(arrayOfMartixCells[i].textContent !== "") {
				if( arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption && arrayOfMartixCells[1].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === nonSelectedOption && arrayOfMartixCells[8].textContent === nonSelectedOption && arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[15].textContent === nonSelectedOption && arrayOfMartixCells[10].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[0].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[13].textContent === nonSelectedOption && arrayOfMartixCells[9].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[1].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[14].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[10].textContent === nonSelectedOption && arrayOfMartixCells[2].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption && arrayOfMartixCells[11].textContent === nonSelectedOption && arrayOfMartixCells[15].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[4].textContent === nonSelectedOption && arrayOfMartixCells[5].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[7].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[8].textContent === nonSelectedOption && arrayOfMartixCells[9].textContent === nonSelectedOption && arrayOfMartixCells[10].textContent === nonSelectedOption && arrayOfMartixCells[11].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[12].textContent === nonSelectedOption && arrayOfMartixCells[13].textContent === nonSelectedOption && arrayOfMartixCells[14].textContent === nonSelectedOption && arrayOfMartixCells[15].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}
				else if( arrayOfMartixCells[3].textContent === nonSelectedOption && arrayOfMartixCells[6].textContent === nonSelectedOption && arrayOfMartixCells[9].textContent === nonSelectedOption && arrayOfMartixCells[12].textContent === nonSelectedOption) {
					document.getElementById('resultSpan').innerHTML = "Player 2 Wins";
					winFlag = 1 ;
					return true;
				}

			}
		}
	}
}

// Function for multi player game
function playerMove2(event) {
	if(selectedOption === "O"){
	nonSelectedOption = "X";
	}
	//condition for disabling click on rest of screen except matrix
	if((event.target.tagName === 'TD') && (event.target.innerHTML === "")) {
		var usedCellId  = event.target ;
		var p = document.createElement('P');
		p.textContent = nonSelectedOption;
		usedCellId.appendChild(p);
		usedCellId.style.backgroundColor = "tomato";
		event.target.style.textAlign = "center";
		counter --;
		checkWinComp(); //checking win for player
		checkTie(); // checking tie
		if(winFlag === 1) { 
			document.getElementById('matrix').style.pointerEvents = 'none';
			document.getElementById('topBar').style.pointerEvents = 'none';
			document.getElementById('playerTurn').innerHTML = "";
			clearInterval(intervalId);
			document.getElementById('time').innerHTML = "";
			player2Win = localStorage.getItem('player2WinStorage');
			document.getElementById('p2Span').innerHTML = player2Win;
			document.getElementById('result').style.backgroundColor = "tomato";			
			//document.body.style.backgroundColor = "gray";
		}
		else {
			document.getElementById('playerTurn').innerHTML = "waiting... for Player 1";
		}
		console.log("out "+ document.getElementById('resultSpan').innerHTML);
	}
	timer = 10;
}

// Function for randomly choosing matrix cell and putting X or O in the cell
function compMove() {
if(selectedOption === "O"){
	nonSelectedOption = "X";
}
	for(var i=0; i<arrayOfMartixCells.length; i++) {


		var chooseCell;
		chooseCell = Math.floor(Math.random() * arrayOfMartixCells.length);
		///////////////////////////////////////////////////////////////////////



		////////////////////////////////////////////////////////////////////////
		if((arrayOfMartixCells[chooseCell].style.backgroundColor !== "tomato") && (arrayOfMartixCells[chooseCell].innerHTML === ""))
		{
			var p = document.createElement('P');
			p.textContent = nonSelectedOption;
			console.log(chooseCell);
			arrayOfMartixCells[chooseCell].appendChild(p);
			arrayOfMartixCells[chooseCell].style.backgroundColor = "tomato";
			arrayOfMartixCells[chooseCell].style.textAlign = "center";
			checkWinComp(); //checking win
			checkTie(); // checking tie
			if(winFlag === 1) {
				document.getElementById('matrix').style.pointerEvents = 'none';
				document.getElementById('topBar').style.pointerEvents = 'none';
				document.getElementById('playerTurn').innerHTML = "";
				document.getElementById('time').innerHTML = "";
				player2Win = localStorage.getItem('player2WinStorage');
				document.getElementById('p2Span').innerHTML = player2Win;
				clearInterval(intervalId);
				document.getElementById('result').style.backgroundColor = "tomato";
				// document.body.style.backgroundColor = "gray";


			}
			else {
				document.getElementById('playerTurn').innerHTML = "waiting... for Player 1";
			}
			break;
		}
	}
	if(winFlag !== 1) {
	document.getElementById('matrix').style.pointerEvents = 'auto';
	document.getElementById('topBar').style.pointerEvents = 'auto';	
	}
	counter --;
	timer = 10;
}
if(counter === 1){
		document.getElementById("resultSpan").innerHTML = "waiting... for player 2 move"
		console.log(resultSpan.innerHTML);
	}

// on click function move is called which than call other functions based on no of players playing	
document.getElementById("matrix").addEventListener("click",move);

// Function checks for tie
function checkTie() {
	for(var i=0; i<arrayOfMartixCells.length; i++) {
		if(arrayOfMartixCells[i].textContent === "") {
			return;
		}
	}
		document.getElementById('resultSpan').innerHTML = "Tie";
		document.getElementById('result').style.display = 'block';
		winFlag = 1;
		return true;	
}
