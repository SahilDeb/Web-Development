var playerOne = prompt('Enter player one name, you will be Blue')
var p1color = 'rgb(86, 151, 255)';

var playerTwo = prompt('Enter player two name, You will be Red')
var p2color = 'rgb(237, 45, 73)';

//Default Names
if (playerOne == undefined || playerOne == '') {
  playerOne = 'A'
}

if (playerTwo == undefined || playerTwo == '') {
  playerTwo = 'B'
}

var table = $('table tr');

function reportWin(rowNum, colNum) {
  console.log("You win starting at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('input').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('input').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; row--) {
    var colorReport = returnColor(row, colIndex);
    // search for cell with gray color
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

// Check to see if 4 inputs are the same color
function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))) {
          reportWin(row, col);
          return true;
      }
      else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))) {
          reportWin(row, col);
          return true;
      }
      else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  //negetive slope
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))) {
          reportWin(row, col);
          return true;
      }
      //positive slope
      else if (colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))) {
        reportWin(row, col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

//Game End
function gameEnd(winningPlayer) {
  $('h2').text(winningPlayer+" You Won!! Refresh your browser to play again")
  $('h3').fadeOut(100);
  $('h1').text("CONGRATRULATIONS!!");
  $('.board input').attr('disabled', true);
}

//Game Logic Starts
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = p1color;

//Start with player 1
$('h3').text(playerOne+" it's your turn, pick a column to drop chip");

$('.board input').on('click', function () {

  // Recognize what column was chosen
  var col = $(this).closest('td').index();

  // Get back bottom available row to change
  var bottomAvail = checkBottom(col);

  // Drop the chip in that column at the bottomAvail Row
  changeColor(bottomAvail, col, currentColor);

  // Check for a win
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
  }

  // If no win or tie, continue to next player
  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentName = playerOne;
    currentColor = p1color;
    $('h3').text(currentName+" it's your turn.");
  }
  else {
    currentName = playerTwo;
    currentColor = p2color;
    $('h3').text(currentName+" it's your turn.");
  }
})
