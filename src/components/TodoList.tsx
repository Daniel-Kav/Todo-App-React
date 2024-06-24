import { useReducer, useState, useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import todoReducer, { State } from "../Reducers/todoReducer";

// Define the types for the todo item and actions
export interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

// Define the initial state for the reducer
const initialState: State = {
  todos: [],
  filter: "ALL",
};

interface TodoListProps {
  onToggle: () => void;
}

export default function TodoList({ onToggle }: TodoListProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>("todos", []);
  const [todoDescription, setTodoDescription] = useState("");

  const { todos: todoList, filter } = state;

  useEffect(() => {
    dispatch({ type: "SET_TODOS", payload: storedTodos });
  }, []);

  useEffect(() => {
    setStoredTodos(todoList);
  }, [todoList]);

  const shownList = todoList.filter((todo) => {
    switch (filter) {
      case "COMPLETED":
        return todo.completed;
      case "ACTIVE":
        return !todo.completed;
      case "ALL":
      default:
        return true;
    }
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!todoDescription.trim()) {
      return;
    }
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      todo: todoDescription,
      completed: false,
    };
    setTodoDescription("");
    dispatch({ type: "ADD_TODO", payload: newTodo });
  }

  function handleCheck(id: string) {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  }

  function handleDelete(id: string) {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  }

  function clearHandle() {
    dispatch({ type: "CLEAR_COMPLETED" });
  }

  function filterHandle(filter: "ALL" | "COMPLETED" | "ACTIVE") {
    dispatch({ type: "SET_FILTER", payload: filter });
  }

  return (
    <div className="todo-list container">
      <div className="row space-between mb-50">
        <h1>Todo</h1>
        <button className="toggle" onClick={onToggle}>
          <img className="sun" src="images/icon-sun.svg" alt="Sun" />
          <img className="moon" src="images/icon-moon.svg" alt="Moon" />
        </button>
      </div>
      <form
        className="row todo-container input-container mb-30"
        onSubmit={handleSubmit}
      >
        <button className="check"></button>
        <input
          type="text"
          placeholder="Create A New Todo..."
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
      </form>
      <div className="todos">
        {shownList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onCheck={handleCheck}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <TodoStats
        todos={shownList}
        onClear={clearHandle}
        onFilter={filterHandle}
      />
    </div>
  );
}

interface TodoProps {
  todo: Todo;
  onCheck: (id: string) => void;
  onDelete: (id: string) => void;
}

function Todo({ todo, onCheck, onDelete }: TodoProps) {
  return (
    <div className={`${todo.completed ? "completed" : ""} todo todo-container`}>
      <div className="row">
        <button className="check" onClick={() => onCheck(todo.id)}></button>
        <p className="title">{todo.todo}</p>
      </div>
      <button className="cancel" onClick={() => onDelete(todo.id)}>
        <img src="images/icon-cross.svg" alt="Delete" />
      </button>
    </div>
  );
}

interface TodoStatsProps {
  todos: Todo[];
  onClear: () => void;
  onFilter: (filter: "ALL" | "COMPLETED" | "ACTIVE") => void;
}

function TodoStats({ todos, onClear, onFilter }: TodoStatsProps) {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "COMPLETED" | "ACTIVE">("ALL");

  function filterHandle(filter: "ALL" | "COMPLETED" | "ACTIVE") {
    onFilter(filter);
    setActiveFilter(filter);
  }

  return (
    <>
      <div className="desktop row space-between todos-stats todo-container">
        <div className="count">
          {todos.filter((todo) => !todo.completed).length} Items Left
        </div>
        <div className="filter">
          <button
            className={`${activeFilter === "ALL" ? "active" : ""}`}
            onClick={() => filterHandle("ALL")}
          >
            All
          </button>
          <button
            className={`${activeFilter === "ACTIVE" ? "active" : ""}`}
            onClick={() => filterHandle("ACTIVE")}
          >
            Active
          </button>
          <button
            className={`${activeFilter === "COMPLETED" ? "active" : ""}`}
            onClick={() => filterHandle("COMPLETED")}
          >
            Completed
          </button>
        </div>
        <button className="clear" onClick={onClear}>
          Clear Completed
        </button>
      </div>
      <div className="mobile todos-stats">
        <div className="row space-between todo-container mb-30">
          <div className="count">
            {todos.filter((todo) => !todo.completed).length} Items Left
          </div>
          <button className="clear" onClick={onClear}>
            Clear Completed
          </button>
        </div>
        <div className="filter todo-container">
          <button
            className={`${activeFilter === "ALL" ? "active" : ""}`}
            onClick={() => filterHandle("ALL")}
          >
            All
          </button>
          <button
            className={`${activeFilter === "ACTIVE" ? "active" : ""}`}
            onClick={() => filterHandle("ACTIVE")}
          >
            Active
          </button>
          <button
            className={`${activeFilter === "COMPLETED" ? "active" : ""}`}
            onClick={() => filterHandle("COMPLETED")}
          >
            Completed
          </button>
        </div>
      </div>
    </>
  );
}
