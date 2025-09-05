import InputBox from "../InputBox/InputBox";
import "./TodoList.css";
import { MdClose } from "react-icons/md";
import useLocalStorage from "../../hooks/useLocalStorage";

const TodoList = ({ setStats }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [newTask, setNewTask] = useLocalStorage("newTask", "");

  const addTask = () => {
    if (newTask.trim() === "") return;

    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    const updatedTask = tasks.find((t) => t.id === id);
    if (updatedTask && !updatedTask.completed) {
      setStats((prev) => ({
        ...prev,
        tasksCompleted: prev.tasksCompleted + 1,
      }));
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <div className="todoList">
      <h2 className="todoHeading">ToDo List</h2>
      <div className="todoAddTask">
        <div>
          <InputBox
            className="todoTextInput"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
          />
        </div>

        <div>
          <button className="addTaskBtn" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>

      <div>
        <ul>
          {tasks.map((task) => (
            <li className="todoTasks" key={task.id}>
              <div className="todoTaskInput">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              </div>

              <div className="todoDeleteBtn">
                <button onClick={() => deleteTask(task.id)}>
                  <MdClose />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoList;
