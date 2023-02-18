import React, { useMemo } from "react";
import Todos from "./components/Todos";
import { useMediaQuery, Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./themes/darkTheme";
import { lightTheme } from "./themes/lightTheme";
import TodosContextProvider from "./store/todos-context";
import Navigation from "./components/Navigation";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <TodosContextProvider>
        <CssBaseline />
        <Navigation />
        <Container
          maxWidth='sm'
          sx={{
            bgcolor: "background.paper",
            padding: "12px",
            boxShadow: theme.shadows[5],
            borderRadius: {
              sm: theme.shape.borderRadius,
            },
            marginTop: 5,
          }}
        >
          <Todos />
        </Container>
      </TodosContextProvider>
    </ThemeProvider>
  );
}
