import React from 'react';
import styles from './style.css';

const Todo = (props) => {
    return(
        <div className="list-wrapper">
            <div className="name">
                <p>{props.name}</p>
            </div>

            <div className="items">
                <p>item 1</p>
                <p>item 2</p>
                <p>item 3</p>
            </div>
        </div>
    );
}

export default Todo;