import TodoList from "./components/TodoList";
import "./App.scss";
import { useState } from "react";
// import { Todo } from "./components/TodoList";

// let initialTodos: Todo[] = [
//   { id: "1", todo: "Buy groceries", completed: false },
//   { id: "2", todo: "Clean the house", completed: false },
//   { id: "3", todo: "Prepare dinner", completed: false },
//   { id: "4", todo: "Read a book", completed: false },
// ];

export default function App() {
  const [theme, setTheme] = useState(true); // true for dark theme false for light theme

  function toggleHandler() {
    setTheme(!theme);
  }

  return (
    <div className={`${theme ? "dark" : "light"} app`}>
      <div className="background-image"></div>
      <TodoList  onToggle={toggleHandler} />
    </div>
  );
}
