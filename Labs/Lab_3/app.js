
function load_nums() {
    document.getElementById('resultMsg').style.display = 'none';
    document.getElementById('mathIn').value = '';
    var number_one = Math.floor((Math.random() * 10) + 1);
    var number_two = Math.floor((Math.random() * 10) + 1);
    if (number_one < number_two){
        var temp1 = number_one;
        var temp2 = number_two;
        number_one = temp2;
        number_two = temp1;
    }
    console.log(number_one);
    console.log(number_two);
    var my_list =  ['-','+','*'];
    var my_element = my_list[Math.floor((Math.random() * 3))];
    document.getElementById('taskMsg').innerHTML = 'Calculate' +' '+ number_one +' '+ my_element +' '+ number_two;
    if (my_element ==='-'){
        result = number_one - number_two;}
    else if (my_element === '+'){
        result = number_one + number_two;}
    else
        {result = number_one * number_two;}
}

window.onload = load_nums();

function evaluateResult() {
    var my_result = result;
    var answer = document.getElementById('mathIn').value;
    var box = document.getElementById('resultMsg');
    console.log(answer);
    if (my_result == answer){
        console.log('Correct');
        box.style.display = 'block';
        box.classList.add('alert-success');
        box.innerHTML = 'Correct';
    }
    else{
        console.log('Incorrect');
        box.classList.add('alert-danger');
        box.style.display = 'block';
        box.innerHTML = 'Incorrect';
    }
    setTimeout(load_nums, 5000);

}

function printLoop() {
    document.getElementById('loopOutput').innerHTML = '';
    var loop_box = document.getElementById('loopOutput');
    var chosen_num = document.getElementById('loopNumber').value;
    console.log(chosen_num);
    var counter = 0;
    var refreshInterVal = setInterval(() => {
            if (counter === Number(chosen_num)){
                console.log('Clear');
                clearInterval(refreshInterVal);
            }
            else{
                loop_box.innerHTML += counter + 1 + '<br>';
            }
            counter++;
        },10)}
