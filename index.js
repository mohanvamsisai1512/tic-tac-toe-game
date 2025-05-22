let scorex = document.getElementById('scorex');
let scoreo = document.getElementById('scoreo');

let variable = 0;

let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let box3 = document.getElementById('box3');
let box4 = document.getElementById('box4');
let box5 = document.getElementById('box5');
let box6 = document.getElementById('box6');
let box7 = document.getElementById('box7');
let box8 = document.getElementById('box8');
let box9 = document.getElementById('box9');

let resetbtn = document.getElementById('resetbtn');
let endgamebtn = document.getElementById('endgamebtn');

let box = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

function showPopupMessage(message) {
    const popup = document.getElementById('popup-message');
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // hide after 2 seconds
}


let wincombo = [
    [box1, box2, box3],
    [box4, box5, box6],
    [box7, box8, box9],
    [box1, box4, box7],
    [box2, box5, box8],
    [box3, box6, box9],
    [box1, box5, box9],
    [box3, box5, box7]
];

function check() {
    for (let combo of wincombo) {
        let [a, b, c] = combo;
        if (a.textContent !== '' && a.textContent === b.textContent && b.textContent === c.textContent) {
            return a.textContent;
        }
    }
    return null;
}

function handleEvent(e) {
    let k = e.target;

    if (k.textContent !== '') return;

    if (variable % 2 === 0) {
        k.textContent = 'X';
        k.classList.remove('o');
        k.classList.add('x');
    } else {
        k.textContent = 'O';
        k.classList.remove('x');
        k.classList.add('o');
    }

    variable++;

    let winner = check();

    if (winner) {
        if (winner === 'X') {
            scorex.textContent = parseInt(scorex.textContent) + 1;
        } else {
            scoreo.textContent = parseInt(scoreo.textContent) + 1;
        } 
        
        setTimeout(() => {
            showPopupMessage(winner + " wins!");
            reset()
        }, 500); 
        
    } else if (variable === 9) {
        setTimeout(() => {
            showPopupMessage("It's a draw!");
            reset()
        }, 500);
        
    }
}

function reset() {
    variable = 0;
    for (let m of box) {
        m.textContent = '';
        m.classList.remove('x', 'o');
        m.removeEventListener('click', handleEvent);
        m.addEventListener('click', handleEvent);
    }
}

function end() {
    scorex.textContent = '0';
    scoreo.textContent = '0';
    reset();
}

// Initial setup
for (let b of box) {
    b.addEventListener('click', handleEvent);
}

resetbtn.addEventListener('click', reset);
endgamebtn.addEventListener('click', end);
