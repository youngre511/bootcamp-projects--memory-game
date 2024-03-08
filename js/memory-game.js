const buttonArr = document.querySelectorAll('button')
const colorArr = ["yellow", "green", "red", "blue"];
const sound = new Audio();
const contain = document.querySelector('.simon-container')
const msg = document.querySelector('h2')
let buttonsOn = false;
let gameInProgress = false;
const sequence = []
const playerSequence = [];
let j = 0;
let turn = 1

window.addEventListener('keydown', () => {
    if(!gameInProgress) {
        gameInProgress = true;
        sequence.splice(0);
        playerSequence.splice(0);
        let z = 3
        const Countdown = setInterval(() => {
            msg.innerText = `Let's Play in ${z}`;
            z--
            if(z == 0) {
                clearInterval(Countdown)
            }
        }, 1000)
        
        setTimeout(() => playRound(), 4000);
    }
})

console.log(buttonArr)
for (btn of buttonArr) {
      btn.addEventListener("click", buttonPush);
    }

function playRound() {
    msg.innerText = 'Watch and Listen'
    let colorName = colorArr[~~(Math.random()*4)]
    sequence.push(colorName)
    let i = 0;
    const sequenceInterval = setInterval(() => {
        let colorName = sequence[i]
        console.log(colorName)
        let button = document.getElementById(colorName)
        console.log(button)
        sound.src=`audio/${colorName}.mp3`
        sound.play()
        button.style.scale = .9
        setTimeout(() => button.style.scale = 1, 201)
        i++
        console.log(sequence.length)
        console.log(i)
        if (i == sequence.length) {
            setTimeout(() => {
                msg.innerText = "Your Turn";
                buttonsOn = true;
            }, 1000);
            clearInterval(sequenceInterval)
        }
    }, 750)
}

function buttonPush() {
    if (buttonsOn) {
        let color = this.id
        playerSequence.push(color)
        let button = document.getElementById(color);
        button.style.scale = .9;
        setTimeout(() => button.style.scale  = 1, 201)
        if(playerSequence[j] == sequence[j]) {
            sound.src = `audio/${color}.mp3`;
            sound.play()
            if (playerSequence.length != sequence.length) {
                j++
            } else {
                j = 0;
                playerSequence.splice(0);
                buttonsON = false;
                setTimeout(playRound, 2000)
            }
        } else {
            sound.src = 'audio/sat-on-the-cat.mp3';
            sound.play();
            contain.style.transform = 'rotate(1440deg)'
            setTimeout(() => {
                contain.style.transition = 'none'
                contain.style.transform = 'rotate(0)'
            }, 1101)
            setTimeout(()=> contain.removeAttribute('style'), 1300)
            buttonsOn = false;
            gameInProgress = false;
            msg.innerText = 'Game over! Press any key to play again.';
        }
    }
}