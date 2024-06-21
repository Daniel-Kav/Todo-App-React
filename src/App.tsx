import TodoList from "./components/TodoList";
import "./App.scss";
import { useState } from "react";

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
