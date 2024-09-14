let currentOperationDisplay = document.getElementById('current-operation');
let cacheOperationDisplay = document.getElementById('operation-cache');
let upperButtonsMenu = document.getElementById('upper-buttons');
let lowerButtonsMenu = document.getElementById('lower-buttons');

let firstOperationNumber;
let secondOperationNumber;
let operation;

function setCacheOperationDisplay(content) {
    cacheOperationDisplay.textContent = content;
    currentOperationDisplay.textContent = '0';
}

function appendToCurrentOperationDisplay(content) {
    let currentContent = currentOperationDisplay.textContent;
    
    if (currentContent == '0' && content == '.') {
        currentOperationDisplay.textContent = '0.';
    } else if (currentContent == '0') {
        currentOperationDisplay.textContent = content;
    } else {
        let newContent = currentContent + content;
        currentOperationDisplay.textContent = newContent;
    }
}

function cleanRestart() {
    firstNumber = null;
    secondNumber = null;
    operation = null;
    cacheOperationDisplay.textContent = '';
    currentOperationDisplay.textContent = '0';
}

function checkIfCurrentDisplayNull() {
    if (currentOperationDisplay.textContent == '')
        currentOperationDisplay.textContent = '0';
}

function deleteLastInput() {
    let currentContent = currentOperationDisplay.textContent;
    if (currentContent == '0' || currentContent == '') {
        currentOperationDisplay.textContent = '0';
    } else {
        let updatedContent = currentContent.substring(0, currentContent.length - 1);
        currentOperationDisplay.textContent = updatedContent;
        checkIfCurrentDisplayNull();
    }
}

function operate(operation, firstNumber, secondNumber) {
    switch (operation) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case 'X':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
        default:
            break;
    }
}

function handleSubtraction() {
    if (currentOperationDisplay.textContent == '0' || currentOperationDisplay.textContent == '') {
        currentOperationDisplay.textContent = '-';
    } else {
        operation = '-';
        firstOperationNumber = parseFloat(currentOperationDisplay.textContent);
        setCacheOperationDisplay(firstOperationNumber + ' -');
    }
}

function handleSum() {
    if (cacheOperationDisplay.textContent != '' && currentOperationDisplay.textContent != '-') {
        secondOperationNumber = parseFloat(currentOperationDisplay.textContent);
        currentOperationDisplay.textContent = operate(operation, firstOperationNumber, secondOperationNumber);
        cacheOperationDisplay.textContent = '';
    }
}

function handlePoint() {
    if (!currentOperationDisplay.textContent.includes('.')) {
        appendToCurrentOperationDisplay('.');
    }
}

function handleLowerButtonsMenu(event) {
    switch(event) {
        case '0':
            appendToCurrentOperationDisplay('0');
            break;
        case '1':
            appendToCurrentOperationDisplay('1');
            break;
        case '2':
            appendToCurrentOperationDisplay('2');
            break;
        case '3':
            appendToCurrentOperationDisplay('3');
            break;
        case '4':
            appendToCurrentOperationDisplay('4');
            break;
        case '5':
            appendToCurrentOperationDisplay('5');
            break;
        case '6':
            appendToCurrentOperationDisplay('6');
            break;
        case '7':
            appendToCurrentOperationDisplay('7');
            break;
        case '8':
            appendToCurrentOperationDisplay('8');
            break;
        case '9':
            appendToCurrentOperationDisplay('9');
            break;
        case '.':
        case ',':
            handlePoint();
            break;
        case '+':
            operation = '+';
            firstOperationNumber = parseFloat(currentOperationDisplay.textContent);
            setCacheOperationDisplay(currentOperationDisplay.textContent + ' +');
            break;
        case '-':
            handleSubtraction();
            break;
        case '*':
        case 'x':
        case 'X':
            operation = 'X';
            firstOperationNumber = parseFloat(currentOperationDisplay.textContent);
            setCacheOperationDisplay(currentOperationDisplay.textContent + ' x');
            break;
        case '/':
            operation = '/';
            firstOperationNumber = parseFloat(currentOperationDisplay.textContent);
            setCacheOperationDisplay(currentOperationDisplay.textContent + ' /');
            break;
        case '=':
        case 'Enter':
            handleSum();
            break;
        default:
            break;
    }
}

function handleUpperButtonsMenu(event) {
    switch(event) {
        case 'Delete':
        case 'clean-button':
            cleanRestart();
            break;
        case 'Backspace':
        case 'delete-button':
            deleteLastInput();
            break;
        default:
            break;
    }
}

upperButtonsMenu.addEventListener('click', (event) => {
    let target = event.target.id;
    handleUpperButtonsMenu(target);
});

document.addEventListener('keydown', (event) => {
    let pressedKey = event.key;
    handleUpperButtonsMenu(pressedKey);
});

lowerButtonsMenu.addEventListener('click', (event) => {
    let target = event.target.textContent;
    handleLowerButtonsMenu(target);
});

document.addEventListener('keydown', (event) => {
    handleLowerButtonsMenu(event.key);
});