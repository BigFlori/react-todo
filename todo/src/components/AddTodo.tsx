import { useState } from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import TodoManagerModal from "./TodoManagerModal";

const ContainedIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const AddTodo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <ContainedIconButton onClick={handleOpen}>
        <Add />
      </ContainedIconButton>
      <TodoManagerModal mode="add" open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default AddTodo;
