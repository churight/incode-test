import { useState } from "react";
import { useAppDispatch, useAppSelector} from "../app/hooks";
import { createCard, updateCard } from "../features/cards/cardsAPI";
import type {Card as CardType} from "../types/card"

type Props = {
  columnId: string;
  card?: CardType;
  onClose: () => void
};

export const CardForm = ({columnId, card, onClose}: Props) =>{
    const dispatch = useAppDispatch();
    const boardId = useAppSelector(state=>state.board.board?._id) as string;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        if (card) {
            // Edit existing card
            await dispatch(updateCard({ 
                id: card._id, 
                title,
                description
            }));
            } else {
            // Create new card
            await dispatch(createCard({
                title,
                description,
                columnId,
                boardId
            }));
            }
            
            onClose();
        };
    
    return(
        <div style={{ 
      border: '1px solid #ccc', 
      padding: 16, 
      marginBottom: 8,
      backgroundColor: '#f9f9f9'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Card title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        
        <div style={{ marginBottom: 8 }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">
            {card ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    )
}
