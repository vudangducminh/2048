var board = {
    row: 4,
    col: 4
};

function rng(l, r){
    return Math.floor(Math.random() * (r - l + 1)) + l;
}

function hash(i, j){
	return (i - 1) * board.col + j;
}


let state = new Array(board.row + 1);
let previous_state = new Array(board.row + 1);
var current_score = 0;

for(var i = 1; i <= board.row; i++){
    state[i] = new Array(board.col + 1).fill(0);
    previous_state[i] = new Array(board.col + 1).fill(0);
}

function update_previous_state(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            previous_state[i][j] = state[i][j];
        }
    }
}

function valid(){
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(previous_state[i][j] != state[i][j]) return true;
        }
    }
    return false;
}

function generate(number, val){
    // number = 0;
    for(var num = 1; num <= number; num++){
        var arr = [0], numbers_of_0 = 0;
        for(var i = 1; i <= board.row; i++){
            for(var j = 1; j <= board.col; j++){
                if(!state[i][j]){
                    arr.push(hash(i, j));
                    numbers_of_0++;
                }
            }
        }
        var cell = rng(1, numbers_of_0);
        var cell_row = Math.floor((arr[cell] - 1) / board.col) + 1, cell_col = arr[cell] % board.col;
        if(!cell_col) cell_col = board.col;
        // document.writeln(arr[cell]);
        // document.writeln(cell_row)
        // document.writeln(cell_col);
        state[cell_row][cell_col] = val;
    }
    update();
}

function add(){
    var new_val = rng(1, 5);
    if(new_val <= 4) generate(1, 2);
    else generate(1, 4);
    update(); check();
}

function move_left(){
    for(var i = 1; i <= board.row; i++){
        let a = new Array(board.col + 1).fill(0);
        var cnt = 1;
        for(var j = 1; j <= board.col; j++){
            if(state[i][j]){
                a[cnt] = state[i][j];
                cnt++;
            }
            state[i][j] = 0;
        }
        cnt--;
        var crr = 1;
        for(var j = 1; j <= cnt; j++){
            if(!a[j]) continue;
            if(j < cnt){
                if(a[j] == a[j + 1]){
                    state[i][crr] = a[j] + a[j + 1];
                    current_score += a[j] * 2;
                    a[j] = a[j + 1] = 0;
                    crr++;
                }
                else{
                    state[i][crr] = a[j];
                    crr++;
                }
            }
            else{
                state[i][crr] = a[j];
                crr++;
            }
        }
    }
    if(valid()){
        add();
        update_previous_state();
    }
}

function move_right(){
    for(var i = 1; i <= board.row; i++){
        let a = new Array(board.col + 1).fill(0);
        var cnt = board.col;
        for(var j = board.col; j >= 1; j--){
            if(state[i][j]){
                a[cnt] = state[i][j];
                cnt--;
            }
            state[i][j] = 0;
        }
        cnt++;
        var crr = board.col;
        for(var j = board.col; j >= cnt; j--){
            if(!a[j]) continue;
            if(j > cnt){
                if(a[j] == a[j - 1]){
                    state[i][crr] = a[j] + a[j - 1];
                    current_score += a[j] * 2;
                    a[j] = a[j - 1] = 0;
                    crr--;
                }
                else{
                    state[i][crr] = a[j];
                    crr--;
                }
            }
            else{
                state[i][crr] = a[j];
                crr--;
            }
        }
    }
    if(valid()){
        add();
        update_previous_state();
    }
}

function move_up(){
    for(var i = 1; i <= board.col; i++){
        let a = new Array(board.row + 1).fill(0);
        var cnt = 1;
        for(var j = 1; j <= board.row; j++){
            if(state[j][i]){
                a[cnt] = state[j][i];
                cnt++;
            }
            state[j][i] = 0;
        }
        cnt--;
        var crr = 1;
        for(var j = 1; j <= cnt; j++){
            if(!a[j]) continue;
            if(j < cnt){
                if(a[j] == a[j + 1]){
                    state[crr][i] = a[j] + a[j + 1];
                    current_score += a[j] * 2;
                    a[j] = a[j + 1] = 0;
                    crr++;
                }
                else{
                    state[crr][i] = a[j];
                    crr++;
                }
            }
            else{
                state[crr][i] = a[j];
                crr++;
            }
        }
    }
    if(valid()){
        add();
        update_previous_state();
    }
}

function move_down(){
    for(var i = 1; i <= board.col; i++){
        let a = new Array(board.row + 1).fill(0);
        var cnt = board.row;
        for(var j = board.row; j >= 1; j--){
            if(state[j][i]){
                a[cnt] = state[j][i];
                cnt--;
            }
            state[j][i] = 0;
        }
        cnt++;
        var crr = board.row;
        for(var j = board.row; j >= cnt; j--){
            if(!a[j]) continue;
            if(j > cnt){
                if(a[j] == a[j - 1]){
                    state[crr][i] = a[j] + a[j - 1];
                    current_score += a[j] * 2;
                    a[j] = a[j - 1] = 0;
                    crr--;
                }
                else{
                    state[crr][i] = a[j];
                    crr--;
                }
            }
            else{
                state[crr][i] = a[j];
                crr--;
            }
        }
    }
    if(valid()){
        add();
        update_previous_state();
    }
}

function check(){
    var check = 0, numbers_of_0 = 0;
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j < board.col; j++){
            if(state[i][j] == state[i][j + 1]) check++;
        }
    }
    for(var i = 1; i <= board.col; i++){
        for(var j = 1; j < board.row; j++){
            if(state[j][i] == state[j + 1][i]) check++;
        }
    }
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            if(!state[i][j]) numbers_of_0++;
        }
    }
    if(numbers_of_0) return;
    if(!check){
        update();
        end_game();
    }
}

function getColor(val){
    var color = "#ffffff";
    switch(val){
        case 2:		color = "#F6CED8"; break;
        case 4:		color = "#F7BE81"; break;
        case 8:		color = "#F3F781"; break;
        case 16:	color = "#BEF781"; break;
        case 32:	color = "#81F7D8"; break;
        case 64:	color = "#58D3F7"; break;
        case 128:	color = "#FA58F4"; break;
        case 256:	color = "#A901DB"; break;
        case 512:	color = "#01DF3A"; break;
        case 1024:	color = "#D7DF01"; break;
        case 2048:	color = "#D7DF01"; break;
        default:	color = "#ffffff";
    }
    return color;
}

function update(){
    let score = document.getElementById("Score2048");
    score.textContent = "Score: " + current_score;
    for(var i = 1; i <= board.row; i++){
        for(var j = 1; j <= board.col; j++){
            let cell = document.getElementById(hash(i, j));
            if(state[i][j]) cell.textContent = state[i][j];
            else cell.textContent = "";
            cell.style.backgroundColor = getColor(state[i][j]);   
        }
    }
}

function init(){
    var score = document.createElement('Score');
    var table = document.createElement('table');
    for(var i = 1; i <= board.row; i++){
        var row = document.createElement('tr');
        for(var j = 1; j <= board.col; j++){
            var cell = document.createElement('td');
            cell.id = hash(i, j);
            row.appendChild(cell);
            cell.textContent = '';
        }
        table.appendChild(row);
    } 
    document.getElementById('Board2048').appendChild(table);
    
    var numbers_of_2 = rng(1, 2);
    var numbers_of_4 = rng(0, 1);
    generate(numbers_of_2, 2);
    generate(numbers_of_4, 4);
    update_previous_state();
    update();
}


window.addEventListener('load', function(){
    init();
});

function newgame(){
	window.location.reload();
}

document.onkeydown = (e) => {
    e = e || window.event;
    if(e.keyCode === 37) move_left();
    if(e.keyCode === 38) move_up();
    if(e.keyCode === 39) move_right();
    if(e.keyCode === 40) move_down();
}

function end_game(){
    alert("Failure!!!");
}
