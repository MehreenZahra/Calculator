let screen = document.querySelector('#screen');
let buttons = document.querySelectorAll('.btn');

for (item of buttons) {
    item.addEventListener('click',(e) => {
        buttonstext = e.target.innerText;
        if (buttonstext == 'x')  buttonstext = '*';
        if (buttonstext == '÷')   buttonstext = '/';
        
        screen.value += buttonstext;
    });
}
  
function sin(){
    screen.value = Math.sin(screen.value);
}
function cos(){
    screen.value = Math.cos(screen.value);
}function tan(){
    screen.value = Math.tan(screen.value);
}function power(){
    screen.value = Math.pow(screen.value, 2);
}function squareRoot(){
    screen.value = Math.sqrt(screen.value,2);
}function log(){
    screen.value = Math.log(screen.value);
}
function pi(){
    screen.value = 3.1415;
}
function e(){
    screen.value = 2.7182;
}
function factorial(){
    let num = screen.value;
    let fact = 1;
    for(i = 1; i <= num; i++){
        fact = fact * i;
    }

    screen.value = fact;
}

function backSpace(){
    screen.value = screen.value.slice(0, -1);
}

function clear(){
    screen.value = '';
}

function calculate(){
    screen.value = eval(screen.value)
 }        

