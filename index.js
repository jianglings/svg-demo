const wordEl = document.getElementById('word'),
    wrongLettersEl = document.getElementById('wrong-letters'),
    playAgainBtn = document.getElementById('play-button'),
    popup = document.getElementById('popup-contianer'),
    notification = document.getElementById('notification-container'),
    finalMessage = document.getElementById('final-message'),
    figureParts = document.querySelectorAll('.figure-part')


// 自定义随机单词
const words = ['abandon', 'between', 'cabbage', 'draft', 'essential', 'programm'];

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = [],
    wrongLetters = [];



displayWord();



// 键盘事件监听
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            // 不存在在correctLetters中
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                // 存在在 correctLetters中
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                // 更新错误数组
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})

// 再玩一次
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
})



function displayWord() {

    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter =>
        `
        <span class='letter'>
        ${correctLetters.includes(letter) ? letter : ' '}
        </span >
            `
    ).join('')}
    `;

    // 去除换行符
    const innerWord = wordEl.innerText.replace(/\n/g, "");

    if (innerWord == selectedWord) {
        finalMessage.innerText = ' 恭喜你输入正确！ 😃';
        popup.style.display = 'flex';
    }
}


function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}


function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>输入错误</p>" : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    // 显示火柴人
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
        if (wrongLetters.length === figureParts.length) {
            finalMessage.innerText = '抱歉输入错误，游戏结束. 😕';
            popup.style.display = 'flex';
        }
    })
}

















