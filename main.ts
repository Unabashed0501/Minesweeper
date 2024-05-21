import { Minesweeper } from './Minesweeper';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let minesweeper: Minesweeper | null = null;

function startGame() {
    rl.question('Enter the row for the click (or type "quit" to exit): ', (rowInput) => {
        if (rowInput.toLowerCase() === 'quit') {
            rl.close();
            return;
        }
        const row = parseInt(rowInput);
        rl.question('Enter the column for the click: ', (colInput) => {
            if (colInput.toLowerCase() === 'quit') {
                rl.close();
                return;
            }
            const col = parseInt(colInput);

            if (isNaN(row) || isNaN(col)) {
                startGame();
                return;
            }
            
            // Initialize Minesweeper object only once
            if (!minesweeper) {
                const size = 5;
                const mines = 5;
                minesweeper = new Minesweeper(size, mines);
                const minePositions = minesweeper.placeMines(row, col);
                console.log('Mines placed at:');
                console.log(minePositions);
                console.log('Initial Board:');
                minesweeper.printCurrentBoard();
            }

            // Check if the input is valid (within the board size)
            if (row < 0 || row >= minesweeper.size || col < 0 || col >= minesweeper.size) {
                console.log('Invalid input. Row and column must be within the board size.');
            } else {
                rl.question('Do you want to place a flag? (yes/no): ', (answer) => {
                    if (answer.toLowerCase() == ('yes' || 'y')) {
                        if (minesweeper) {
                            if(!minesweeper.canPlaceFlag(row, col)){
                                console.log('Cannot place flag here. Cell is already revealed.');
                                startGame();
                                return;
                            }
                            minesweeper.flagPlace(row, col);
                            console.log('Flag placed at row', row, 'column', col);
                            console.log('Updated Board:');
                            minesweeper.printCurrentBoard();
                        }
                    } else {
                        if (minesweeper) {
                            if (minesweeper.isGameOver(row, col)) {
                                console.log('Game Over!');
                                rl.close();
                                return;
                            }
                            else {
                                minesweeper.cellReavel(row, col);
                                console.log('Updated Board:');
                                minesweeper.printCurrentBoard();
                            }
                        }
                    };
                    startGame();
                });
            }
            startGame();
        });
    });
}

startGame();