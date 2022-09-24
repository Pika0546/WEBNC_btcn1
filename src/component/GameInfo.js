import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import MoveList from './MoveList';
import { keyToIcon } from '../utilities';
import GameSetting from './GameSetting';

export default class GameInfo extends Component {
	render() {
		const {
			winSquares,
			moves,
			boardSize,
			players,
			sortMoves,
			isAsc,
			jumpTo,
			turn,
			changeBoardSize,
			selectedMove
		} = this.props;
		const status = (() => {
			if (winSquares) {
				return (
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						spacing={1}
						sx={{
							fontSize: "1.2rem"
						}}
					>
						{keyToIcon(players[(!turn) << 0].key)}
						<Box>
							đã thắng
						</Box>
					</Stack>
				)
			}
			else if (moves.length === boardSize * boardSize) {
				return (
					<Box
						sx={{
							fontSize: "1.2rem"
						}}>
						đã thắng
					</Box>
				)
			}
			else {
				return (
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						spacing={1}
						sx={{
							fontSize: "1.2rem"
						}}
					>
						<Box>
							Lượt của
						</Box>
						{keyToIcon(players[turn].key)}
					</Stack>
				)
			}
		})();
		return (
			<Box
				sx={{
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: "column",
					alignSelf: 'stretch',
					width: "230px",
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
						marginBottom: "1rem",
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
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography component="p"
							sx={{
								fontWeight: "bold"
							}}
						> Danh sách nước đi </Typography>
						<IconButton
							sx={{
								marginLeft: "0.5rem",
							}}
							onClick={sortMoves}
						>
							<ArrowUpwardIcon
								sx={{
									transition: ".2s",
									...(!isAsc && { transform: "rotate(180deg)" })
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
								moves={moves}
								itemClick={jumpTo}
								isAsc={isAsc}
								selectedMove={selectedMove}
							></MoveList>
						</Box>
					</Box>

				</Paper>
				<GameSetting applySetting={changeBoardSize}></GameSetting>
			</Box>
		)
	}
}
