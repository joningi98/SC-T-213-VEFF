function get_sudoku() {
    //Prepare the parameter value for 'myParam'
    var paramValue = document.getElementById('newGameButton');
    var strUser = paramValue.options[paramValue.selectedIndex].value;

    console.log(strUser);

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku';

    my_array = [];
    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, {difficulty: paramValue})
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);
            new_arr = response.data;

            console.log(new_arr.board.boxes);
            make_table.call(9,9)
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}

function make_table( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = ++i;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){ callback(el,r,c,i); }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}