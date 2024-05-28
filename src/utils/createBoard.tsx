import randomNum from "./randomFixSeed";

interface Cell {
    value: number | '💣';       // To store the number of mines around the cell or '💣' if it's a mine.
    revealed: boolean;          // To store if the cell is revealed.
    x: number;                  // To store the x coordinate (the column index) of the cell.
    y: number;                  // To store the y coordinate (the row index) of the cell.
    flagged: boolean;           // To store if the cell is flagged.
}

interface Board {
    board: Cell[][];
    mineLocations: [number, number][];
}

const createBoard = (boardSize: number, mineNum: number): Board => {
    let board: Cell[][] = [];
    let mineLocations: [number, number][] = [];

    // Print Board function (For testing)
    const printBoard = (): void => {
        console.log("Current Board");
        for (let x = 0; x < boardSize; x++) {
            console.log(board[x].map((cell) => {
                return (cell.value !== '💣' ? cell.value.toString() + " " : cell.value);
            }));
        }
    };

    // Create a blank board
    for (let x = 0; x < boardSize; x++) {
        let subCol: Cell[] = [];
        for (let y = 0; y < boardSize; y++) {
            subCol.push({
                value: 0,
                revealed: false,
                x: x,
                y: y,
                flagged: false,
            });
        }
        board.push(subCol);
    }

    // Random bombs locations
    let mineCount = 0;
    while (mineCount < mineNum) {
        let x = randomNum(0, boardSize - 1);
        let y = randomNum(0, boardSize - 1);

        if (board[x][y].value === 0) {            // Check this location has not been located a mine.
            board[x][y].value = '💣';           // Change the value of the cell to '💣'
            mineLocations.push([x, y]);
            mineCount++;
        }
    }

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c].value === '💣') continue;
            // Top
            if (r > 0 && board[r - 1][c].value === '💣') {
                board[r][c].value = (board[r][c].value as number) + 1;
            }
            // Top Right
            if (r > 0 && c < boardSize - 1 && board[r - 1][c + 1].value === '💣') board[r][c].value = (board[r][c].value as number) + 1;
            // Right
            if (c < boardSize - 1 && board[r][c + 1].value === '💣') board[r][c].value = (board[r][c].value as number) + 1;
            // Bottom Right
            if (r < boardSize - 1 && c < boardSize - 1 && board[r + 1][c + 1].value === '💣') board[r][c].value = (board[r][c].value as number) + 1;
            // Bottom
            if (r < boardSize - 1 && board[r + 1][c].value === '💣') board[r][c].value = (board[r][c].value as number) + 1;
            // Bottom Left
            if (r < boardSize - 1 && c > 0 && board[r + 1][c - 1].value === '💣') board[r][c].value = (board[r][c].value as number) + 1;
            // Left
            if (c > 0 && board[r][c - 1].value === '💣') board[r][c].value = (board[r][c].value as number) + 1;
            // Top Left
            if (r > 0 && c > 0 && board[r - 1][c - 1].value === '💣') board[r][c].value = (board[r][c].value as number) + 1;
        }
    }

    //  Testing: printBoard()

    return { board, mineLocations };
};

export default createBoard;
