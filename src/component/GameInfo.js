import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import MoveList from './MoveList';

export default class GameInfo extends Component {
	render() {
		const {
			winSquares,
			moves,
			boardSize,
			players,
			sortMoves,
			isAsc,
			displayMoves,
			jumpTo,
			turn,
		} = this.props;
		const status = (() => {
			if (winSquares) {
				return `${players[turn].name}(${players[turn].key}) đã thắng!!!`
			}
			else if (moves.length === boardSize * boardSize) {
				return "HÒA!!!";
			}
			else {
				return `Lượt của: ${players[turn].name}(${players[turn].key})`
			}
		})();
		return (
			<Box
				sx={{
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: "column",
					alignSelf: 'stretch',
					width: "200px",
				}}
			>
				<Box
					sx={{
						textAlign: "center"
					}}
				>{status}</Box>
				<Paper
					sx={{
						flex: "1 1 auto",
						marginTop: "1rem",
						display: "flex",
						flexDirection: "column",
					}}
					variant="outlined"
				>
					<Box
						sx={{
							borderBottom: "1px solid #d2d2d2",
							padding: "0.5rem",
							display: "flex",
							flexDirection: "row",
							alignItems:"center",
							justifyContent:"center",
						}}
					>
						Danh sách lượt
						<IconButton
							sx={{
								marginLeft: "0.5rem",
							}}
							onClick={sortMoves}
						>
							<ArrowUpwardIcon
								sx={{
									transition: ".2s",
									...(!isAsc && {transform: "rotate(180deg)"})
								}}
							></ArrowUpwardIcon>
						</IconButton>
					</Box>
					<Box
						sx={{
							flex: "1 1 auto",
							position: "relative",
							
						}}
					>
						<Box
							sx={{
								position: "absolute",
								width: "100%",
								height: "100%",
								overflow: "auto",
							}}
						>
							<MoveList
								moves={displayMoves}
								itemClick={jumpTo}
								isAsc={isAsc}
							></MoveList>
						</Box>
					</Box>

				</Paper>
			</Box>
		)
	}
}
