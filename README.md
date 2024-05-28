# Minesweeper Game

This is a Minesweeper game implemented in React and TypeScript. The game allows users to play the classic Minesweeper game in their browser. The project is designed to be a fun way to practice coding skills and learn more about React, TypeScript, and game development.

## Features

- Classic Minesweeper gameplay
- Configurable board size and number of mines
- User-friendly interface
- Flagging of suspected mines
- Win and game over conditions
- Responsive design

## Getting Started

These instructions will help you set up and run the Minesweeper game on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager)
- Yarn (optional, but recommended)

### Installation

Install the dependencies using Yarn:

```
yarn install
```

### Running the Game

To start the game, run the following command:

```
yarn start
```

### Project Structure

- src/components: Contains React components for the game such as Board, Cell, Dashboard, and Modal.
- src/model: Contains the Minesweeper class that manages the game logic.
- src/utils: Contains utility functions like createBoard and reveal.
- src/css: Contains CSS files for styling the components.

### How to Play
- Select a board size and number of mines.
- Click on a cell to reveal it.
- Right-click (or long press on mobile) to flag a cell as a suspected mine.
- The game ends when all non-mine cells are revealed or a mine is clicked.
- You win the game by revealing all non-mine cells without clicking on any mines.

