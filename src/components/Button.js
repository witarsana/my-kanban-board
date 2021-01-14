import React, { useState, useContext } from 'react';

import { DataContext } from '../context/store';
import { addCard, addList } from '../actions/ListAction';

import '../styles/Button.scss';

import Textarea from 'react-textarea-autosize'
import cancel from '../assets/cancel.svg';

const Button = ({ list, idList }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const { dispatchStore } = useContext(DataContext);
    const openForm = () => {
        setOpen(true);
    }
    const closeForm = () => {
        setOpen(false);
    }
    const changeHandler = (e) => {
        setText(e.target.value);
    }
    const save = () => {
        if (!text) return null;
        if (list) {
            dispatchStore(addList(text));
            return closeForm();
        }
        dispatchStore(addCard(idList, text));
        closeForm();

    }
    const showForm = () => {
        const textButton = list ? 'Add list' : 'Add card';
        const placeholder = list ? 'Enter list title' : 'Enter card title';
        return (
            <div className='form-box'>
                <Textarea
                    onChange={changeHandler}
                    className='text-area'
                    placeholder={placeholder}
                    autoFocus
                />
                <button onClick={save} className='add'>{textButton}</button>
                <button onClick={closeForm} className='close'><img src={cancel} alt='cancel' /></button>
            </div>
        )
    }
    const showButton = () => {
        const textButton = list ? 'Add another list' : 'Add new card';
        const opacityBtn = list ? 1 : 0.5;
        const colorButton = list ? 'white' : 'inherit';
        const backgroundButton = list ? 'rgba(0, 0, 0, 0.25)' : 'inherit';
        return (
            <div
                onClick={openForm}
                className='add-btn'
                style={{
                    opacity: opacityBtn,
                    color: colorButton,
                    background: backgroundButton
                }}
            >
                + {textButton}
            </div>
        )
    }
    return open ? showForm() : showButton();
}

export default Button;