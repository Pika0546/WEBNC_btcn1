
import React, { Component } from 'react'
import './App.css';

import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import Board from './component/Board';
import MoveList from './component/MoveList';
import { DEFAULT_BOARD_SIZE } from './config/contants';
import { calculateWinner, convertMoveListToMatrix, createMatrix, isEqualSquare } from './utilities';
import GameInfo from './component/GameInfo';
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
			isAsc: true,
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
						index: prev.displayMoves.length,
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
		if(!step){
			this.setState(prev => ({
				...prev,
				displayMoves: [],
				board: convertMoveListToMatrix([], prev.boardSize),
				turn: 0,
			}))
		}
		else{
			this.setState(prev => {
				const index = prev.moves.findIndex(move => isEqualSquare(move, step));
				const turn = prev.players.findIndex(item => item.key === step.value);
				if(index >= 0){
					return {
						...prev,
						displayMoves: prev.moves.slice(0, index + 1),
						board: convertMoveListToMatrix(prev.moves.slice(0, index + 1), prev.boardSize),
						turn: (!turn) << 0,					
					}
				}
				return {
					...prev,
				}
			})
		}
	}

	sortMoves = () => {
		this.setState(prev => {
			return {
				...prev,
				isAsc: !prev.isAsc
			}
		})
	}

	changeBoardSize = (newSize) => {
		this.setState(prev => ({
			...prev,
			boardSize: newSize,
		}))
	}

	render() {
		const { board, players, turn, moves, displayMoves, boardSize, isAsc } = this.state;
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
		return (
			<Paper
				sx={{
					padding: 2,
				}}
			>
				<Typography component={"h3"} variant={"h4"} textAlign="center">Tic-tac-toe</Typography>
				<Stack
					direction="row"
					marginTop={2}
					spacing={2}
				>
					<Board
						board={board}
						onSquareClick={this.onSquareClick}
						winSquares={winSquares}
					/>
				
					<GameInfo
						winSquares={winSquares}
						moves={moves}
						boardSize={boardSize}
						players={players}
						sortMoves={this.sortMoves}
						isAsc={isAsc}
						displayMoves={displayMoves}
						jumpTo={this.jumpTo}
						turn={turn}
					/>
				</Stack>
			</Paper>
		)
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
					<button onClick={this.sortMoves}>sort</button>
					
					<MoveList isAsc={isAsc} moves={displayMoves} itemClick={this.jumpTo}></MoveList>
				</div>
			</div>
		)
	}
}