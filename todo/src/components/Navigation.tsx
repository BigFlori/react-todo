import { AppBar, Box, Container, IconButton, Typography } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";

const Navigation: React.FC = () => {
  return (
    <AppBar position='static'>
      <Container
        maxWidth='xl'
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='h5' fontWeight='700'>
          Todo Demo App
        </Typography>
        <Box display='flex' gap={1}>
          <IconButton target="_blank" href="https://github.com/BigFlori">
            <GitHub />
          </IconButton>
          <IconButton target="_blank" href="https://www.linkedin.com/in/florian-molnar-2323b1252/">
            <LinkedIn />    
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navigation;
