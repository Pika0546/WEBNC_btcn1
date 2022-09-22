
import React, { Component } from 'react'
import './App.css';
import Board from './component/Board';
import { DEFAULT_BOARD_SIZE } from './config/contants';
import { calculateWinner, convertMoveListToMatrix, createMatrix } from './utilities';
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moves: [],
			players: [
				{
					key: "X",
					name: "Pikachu",
				},
				{
					key: "O",
					name: "Raichu",
				},
			],
			turn: 0,
			boardSize: DEFAULT_BOARD_SIZE,
			board: createMatrix(DEFAULT_BOARD_SIZE, DEFAULT_BOARD_SIZE),
			displayMoves: [],
		}
	}


	onSquareClick = (pos) => {
		this.setState((prev, props) => {
			if (!prev.board[pos.row][pos.col].length && !calculateWinner(prev.board)) {
				const newState = {
					turn: (!prev.turn) << 0,
					moves: [...prev.displayMoves, {
						...pos,
						value: prev.players[prev.turn].key,
					}],
				};
				newState.board = convertMoveListToMatrix(newState.moves, prev.boardSize);
				newState.displayMoves = [...newState.moves];
				return newState;
			}
			return prev;
		})
	}

	jumpTo = (step) => {
		if(step >= 0){
			this.setState(prev => ({
				...prev,
				displayMoves: prev.moves.slice(0, step + 1),
				board: convertMoveListToMatrix(prev.moves.slice(0, step + 1), prev.boardSize),
			}))
		}
		else{
			this.setState(prev => ({
				...prev,
				displayMoves: [],
				board: convertMoveListToMatrix([], prev.boardSize),
			}))
		}
	}

	changeBoardSize = (newSize) => {
		this.setState(prev => ({
			...prev,
			boardSize: newSize,
		}))
	}

	render() {
		const { board, players, turn, moves, displayMoves, boardSize } = this.state;
		const winSquares = calculateWinner(board);
		const status = (()=>{
			if(winSquares){
				return `Winner: ${players[turn].name}(${players[turn].key})`
			}
			else if(moves.length === boardSize*boardSize){
				return "DRAW";
			}
			else {
				return `Next player: ${players[turn].name}(${players[turn].key})` 
			}
		})();
		const renderMoves = () => {
			return moves.map((move, index) => {
				const desc = `Go to move #${index + 1} (${move.row}, ${move.col}, ${move.value})`
				return (
					<li key={`${move.row}-${move.col}`}>
						<button 
							onClick={() => this.jumpTo(index)} 
							style={{
								...(index === displayMoves.length - 1 && {fontWeight: "bold"})
							}}
						>{desc}</button>
					</li>
				);
			})
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board
						board={board}
						onSquareClick={this.onSquareClick}
						winSquares={winSquares}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>
						<li>
							<button 
								onClick={() => this.jumpTo(-1)} 
								style={{
									...(!displayMoves.length && {fontWeight: "bold"})
								}}
							>Go to game start</button>
						</li>
						{renderMoves()}
					</ol>
				</div>
			</div>
		)
	}
}