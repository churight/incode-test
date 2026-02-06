import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchBoardByHash, createBoard } from "../features/board/boardSlice";

export const BoardLoader = () => {
    const [boardId, setBoardId] = useState('');
    const [boardName, setBoardName] = useState('');
    const dispatch = useAppDispatch();
    
    return (
        <>
            <div>
                <input
                    placeholder="Enter board ID"
                    value={boardId}
                    onChange={e => setBoardId(e.target.value)}
                />
                <button onClick={() => dispatch(fetchBoardByHash(boardId))}>
                    Load Board
                </button>
            </div>
            
            <div>
                <input
                    placeholder="New board name"
                    value={boardName}
                    onChange={e => setBoardName(e.target.value)}
                />
                <button onClick={() => dispatch(createBoard({ name: boardName }))}>
                    Create Board
                </button>
            </div>
        </>
    );
};