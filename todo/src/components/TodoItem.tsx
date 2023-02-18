import { IconButton, ListItemText, Tooltip } from "@mui/material";
import { Delete, Check, Edit, DoneAll } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import { Fragment, useState } from "react";
import TodoManagerModal from "./TodoManagerModal";

type TodoItemProps = {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  toggleDone: () => void;
  removeTodo: () => void;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!props.done) {
    //Kész teendő
    return (
      <Fragment>
        <ListItem sx={{ bgcolor: "background.list" }}>
          <ListItemText primary={props.title} secondary={props.description} />
          <Tooltip title='Jelölés készként'>
            <IconButton onClick={props.toggleDone}>
              <Check fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Szerkesztés'>
            <IconButton onClick={handleOpen}>
              <Edit fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Törlés'>
            <IconButton onClick={props.removeTodo}>
              <Delete fontSize='small' />
            </IconButton>
          </Tooltip>
        </ListItem>
        <TodoManagerModal
          mode='edit'
          id={props.id}
          open={open}
          handleClose={handleClose}
          title={props.title}
          description={props.description}
        />
      </Fragment>
    );
  } else {
    //Nem kész teendő
    return (
      <ListItem sx={{ bgcolor: "background.list" }}>
        <ListItemText
          primary={props.title}
          primaryTypographyProps={{ style: { textDecoration: "line-through" } }}
          secondary={props.description}
        />
        <Tooltip title='Visszavonás'>
          <IconButton onClick={props.toggleDone}>
            <DoneAll fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Törlés'>
          <IconButton onClick={props.removeTodo}>
            <Delete fontSize='small' />
          </IconButton>
        </Tooltip>
      </ListItem>
    );
  }
};

export default TodoItem;
