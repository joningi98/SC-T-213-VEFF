function get_sudoku() {
    //Prepare the parameter value for 'myParam'
    var paramValue = document.getElementById('difficulty');
    var strUser = paramValue.options[paramValue.selectedIndex].value;

    console.log(strUser);

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, {difficulty: strUser})
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            console.log("Success: ", response.data);
            sudoku_array = response.data.board.boxes;

           // console.log(sudoku_array);
            generateGrid(sudoku_array)
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}

function generateGrid(grid_data) {
    document.write('<div></div>');
    console.log(grid_data);
    for( var x=0; x <= 8; x++ ) {
        document.write('<div></div>');
        for (var y = 0; y <= 8; y++) {
            var grid_num = grid_data[x][y];
            console.log(grid_num, x,y);
            if (grid_data[x][y] == "."){
                document.write('<input type="text" name="your_name" value="" />');
            }
            else {
                document.write('<input type="text" name="your_name" value="<? echo $grid_num ?>" />');
            }
        }
        // end the current row
        document.write('</tr>');
        document.write('</table>');
    }
}
