import { useState } from "react"
import "../style/global.css"

export const Block = ({ row, col, curr_player, setPlayer, setActiveCell, board }) => {

    const [blockState, setBlockState] = useState({
        player_id: -1,
        marked: false,
        color: "yellow"
    })

    const handleMove = (e) => {
        try {
            if (blockState.marked == true) {
                return;
            }

            const clickedRow = e.target.getAttribute('data-row');
            const clickedCol = e.target.getAttribute('data-col');
            setBlockState({
                player_id: curr_player == true ? 1 : 0,
                marked: true,
                color: curr_player == true ? "red" : "green",
            })

            setActiveCell({
                i: clickedRow,
                j: clickedCol,
                player: curr_player == true ? 1 : 0,
            }
            )

            // check for winner
            // let winner = checkWinner(curr_player == true ? 1 : 0)

            // if (winner) {
            //     console.log(blockState.player_id);
            // }

            setPlayer((prev) => !prev)

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            <div
                className="block"
                data-row={row}
                data-col={col}
                style={{ background: blockState.color }}
                onClick={handleMove}>

            </div>
        </>
    )
}