import React, { useContext } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Button from './components/Button';
import { DataContext } from './context/store';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveCard, moveCardAnother } from './actions/ListAction';

import './App.scss';

const App = () => {
  const { store, dispatchStore } = useContext(DataContext);
  const { lists, listIds } = store;
  const onDragEnd = (result) => {
    if (!result.destination) return null;
    if (result.source.droppableId === result.destination.droppableId)
      return dispatchStore(moveCard(result.source.droppableId, result.draggableId, result.destination.index, result.source.index));
    else {
      return dispatchStore(moveCardAnother(result.draggableId, result.destination, result.source));
    }


  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="App">
        <Header />
        <div className="container">
          {listIds.map(id => {
            const data = lists[id]
            return <Board key={id} data={data} />
          })}
          <Button list />

        </div>
      </div>


    </DragDropContext>
  );
}

export default App;
