let currentNumber = 0;
let isPlayerTurn = true;
let difficulty = 'medium'; // Default

// DOM Elements
const currentNumberElement = document.getElementById('currentNumber');
const playerTurnElement = document.getElementById('playerTurn');
const messageElement = document.getElementById('message');
const removeButtons = document.querySelectorAll('#remove1, #remove2, #remove3');
const newGameButton = document.getElementById('newGame');
const hintButton = document.getElementById('hint');
const difficultySelect = document.getElementById('difficulty');

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
    initGame(); // Restart game on difficulty change
});

// Initialize the game
function initGame() {
    currentNumber = Math.floor(Math.random() * 11) + 20; // Random number between 20-30
    isPlayerTurn = true;
    updateUI();
    enableButtons();
    messageElement.textContent = '';
}

// Update the UI
function updateUI() {
    currentNumberElement.textContent = currentNumber;
    playerTurnElement.textContent = isPlayerTurn ? 'You' : 'Computer';
}

// Calculate the best move (for hint and hard mode)
function calculateBestMove() {
    if (currentNumber <= 4) {
        // No winning move if 4 or less
        return 1;
    }
    const move = currentNumber % 4;
    return move === 0 ? 1 : move;
}

// Show hint
function showHint() {
    if (!isPlayerTurn || currentNumber <= 0) return;
    
    const hintMessage = document.createElement('div');
    hintMessage.className = 'hint-message';

    if (currentNumber === 1 || currentNumber === 2 || currentNumber === 3) {
        hintMessage.textContent = "No winning move. Any move will make you lose.";
    } else if (currentNumber === 4) {
        hintMessage.textContent = "You're in a losing position. The computer will win if it plays perfectly.";
    } else {
        const bestMove = calculateBestMove();
        const nextNumber = currentNumber - bestMove;
        hintMessage.textContent = `Remove ${bestMove} to leave ${nextNumber}. This gives you the best chance to win!`;
    }
    
    // Remove any existing hint message
    const existingHint = document.querySelector('.hint-message');
    if (existingHint) {
        existingHint.remove();
    }
    
    messageElement.appendChild(hintMessage);
    
    // Remove hint after 5 seconds
    setTimeout(() => {
        hintMessage.remove();
    }, 5000);
}

// Computer's turn
function computerTurn() {
    isPlayerTurn = false;
    updateUI();
    let removeAmount;

    if (difficulty === 'easy') {
        // Easy: random move
        removeAmount = Math.min(currentNumber, Math.floor(Math.random() * 3) + 1);
    } else if (difficulty === 'medium') {
        // Medium: current strategy
        const remainder = currentNumber % 4;
        if (remainder === 0) {
            removeAmount = Math.min(currentNumber, Math.floor(Math.random() * 3) + 1);
        } else {
            removeAmount = Math.min(currentNumber, remainder);
        }
    } else {
        // Hard: perfect play
        if (currentNumber <= 4) {
            removeAmount = Math.min(currentNumber, 1);
        } else {
            const move = currentNumber % 4;
            removeAmount = move === 0 ? 1 : move;
            removeAmount = Math.min(currentNumber, removeAmount);
        }
    }

    setTimeout(() => {
        currentNumber -= removeAmount;
        messageElement.textContent = `Computer removed ${removeAmount}`;
        checkGameStatus();
        isPlayerTurn = true;
        updateUI();
    }, 1000);
}

// Check if the game is over
function checkGameStatus() {
    if (currentNumber <= 0) {
        const winner = isPlayerTurn ? 'Computer' : 'You';
        messageElement.textContent = `${winner} wins!`;
        disableButtons();
    }
}

// Handle player's move
function handlePlayerMove(amount) {
    if (!isPlayerTurn || currentNumber <= 0) return;
    
    currentNumber -= amount;
    messageElement.textContent = `You removed ${amount}`;
    checkGameStatus();
    
    if (currentNumber > 0) {
        computerTurn();
    }
}

// Enable/disable buttons
function enableButtons() {
    removeButtons.forEach(button => {
        button.disabled = false;
    });
    hintButton.disabled = false;
}

function disableButtons() {
    removeButtons.forEach(button => {
        button.disabled = true;
    });
    hintButton.disabled = true;
}

// Event Listeners
removeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const amount = parseInt(button.textContent.split(' ')[1]);
        handlePlayerMove(amount);
    });
});

hintButton.addEventListener('click', showHint);
newGameButton.addEventListener('click', initGame);

// Start the game
initGame(); 