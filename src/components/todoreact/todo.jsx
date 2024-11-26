import React, { useState, useEffect } from 'react';
import "./style.css";

// reterive data from localStorage
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        // data will be in string form, parse converts it into an array
        return JSON.parse(lists)
    }
    else {
        return [];
    }
}

const Todolist = () => {
    const [inputData, setInputData] = useState("");

    // state to store current and prev input
    const [items, setItems] = useState(getLocalData());

    // Functionality for editing items
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);



    // Add the items function
    const addItem = () => {
        if (!inputData) {
            alert("Please Add the Items")
        } else if (inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputData }
                    }
                    return curElem;
                })
            )
            setInputData("")
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            // spread operator and creating unique id for each item added
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    // Edit item
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true);
    };

    // Delete single item
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItems);
    }


    // Remove all items
    const removeAll = () => {
        setItems([]);
    }


    // store data in localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input className='form-control' type="text"
                            placeholder='✍ Add Item' value={inputData}
                            onChange={(event) => setInputData((event.target.value))} />

                        {/* add item */}
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                    </div>

                    {/* show items */}
                    <div className="showItems">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        {/* edit item */}
                                        <i className="far fa-edit add-btn"
                                            onClick={() => editItem(curElem.id)}></i>
                                        {/* Delete Single Item */}
                                        <i className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All"
                            onClick={removeAll}>
                            <span>CHECK LIST</span></button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Todolist
