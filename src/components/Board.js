import React from 'react';
import BoardTitle from './BoardTitle';
import Card from './Card';
import Button from './Button';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/Board.scss';
import menu from '../assets/menu.svg';
const Board = ({ data }) => {
    return (
        <Droppable droppableId={data.id}>
            {(provided) => (
                <div
                    className="board"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <div className="board__title">
                        <BoardTitle id={data.id} title={data.title} />
                        <div className="menu">
                            <img src={menu} alt="menu" />
                        </div>
                    </div>

                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {data.cards.map((card, index) =>
                            <Card index={index} key={card.id} idBoard={data.id} item={card} />
                        )}
                        {provided.placeholder}
                    </div>

                    <Button idList={data.id} />
                </div>
            )}

        </Droppable>
    )
}

export default Board;