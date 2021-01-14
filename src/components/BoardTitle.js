import React, { useState, useContext } from 'react';
import { DataContext } from '../context/store';
import { changeTitle } from '../actions/ListAction';

import '../styles/BoardTitle.scss';

const BoardTitle = ({ title, id }) => {
    const { dispatchStore } = useContext(DataContext);
    const [text, setText] = useState(title);
    const [open, setOpen] = useState(false);
    const change = (e) => {
        setText(e.target.value);
    }
    const openInput = () => {
        setOpen(true);
    }
    const closeInput = () => {
        setOpen(false);
    }
    const submit = (e) => {
        e.preventDefault();
        dispatchStore(changeTitle(id, text));
        closeInput();
    }
    return (
        <div className="board-title">
            {open ? (
                <form onSubmit={submit}>
                    <input
                        autoFocus
                        value={text}
                        type="text"
                        onChange={change}
                        onBlur={submit}
                    />
                </form>
            ) : (
                    <h3 onClick={openInput}>{title}</h3>
                )
            }

        </div>
    )
}

export default BoardTitle;