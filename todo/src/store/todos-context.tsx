import React, { useEffect, useState } from "react";
import Todo from "../models/todo";

type TodosContextObject = {
  items: Todo[];
  toggleTodo: (id: string) => void;
  addTodo: (title: string, description: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, title: string, description: string) => void;
};

export const TodosContext = React.createContext<TodosContextObject>({
  items: [],
  toggleTodo: (id: string) => {},
  addTodo: (title: string, description: string) => {},
  removeTodo: (id: string) => {},
  editTodo: (id: string, title: string, description: string) => {},
});

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const toggleTodo = (id: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex] = {
      ...newTodos[todoIndex],
      done: !newTodos[todoIndex].done,
    };
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const addTodo = (title: string, description: string) => {
    const newTodo = new Todo(title, description, false);
    setTodos((prevTodos) => {
      localStorage.setItem("todos", JSON.stringify(prevTodos.concat(newTodo)));
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => {
      localStorage.setItem(
        "todos",
        JSON.stringify(prevTodos.filter((todo) => todo.id !== id))
      );
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const editTodo = (id: string, title: string, description: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex] = {
      ...newTodos[todoIndex],
      title: title,
      description: description,
    };
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const contextValue: TodosContextObject = {
    items: todos,
    toggleTodo: toggleTodo,
    addTodo: addTodo,
    removeTodo: removeTodo,
    editTodo: editTodo,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
