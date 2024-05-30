import express, { Request, Response } from 'express';
import cors from 'cors';
import path from "path";
import bodyParser from 'body-parser';
import { Minesweeper } from './Minesweeper';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
// app.use(express.json());

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../..", "public")))
app.get("*", (_: any, res: any) => {
  res.sendFile(path.join(__dirname, "../..", "public", "index.html"))
})

let minesweeper: Minesweeper | null = null;

// Route to start a new game
app.post('/api/new-game', (req: Request, res: Response) => {
    const { boardSize, mineNum } = req.body;
    minesweeper = new Minesweeper(parseInt(boardSize as string), parseInt(mineNum as string));
    minesweeper.resetGame(parseInt(boardSize as string), parseInt(mineNum as string));
    res.json(minesweeper.createBoard());
});

// Route to reveal a cell
app.post('/api/reveal-cell', (req: Request, res: Response) => {
    const { x, y } = req.body;
    if (!minesweeper) return res.status(400).json({ message: 'Game not started' });
    minesweeper.revealCell(x, y);
    const gameOver = minesweeper.isGameOver(x, y);
    const win = minesweeper.isGameWon();
    res.json({ board: minesweeper.getBoard(), gameOver, win });
});

// Route to place a flag
app.post('/api/place-flag', (req: Request, res: Response) => {
    const { x, y } = req.body;
    if (!minesweeper) return res.status(400).json({ message: 'Game not started' });
    minesweeper.flagPlace(x, y);
    res.json({ board: minesweeper.getBoard(), remainFlagNum: minesweeper.getRemainFlagNum() });
    // res.json({ message: 'Flag placed successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Minesweeper server running at http://localhost:${PORT}`);
});