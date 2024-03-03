import { useEffect, useState } from "react"
import "../style/global.css"
import { Block } from "./Block"


export const Board = ({ rows, cols }) => {

    const [board, setBoard] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ markedBy: -1 }))));

    const [activeCell, setActiveCell] = useState({
        i: -1,
        j: -1,
        player: -1
    })

    const checkWinner = (id) => {

        console.log(board);
        for (let i = 0; i < 3; i++) {
            let flag = true;
            for (let j = 0; j < 3; j++) {

                if (board[i][j].markedBy != id) {
                    flag = false; break;
                }
            }

            if (flag) {
                return flag
            }
        }

        // check all cols
        for (let i = 0; i < 3; i++) {
            let flag = true;
            for (let j = 0; j < 3; j++) {
                if (board[j][i].markedBy != id) {
                    flag = false; break;
                }
            }

            if (flag) return flag;
        }

        let flag = true
        for (let i = 0, j = 0; j < 3; j++, i++) {
            if (board[i][j].markedBy != id) {
                flag = false; break;
            }
        }

        if (flag) return flag;

        flag = true
        for (let i = 2, j = 0; j < 3; j++, i--) {
            if (board[i][j].markedBy != id) {
                flag = false; break;
            }
        }

        if (flag) return flag;

        return flag
    }

    useEffect(() => {
        if (activeCell.i !== -1 && activeCell.j !== -1) {
            setBoard(prevBoard => {
                return prevBoard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {

                        if (rowIndex == activeCell.i && colIndex == activeCell.j) {
                            
                            return { ...cell, markedBy: activeCell.player };
                        }
                        return cell;
                    })
                );
            });
        }
    }, [activeCell]);
    
    
    useEffect(() => {

        if (activeCell.player !== -1) {
            const result = checkWinner(activeCell.player);
            if(result)alert(activeCell.player+"Has won")
        }
    }, [board]);
    

    const [curr_player, setPlayer] = useState(true)

    return (
        <>

            <div className="board-container">
                <h2 style={{ color: (curr_player == true ? "red" : "green") }}>It's {curr_player == true ? "Player-1" : "Player-2"} move</h2>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((value, colIndex) => (
                            <Block
                                key={colIndex}
                                row={rowIndex}
                                col={colIndex}
                                curr_player={curr_player}
                                setPlayer={setPlayer}
                                setActiveCell={setActiveCell}
                                board={board}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}