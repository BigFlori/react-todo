import React, { Fragment, useMemo, useContext } from "react";
import List from "@mui/material/List";
import TodoItem from "./TodoItem";
import {
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { TodosContext } from "../store/todos-context";
import AddTodo from "./AddTodo";

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  const undoneItems = useMemo(
    () => todosCtx.items.filter((item) => !item.done),
    [todosCtx.items]
  );
  const doneItems = useMemo(
    () => todosCtx.items.filter((item) => item.done),
    [todosCtx.items]
  );

  const undoneTodos = undoneItems.map((item, index) => (
    <Fragment key={index}>
      <TodoItem
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        done={item.done}
        toggleDone={() => todosCtx.toggleTodo(item.id)}
        removeTodo={() => todosCtx.removeTodo(item.id)}
      />
      {index != undoneItems.length - 1 && undoneItems.length > 1 && (
        <Divider key={index} variant='fullWidth' />
      )}
    </Fragment>
  ));

  const doneTodos = doneItems.map((item, index) => (
    <Fragment key={index}>
      <TodoItem
        key={item.id}
        title={item.title}
        description={item.description}
        done={item.done}
        toggleDone={() => todosCtx.toggleTodo(item.id)}
        removeTodo={() => todosCtx.removeTodo(item.id)}
      />
      {index != doneItems.length - 1 && doneItems.length > 1 && (
        <Divider key={index} variant='fullWidth' />
      )}
    </Fragment>
  ));

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography variant='h6'>Teendők</Typography>
        <AddTodo />
      </Box>
      <List sx={{ maxHeight: "310px", overflowY: "auto" }}>
        {undoneItems.length !== 0 ? (
          undoneTodos
        ) : (
          <Typography display='flex' justifyContent='center'>
            Nincs teendő. Adj hozzá újat!
          </Typography>
        )}
      </List>
      {doneItems.length !== 0 && (
        <Fragment>
          <Typography variant='h6' marginBottom={1} marginTop={2}>
            Kész
          </Typography>
          <List sx={{ maxHeight: "310px", overflowY: "auto" }}>
            {doneTodos}
          </List>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Todos;
