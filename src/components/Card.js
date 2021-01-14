import React, { useState, useContext } from 'react';
import cancel from '../assets/cancel.svg';
import '../styles/Card.scss';
import { deleteCard, editCard } from '../actions/ListAction';
import { DataContext } from '../context/store';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Card = ({ idBoard, item, index }) => {
    const [text, setText] = useState(item.title);
    const [edit, setEdit] = useState(false);
    const { dispatchStore } = useContext(DataContext);
    const isEdit = () => {
        setEdit(true);
    }
    const closeInput = () => {
        dispatchStore(editCard(idBoard, item.id, text));
        setEdit(false);
    }
    const delCard = () => {
        dispatchStore(deleteCard(idBoard, item.id));
    }
    const handleChange = e => {
        setText(e.target.value);
    }

    return (
        <Draggable index={index} draggableId={item.id}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    className="card-list"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {edit ?
                        (
                            <form onSubmit={closeInput}>
                                <input
                                    autoFocus
                                    type="text"
                                    value={text}
                                    onBlur={closeInput}
                                    onChange={handleChange}
                                />
                            </form>
                        ) : (
                            <div className="card-list__text">
                                <p onClick={isEdit}>{item.title}</p>
                                <img onClick={delCard} src={cancel} alt="delete" />
                            </div>

                        )
                    }
                </div>
            )}

        </Draggable>

    )
}

export default Card;