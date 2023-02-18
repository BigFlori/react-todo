import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { TodosContext } from "../store/todos-context";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 230,
  maxWidth: 400,
  width: "95%",
  bgcolor: "background.paper",
  borderRadius: 2,
  border: 0,
  boxShadow: 24,
  p: 4,
};

type TodoManagerModalProps = {
  open: boolean;
  handleClose: () => void;
  mode: "add" | "edit";
  id?: string;
  title?: string;
  description?: string;
};

const TodoManagerModal: React.FC<TodoManagerModalProps> = (props) => {
  const todosCtx = useContext(TodosContext);

  const [isValidated, setIsValidated] = useState(true);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (titleRef.current!.value.trim().length === 0) {
      setIsValidated(false);
      return;
    }

    if (props.mode === "add") {
      todosCtx.addTodo(titleRef.current!.value, descriptionRef.current!.value);
    } else {
      todosCtx.editTodo(
        props.id!,
        titleRef.current!.value,
        descriptionRef.current!.value
      );
    }
    props.handleClose();
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography marginBottom={2}>
            {props.mode === "add"
              ? "Új teendő hozzáadása"
              : "Teendő szerkesztése"}
          </Typography>
          <form onSubmit={handleSubmit} noValidate autoComplete='off'>
            <TextField
              label='Teendő'
              variant='standard'
              inputProps={{ defaultValue: props.title }}
              fullWidth
              required
              error={!isValidated}
              helperText={!isValidated && "A teendő címe nem lehet üres!"}
              onChange={() => setIsValidated(true)}
              inputRef={titleRef}
            />
            <TextField
              label='Leírás'
              variant='standard'
              inputProps={{ defaultValue: props.description }}
              fullWidth
              sx={{ mt: 2 }}
              inputRef={descriptionRef}
            />
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                type='button'
                fullWidth
                variant='outlined'
                color='error'
                onClick={props.handleClose}
              >
                Mégse
              </Button>
              <Button type='submit' fullWidth variant='contained'>
                {props.mode === "add" ? "Hozzáadás" : "Mentés"}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TodoManagerModal;
