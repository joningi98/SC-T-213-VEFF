"use strict";

function getid(elementId) {
    return document.getElementById(elementId);
}

function DefaultBoards() {
    this.easy = [["5", "6", "4", ".", ".", "3", "2", ".", "1"],
        ["8", "7", "2", ".", "1", ".", "3", "9", "."],
        ["3", "9", "1", ".", ".", ".", ".", ".", "5"],
        ["4", "2", "9", "6", "5", "7", "3", "1", "8"],
        [".", ".", "8", "2", "3", "1", "9", "4", "7"],
        ["7", "1", "3", "8", "4", "9", "5", "2", "6"],
        [".", ".", "6", ".", "3", "5", "8", "4", "2"],
        ["4", "2", "3", "7", "8", "9", "1", ".", "."],
        [".", "5", "8", "2", "6", "4", "9", "3", "7"]
    ];
    this.medium = [["8", "7", ".", ".", "4", ".", "6", "2", "5"],
        ["4", "5", ".", ".", "2", ".", ".", "1", "."],
        ["2", "1", ".", "8", "5", ".", ".", "9", "."],
        ["7", "6", ".", "5", ".", "4", ".", "8", "."],
        ["9", "3", "1", "8", "6", "2", "5", ".", "7"],
        ["5", "4", "8", "3", ".", "1", "9", "6", "2"],
        ["2", ".", "7", "9", "5", "8", "4", ".", "6"],
        [".", "9", "4", "6", "7", "3", "2", ".", "5"],
        [".", ".", "5", "1", ".", "4", ".", ".", "."]
    ];
    this.hard = [["4", ".", ".", "9", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", "4", ".", ".", ".", "."],
        ["5", "3", "9", "6", ".", "1", "7", ".", "4"],
        [".", "9", "6", ".", "4", "7", ".", ".", "."],
        [".", "7", "8", "5", ".", "2", "1", "9", "6"],
        ["2", "5", "3", "9", "1", "6", "8", "4", "7"],
        [".", ".", "1", ".", "8", "4", "2", ".", "."],
        [".", "8", ".", ".", ".", ".", ".", "5", "4"],
        ["4", ".", "2", "3", ".", "5", "1", "7", "8"]
    ];
}

function printBoard(data) {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let number = data[x][y];
            let elem = getid('cell' + x + y);
            if (number === ".") {
                elem.value = '';
                elem.disabled = false;
            } else {
                elem.value = number;
                elem.disabled = true;
            }
        }
    }
}

function difficulty() {
    let diff = getid('diff');
    diff.innerHTML = '<select id="difficultySelector">' +
        '<option value="easy" selected>Easy</option>' +
        '<option value="medium">Medium</option>' +
        '<option value="hard">Hard</option>' +
        '</select>';
}

function doAjax() {
    //Prepare the parameter value for 'myParam'
    let paramValue = getid('difficultySelector').value;
    let id = getid('sudokuId');
    //The URL to which we will send the request
    let url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudokus';
    let data = "";
    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, {difficulty: paramValue})
        .then(function (response) {
            id.innerHTML = response.data.board._id;
            //When successful, print 'Success: ' and the received data
            data = response.data.board.boxes;
            console.log(data)
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
            id.innerHTML = '-1';
            let defaults = new DefaultBoards();
            if (paramValue === 'easy') {
                data = defaults.easy;
            } else if (paramValue === 'medium') {
                data = defaults.medium;
            } else {
                data = defaults.hard;
            }
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
            printBoard(data)
        });
}

function checkEmpty() {
    let arr = true;
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let elem = getid('cell' + x + y);
            elem.style.backgroundColor = defaultStatus;
            if (elem.value === "") {
                elem.style.backgroundColor = "Yellow";
                arr = false;
            }
        }
    }
    setTimeout(clearBoard, 5000);
    return arr;
}

function clearBoard() {
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let elem = getid('cell' + x + y);
            elem.style.backgroundColor = defaultStatus;
        }
    }
    getid('resultMsg').style.display = "none";
}

function validate() {
    if (checkEmpty()) {
        console.log(isValidSolution());
    }
}

function isValidSolution() {
    return checkBox();
}

function checkBox() {
    let all_folts = Array();
    let correct_set = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let x = 0; x <= 8; x++) {
        let my_set = [];
        for (let y = 0; y <= 8; y++) {
            let value_to_check = getid('cell' + x + y).value;
            if (value_to_check !== "") {
                my_set.push(value_to_check);
            }
        }
        let new_set = my_set.sort();
        console.log(new_set);
        console.log(correct_set);
        for (let j = 0; j <= 8; j++) {
            // console.log(correct_set[j], new_set[j]);
            if (correct_set[j] != new_set[j]) {
                for (var h = 0; h <= 8; h++) {
                    if (new_set[j] == my_set[h]) {
                        console.log(x + " " + h);
                        all_folts.push(x, h);
                        //getid('cell' + x + h).style.backgroundColor = "Red";
                        break;
                    }
                }
            }
        }
    }
    console.log(all_folts);
    if (all_folts.length === 0) {
        getid('resultMsg').style.display = "block";
    }
}

window.addEventListener("load", difficulty, false);