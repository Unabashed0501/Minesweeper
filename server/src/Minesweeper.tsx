import randomNum from "./utils/randomFixSeed";

type Cell = {
    revealed: boolean;
    value: number | '💣';
    flagged: boolean;
    x: number;
    y: number;
};

interface Board extends Array<Cell[]> { }

interface NewBoard {
    board: Board;
    mineLocations: [number, number][];
}

interface RevealResult {
    board: Board;
    newNonMinesCount: number;
}

export class Minesweeper {
    private board: Board;
    private mineLocations: [number, number][];
    private boardSize: number;
    private mineNum: number;
    private nonMineCount: number;
    private remainFlagNum: number;
    private gameOver: boolean;
    private firstClick: boolean;

    constructor(boardSize: number, mineNum: number) {
        this.boardSize = boardSize;
        this.mineNum = mineNum;
        const { board, mineLocations } = this.createBoard();
        this.board = board;
        this.mineLocations = mineLocations;
        this.nonMineCount = boardSize * boardSize - mineNum;
        this.remainFlagNum = mineNum;
        this.gameOver = false;
        this.firstClick = true;
    }

    createBoard = (): NewBoard => {
        let board: Cell[][] = [];
        let mineLocations: [number, number][] = [];

        // Print Board function (For testing)
        const printBoard = (): void => {
            console.log("Current Board");
            for (let x = 0; x < this.boardSize; x++) {
                console.log(board[x].map((cell) => {
                    return (cell.value !== '💣' ? cell.value.toString() + " " : cell.value);
                }));
            }
        };

        // Create a blank board
        for (let x = 0; x < this.boardSize; x++) {
            let subCol: Cell[] = [];
            for (let y = 0; y < this.boardSize; y++) {
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

        return { board, mineLocations };
    };


    placeMines(firstClickRow: number, firstClickCol: number): void {
        // Random bombs locations
        let mineLocations: [number, number][] = [];
        let mineCount = 0;
        while (mineCount < this.mineNum) {
            let x = randomNum(0, this.boardSize - 1);
            let y = randomNum(0, this.boardSize - 1);

            if (this.board[x][y].value === 0 && (x != firstClickRow || y != firstClickCol)) {            // Check this location has not been located a mine.
                this.board[x][y].value = '💣';           // Change the value of the cell to '💣'
                mineLocations.push([x, y]);
                mineCount++;
            }
        }

        for (let r = 0; r < this.boardSize; r++) {
            for (let c = 0; c < this.boardSize; c++) {
                if (this.board[r][c].value === '💣') continue;
                // Top
                if (r > 0 && this.board[r - 1][c].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
                // Top Right
                if (r > 0 && c < this.boardSize - 1 && this.board[r - 1][c + 1].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
                // Right
                if (c < this.boardSize - 1 && this.board[r][c + 1].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
                // Bottom Right
                if (r < this.boardSize - 1 && c < this.boardSize - 1 && this.board[r + 1][c + 1].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
                // Bottom
                if (r < this.boardSize - 1 && this.board[r + 1][c].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
                // Bottom Left
                if (r < this.boardSize - 1 && c > 0 && this.board[r + 1][c - 1].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
                // Left
                if (c > 0 && this.board[r][c - 1].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
                // Top Left
                if (r > 0 && c > 0 && this.board[r - 1][c - 1].value === '💣') this.board[r][c].value = (this.board[r][c].value as number) + 1;
            }
        }
    }

    revealed = (board: Cell[][], x: number, y: number, newNonMinesCount: number): RevealResult => {
        board[x][y].revealed = true;
        newNonMinesCount--;
        const inBox = (x: number, y: number): boolean => {
            return x >= 0 && x < board.length && y >= 0 && y < board.length;
        }

        if (board[x][y].flagged === true) {
            return { board, newNonMinesCount };
        }

        if (board[x][y].value !== 0) {
            return { board, newNonMinesCount };
        }

        if (board[x][y].value === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (inBox(x + i, y + j)) {
                        if (!board[x + i][y + j].revealed) {
                            let e = this.revealed(board, x + i, y + j, newNonMinesCount);
                            board = e.board;
                            newNonMinesCount = e.newNonMinesCount;
                        }
                    }
                }
            }
        }

        return { board, newNonMinesCount };
    };

    revealCell = (x: number, y: number) => {
        // if (this.board[x][y].revealed || this.gameOver || this.board[x][y].flagged) return;
        if (this.firstClick) {
            this.placeMines(x, y);
            this.firstClick = false;
        }
        let newBoard = JSON.parse(JSON.stringify(this.board));
        let e = this.revealed(newBoard, x, y, this.nonMineCount);
        newBoard = e.board;
        this.setBoard(newBoard);
        this.setNonMineCount(e.newNonMinesCount);

        // if (this.board[x][y].value === '💣') {
        //     setGameOver(true);
        // }

        // if (e.newNonMinesCount === 0) {
        //     setWin(true);
        // }
    };

    isGameOver(row: number, col: number): boolean {
        this.gameOver = true;
        return this.board[row][col].value === '💣';
    }

    isGameWon(): boolean {
        return this.nonMineCount === 0;
    }

    canPlaceFlag(row: number, col: number): boolean {
        return !this.board[row][col].revealed && this.remainFlagNum >= 0;
    }

    flagPlace(row: number, col: number): void {
        if (this.canPlaceFlag(row, col)) {
            if (this.remainFlagNum === 0) {
                if (this.board[row][col].flagged) {
                    this.board[row][col].flagged = false;
                    this.remainFlagNum += 1;
                }
            }
            else {
                this.board[row][col].flagged = !this.board[row][col].flagged;
                this.remainFlagNum += this.board[row][col].flagged ? -1 : 1;
            }
        }
    }

    resetGame(boardSize: number, mineNum: number): void {
        this.boardSize = boardSize;
        this.mineNum = mineNum;
        const { board, mineLocations } = this.createBoard();
        this.board = board;
        this.mineLocations = mineLocations;
        this.nonMineCount = boardSize * boardSize - mineNum;
        this.remainFlagNum = mineNum;
        this.gameOver = false;
    }

    setBoard(board: Board): void {
        this.board = board;
    }

    setNonMineCount(nonMineCount: number): void {
        this.nonMineCount = nonMineCount;
    }

    setRemainFlagNum(remainFlagNum: number): void {
        this.remainFlagNum = remainFlagNum;
    }

    getBoard(): Board {
        return this.board;
    }

    getNonMineCount(): number {
        return this.nonMineCount;
    }

    getRemainFlagNum(): number {
        return this.remainFlagNum;
    }
}
