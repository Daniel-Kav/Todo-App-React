// import TodoList from "./TodoList";
import "./styles.css";
import { useState } from "react";
let initialTodos = [
  { id: 1, todo: "Complete Online Javascript Course", completed: true },
  { id: 2, todo: "Jog around the park 3x", completed: false },
  { id: 3, todo: "10 minutes meditation", completed: false },
  { id: 4, todo: "Read for 1 hour", completed: false },
  { id: 5, todo: "Pick up grodceries", completed: false },
  { id: 6, todo: "Complete todo app on frontend mentor", completed: false },
];
export default function App() {
  const [theme, setTheme] = useState(true); // true for dark theme false for light theme
  function toggleHandler() {
    setTheme(!theme);
  }
  return (
    <div className={`${theme ? "dark" : "light"} app`}>
      <div className="background-image"></div>
      <TodoList todos={initialTodos} onToggle={toggleHandler} />
    </div>
  );
}
