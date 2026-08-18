var numSelected = null;
var tileSelected = null;
var errors = 0;

var board = [
    "-13----7-",
    "9-----5--",
    "-75-13-8-",
    "--4-5----",
    "---3-8---",
    "----6-7--",
    "-5-97-14-",
    "--2-----3",
    "-4----65-"
];

var solution = [
    "813695274",
    "926784531",
    "475213986",
    "284157369",
    "697328415",
    "531469728",
    "358976142",
    "762541893",
    "149832657"
];

window.onload = function () {
    setTheGame();
};


function setTheGame() {

    // Create numbers 1-9
    for (let i = 1; i <= 9; i++) {

        let number = document.createElement("div");

        number.id = i;
        number.innerText = i;

        number.classList.add("number");

        number.addEventListener("click", selectNumber);

        document.getElementById("digits").appendChild(number);
    }


    // Create 9 x 9 Sudoku board
    for (let r = 0; r < 9; r++) {

        for (let c = 0; c < 9; c++) {

            let tile = document.createElement("div");

            tile.id = r.toString() + "-" + c.toString();

            // Add pre-filled numbers
            if (board[r][c] != "-") {

                tile.innerText = board[r][c];

                tile.classList.add("tile-start");
            }


            // Add thick borders
            if (r == 0) {
                tile.classList.add("horizontal-start");
            }

            if (c == 0) {
                tile.classList.add("vertical-start");
            }

            if (r == 2 || r == 5 || r == 8) {
                tile.classList.add("horizontal-line");
            }

            if (c == 2 || c == 5 || c == 8) {
                tile.classList.add("vertical-line");
            }


            tile.classList.add("tile");

            tile.addEventListener("click", selectTile);

            document.getElementById("board").appendChild(tile);
        }
    }
}


// Select a number
function selectNumber() {

    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }

    numSelected = this;

    numSelected.classList.add("number-selected");
}


// Select a Sudoku tile
function selectTile() {

    // If no number is selected
    if (numSelected == null) {
        return;
    }

    // Don't change pre-filled numbers
    if (this.innerText != "") {
        return;
    }


    let coords = this.id.split("-");

    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);


    // Check answer
    if (solution[r][c] == numSelected.id) {

        this.innerText = numSelected.id;

        checkWin();

    } else {

        errors++;

        document.getElementById("errors").innerText =
            "Errors: " + errors;
    }
}


// Check if Sudoku is completed
function checkWin() {

    let tiles = document.getElementsByClassName("tile");

    let completed = true;

    for (let tile of tiles) {

        if (tile.innerText == "") {
            completed = false;
            break;
        }
    }

    if (completed) {

        setTimeout(function () {
            alert("Congratulations! You solved the Sudoku!");
        }, 100);
    }
}