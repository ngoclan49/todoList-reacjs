// we need useState and useEffect hooks
import React, { useState, useEffect } from "react";

// icons from react icons kit
// main Icon component
import { Icon } from "react-icons-kit";

// icons themselves
import { plus } from "react-icons-kit/feather/plus";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash } from "react-icons-kit/feather/trash";

// get todos from local storage
const getTodosFromLS = () => {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Form = () => {
  // todo value state
  const [todoValue, setTodoValue] = useState("");
  // todos array of objects
  const [todos, setTodos] = useState(getTodosFromLS());
  //edit Todo
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  // form submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    // creating a ID for every todo
    const date = new Date();
    const time = date.getTime();
    // creating a todo object
    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };
    if (!isEdit) {
      // updating todos state
      setTodos([...todos, todoObject]);
      // clearing input field
    } else {
      let dataEdit = [];
      const cloneTodos = [...todos];
      const filterDataNoEdit = cloneTodos.filter((item) => item.ID !== id);
      dataEdit = [
        ...filterDataNoEdit,
        { ID: id, TodoValue: todoValue, completed: true },
      ];
      setTodos(dataEdit);
    }
    setTodoValue("");
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    const cloneTodos = [...todos];
    setTodos(cloneTodos.filter((item) => item.ID !== id));
  };

  const handleEdit = (id) => {
    const cloneTodos = [...todos];
    setIsEdit(true);
    setId(id);
    const filterData = cloneTodos.filter((item) => item.ID === id);
    setTodoValue(filterData[0].TodoValue);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]); // useEffect will run whenever our todos state changes

  return (
    <>
      {/* form component */}
      <div className="form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-and-button">
            <input
              type="text"
              placeholder="Add an Item"
              required
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
            />
            <div className="button">
              <button type="submit">
                {!isEdit ? <Icon icon={plus} size={20} /> : <span>OK</span>}
              </button>
            </div>
          </div>
        </form>

        {/* start of rendering todos if we have todos.length > 0 */}
        {todos.length > 0 && (
          <>
            {todos.map((individualTodo) => (
              <div className="todo" key={individualTodo.ID}>
                {/* checkbox and value div   */}
                <div>
                  <input type="checkbox" />
                  <span>{individualTodo.TodoValue}</span>
                </div>

                {/* edit and delete icon div */}
                <div className="edit-and-delete">
                  <div
                    onClick={() => {
                      handleEdit(individualTodo.ID);
                    }}
                    style={{ marginRight: 7 + "px" }}
                  >
                    <Icon icon={edit2} size={18} />
                  </div>
                  <div
                    onClick={() => {
                      handleDelete(individualTodo.ID);
                    }}
                  >
                    <Icon icon={trash} size={18} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* end of form component */}
    </>
  );
};
