import { useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = ({ todo, dispatch, completedTodos, setCompletedTodos }) => {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;

    const toggleItem = useCallback(() => {
        if (!completed) {
            setCompletedTodos((prevTodos) => {
                if (prevTodos.length === 3) {
                    prevTodos.pop()
                }
                prevTodos.unshift(id)
                return prevTodos;
            })
            dispatch({ type: TOGGLE_ITEM, payload: { id, completedAt: new Date() } })
        }
        else {
            setCompletedTodos((prevTodos) => {
                const ind = prevTodos.findIndex(todoItem => todoItem === id)
                if (ind !== -1) {
                    prevTodos.splice(ind, 1);
                }
                return prevTodos;
            })
            dispatch({ type: TOGGLE_ITEM, payload: { id, completedAt: null } })
        }
    }, [dispatch, completed, id]);

    const removeItem = useCallback(() => dispatch({ type: REMOVE_ITEM, payload: { id } }), [dispatch]);
    const updateItem = useCallback((id, title) => dispatch({ type: UPDATE_ITEM, payload: { id, title } }), [dispatch]);

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    const getColor = (id) => {
        if (id === completedTodos[0]) {
            return "green"
        }
        else if (id === completedTodos[1]) {
            return "magenta"
        }
        else if (id === completedTodos[2]) {
            return "yellow"
        }
        return ""
    }

    return (
        <li data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleItem} />
                        <label className={classnames("activity", { oldActivity: !todo.newActivity }, { completed: todo.completed }, getColor(id))} data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
                    </>
                )}
            </div>
        </li>
    );
};
