import React, { Component } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { isEqualSquare } from '../utilities';
export default class MoveList extends Component {
    render() {
        const { moves, itemClick, isAsc, selectedMove } = this.props;
        const arr = [...moves];
        arr.sort((a, b) => {
            if (isAsc) {
                return a.index - b.index;
            }
            return b.index - a.index;
        });
        if(!arr.length){
            return (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => { itemClick(null) }}
                            sx={{
                                ...(selectedMove === null && {fontWeight: "bold"})
                            }}
                        >
                            Trở về lúc bắt đầu!
                        </ListItemButton>
                    </ListItem>
                </List>
            )
        }
        return (
            <ol>
                {arr.map((item) => {
                    return (
                        <React.Fragment key={`${item.row}-${item.col}`}>
                            {isAsc && item.index === 0 && (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => { itemClick(null) }}
                                        sx={{
                                            ...(selectedMove === null && {fontWeight: "bold"})
                                        }}
                                    >
                                        Trở về lúc bắt đầu!
                                    </ListItemButton>
                                </ListItem>
                            )}
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => itemClick(item)}
                                    sx={{
                                        ...(selectedMove && isEqualSquare(selectedMove, item) && {fontWeight: "bold"})
                                    }}
                                >
                                    Trở về lượt {`#${item.index + 1} (${item.row}, ${item.col}, ${item.value})`}
                                </ListItemButton>
                            </ListItem>
                            {!isAsc && item.index === 0 && (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => { itemClick(null) }}
                                        sx={{
                                            ...(selectedMove === null && {fontWeight: "bold"})
                                        }}
                                    >
                                        Trở về lúc bắt đầu!
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </React.Fragment>
                    )
                })}
            </ol>
        )
    }
}
