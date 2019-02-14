function checkAndGetURL() {
    var inputField = document.getElementById("fname");
    var filename = inputField.value;
    if (checkURL(filename) === true) {
        loadFileAsync(filename, function(response) {
            var display = document.getElementById("displayDiv");
            if (response === null) {
                display.textContent = "File could not be found!";
            } else {
                display.textContent = response;
            }
        });
    } else {
        markAndResetInput(inputField);
    }
}

function calculateC() {
    var a = Number(document.getElementById("varA").value);
    var b = Number(document.getElementById("varB").value);

    var c = doPythagoras(a,b);

    document.getElementById("displayC").textContent = c;
}

function doPythagoras(a,b) {
    if (isNaN(a) || isNaN(b)){
        return 'Invalid input'
    }
    if (a < 0 || b < 0){
        return 'Negative number'
    }
    cSquare = a*a + b*b;
    return Math.sqrt(cSquare);
}

function loadFileAsync(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        } else if (this.readyState == 4) {
            callback(null);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function checkURL(filename) {
    if (typeof(filename)!=="string" || filename === '') {
        return false;
    } else {
        return true;
    }
}

function markAndResetInput(inputField) {
    if (inputField){
        inputField.setAttribute("style", "background-color:red;");
    }
}