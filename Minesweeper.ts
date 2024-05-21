export class Minesweeper {
    private board: number[][];
    private visibleBoard: string[][];
    size: number;
    mines: number;

    constructor(size: number, mines: number) {
        this.size = size;
        this.mines = mines;
        this.board = this.generateBoard(size);
        this.visibleBoard = this.generateVisibleBoard(size);
    }

    generateBoard(size: number): number[][] {
        const board: number[][] = [];
        for (let i = 0; i < size; i++) {
            board.push(Array(size).fill(0));
        }
        return board;
    }

    generateVisibleBoard(size: number): string[][] {
        const visibleBoard: string[][] = [];
        for (let i = 0; i < size; i++) {
            visibleBoard.push(Array(size).fill('O'));
        }
        return visibleBoard;
    }

    printCurrentBoard(): void {
        console.log(this.visibleBoard);
    }

    placeMines(firstClickRow: number, firstClickCol: number): number[][] {
        const minePositions: number[][] = [];
        let remainingMines = this.mines;

        while (remainingMines > 0) {
            const row = Math.floor(Math.random() * this.size);
            const col = Math.floor(Math.random() * this.size);

            if (
                row === firstClickRow &&
                col === firstClickCol
            ) {
                // Skip placing mine on the first clicked cell
                continue;
            }

            if (this.board[row][col] == -1) {
                // Mine already placed at this position
                continue;
            }

            this.board[row][col] = -1; // -1 represents a mine
            minePositions.push([row, col]);
            remainingMines--;
        }

        return minePositions;
    }

    cellReavel(row: number, col: number): void {
        this.board[row][col] = this.countAdjacentMines(row, col);
        this.visibleBoard[row][col] = this.board[row][col].toString();
    }

    isGameOver(row: number, col: number): boolean {
        if (this.board[row][col] === -1) {
            return true;
        }
        return false;
    }

    countAdjacentMines(row: number, col: number): number {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;

                if (
                    newRow >= 0 &&
                    newRow < this.size &&
                    newCol >= 0 &&
                    newCol < this.size &&
                    this.board[newRow][newCol] === -1
                ) {
                    count++;
                }
            }
        }

        return count;
    }

    canPlaceFlag(row: number, col: number): boolean {
        if (this.visibleBoard[row][col] === 'O') {
            return true;
        }
        return false;
    }
    
    flagPlace(row: number, col: number): void {
        this.board[row][col] = -2; // -2 represents a flag
        this.visibleBoard[row][col] = 'F';
    }
}
