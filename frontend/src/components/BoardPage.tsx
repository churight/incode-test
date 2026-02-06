import { useAppSelector } from '../app/hooks';
import { Column } from './Column';

export const BoardPage = () => {
    const board = useAppSelector(state => state.board.board);
    const columns = useAppSelector(state => state.column.items);
    const loading = useAppSelector(state => state.board.loading);
    const error = useAppSelector(state => state.board.error);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!board) return <div>No board loaded. Use the form above to load or create one.</div>;
    if (columns.length === 0) return <div>Board has no columns yet.</div>;
    
    return (
        <div>
            <h2>{board.name}</h2>
            <div style={{ display: 'flex', gap: 16 }}>
                {columns.map(column => (
                    <Column key={column._id} column={column} />
                ))}
            </div>
        </div>
    );
};