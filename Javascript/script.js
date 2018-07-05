var reset = document.querySelector(".btn");

var squares = document.querySelectorAll("td");

reset.addEventListener('click', function() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].textContent = '';
  }
  document.querySelector('h1').textContent = "Welcome to TicTacToe";
  document.querySelector('table').style.pointerEvents = 'auto';
});

function signCheck(one, two, three){
  return (one === two && one === three && one !== undefined && one !== '');
}

function returnSign(row, col) {
  if (document.querySelector('table').rows[row].cells[col].textContent === undefined) {
    return '';
  }
  else {
    return document.querySelector('table').rows[row].cells[col].textContent;
  }

}

function horizontalCheck() {
  for (var row = 0; row < 3; row++) {
    if (signCheck(returnSign(row,0), returnSign(row, 1), returnSign(row, 2))) {
      return true;
    }
    else {
      continue;
    }
  }
}

function verticalCheck() {
  for (var col = 0; col < 3; col++) {
    if (signCheck(returnSign(0,col), returnSign(1, col), returnSign(2, col))) {
      return true;
    }
    else {
      continue;
    }
  }
}

function diagonalCheck() {
  if (signCheck(returnSign(0, 0), returnSign(1, 1), returnSign(2, 2))) {
    return true;
  }
  else if (signCheck(returnSign(0, 2), returnSign(1, 1), returnSign(2, 0))) {
    return true;
  }
  else {
    return false;
  }
}

var currentPlayer = 1;
var currentSign = 'X';

function changeSign() {
  if (currentPlayer === 1 && this.textContent === '') {
    this.textContent = currentSign;
  }
  else if (currentPlayer === -1 && this.textContent === '') {
    this.textContent = currentSign;
  }
  if (horizontalCheck() || verticalCheck() || diagonalCheck()) {
    document.querySelector('h1').textContent = currentSign+" Won!!";
    document.querySelector('table').style.pointerEvents = 'none';
    return;
  }
  playerChange();
}

function playerChange() {
  currentPlayer = currentPlayer * -1;

  if (currentPlayer === 1) {
    currentSign = 'X';
  }
  else {
    currentSign = 'O';
  }
}
for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', changeSign);
}
