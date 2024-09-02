import { useState, useEffect } from "react";
import "./components/Todo.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingInput, setEditingInput] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      console.log("Loaded tasks from localStorage:", savedTasks);
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      console.log("Saving tasks to localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setEditingInput(tasks[index]);
  };

  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editingInput : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingInput("");
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingInput}
                  onChange={(e) => setEditingInput(e.target.value)}
                />
                <button className="save-button" onClick={() => saveTask(index)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button className="edit-button" onClick={() => editTask(index)}>
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
