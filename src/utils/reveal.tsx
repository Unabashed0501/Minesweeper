interface Cell {
    revealed: boolean;
    value: number;
    flagged: boolean;
    x: number;
    y: number;
}

interface Board extends Array<Cell[]> {}

interface RevealResult {
    board: Board;
    newNonMinesCount: number;
}

export const revealed = (board: Board, x: number, y: number, newNonMinesCount: number): RevealResult => {
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
                        let e = revealed(board, x + i, y + j, newNonMinesCount);
                        board = e.board;
                        newNonMinesCount = e.newNonMinesCount;
                    }
                }
            }
        }
    }

    return { board, newNonMinesCount };
};
