import React from "https://esm.sh/react@19?development";
import ReactDOMClient from "https://esm.sh/react-dom@19/client/?development";

import {
  HashRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "https://esm.sh/react-router@7";

// https://v5.mui.com/material-ui/all-components/
import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  Switch,
  Stack,
  Paper,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Container,
  CssBaseline,
  CardMedia,
  CardActionArea
} from "https://esm.sh/@mui/material@5";

// https://v5.mui.com/material-ui/material-icons/
import MenuIcon from "https://esm.sh/@mui/icons-material/Menu";
import AddIcon from "https://esm.sh/@mui/icons-material/Add";

function OurItemElement(props) {
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <CardActionArea
        onClick={() => {
          navigate("/cat");
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={props.image}
          alt={props.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function CatPage(props) {
  return (
    <OurItemElement
      image="https://github.com/davel/davel.github.io/blob/master/IMG_2339.JPG?raw=true"
      title="Manx cat"
      alt="A Manx cat"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    />
  );
}

function MainScreen(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Our app
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <ButtonGroup aria-label="Basic button group" variant="contained">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <Stack>
          <OurItemElement
            image="https://github.com/davel/davel.github.io/blob/master/IMG_2339.JPG?raw=true"
            title="Manx cat"
            alt="A Manx cat"
            text="Manx cats have no tail but do not seem to be mind."
          />
        </Stack>
      </Box>
    </Box>
  );
}

function App(props) {
  return (
    <>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route index element={<MainScreen />} />
          <Route path="/cat" element={<CatPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
