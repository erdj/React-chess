import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';
import TunesHistory from '../models/TunesHistory';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  tunesHistory: TunesHistory;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  tunesHistory,
}: BoardProps) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      // tunesHistory.addTune(board);
      console.log(tunesHistory);

      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  // function undoHandler() {
  //   const newBoard = tunesHistory.undo(board);

  //   if (newBoard) {
  //     setBoard(newBoard);
  //   }
  //   console.log(tunesHistory);
  // }

  // function redoHandler() {
  //   const newBoard = tunesHistory.redo();
  //   if (newBoard) {
  //     setBoard(newBoard);
  //   }
  //   console.log(tunesHistory);
  // }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div>
        {/* <button onClick={undoHandler}>Undo</button>
        <button onClick={redoHandler}>Redo</button> */}
      </div>
    </div>
  );
};

export default BoardComponent;
