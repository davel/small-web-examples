import React from "https://esm.sh/react@19?development";
import ReactDOMClient from "https://esm.sh/react-dom@19/client/?development";

import {
  Button,
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
  CssBaseline
} from "https://esm.sh/@mui/material@5";

import MenuIcon from "https://esm.sh/@mui/icons-material/Menu";

// https://content.tfl.gov.uk/tfl-live-bus-river-bus-arrivals-api-documentation.pdf

const BusTime = (props) => {
  let wait = "Due";
  if (props.waitingTime >= 1) {
    const minutes = Math.floor(props.waitingTime / 60000);
    const seconds = Math.floor((props.waitingTime - minutes * 60000) / 1000);

    // Messy, but seconds is always positive so it works.
    if (seconds < 10) {
      wait = minutes + ":0" + seconds;
    } else {
      wait = minutes + ":" + seconds;
    }
  }
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Typography variant="body1">
              <span class="busNumber">{props.bus}</span> to {props.destination}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="body1" align="right">
              {wait}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

function readFromTFL(stopCode, setBusTimes) {
  fetch(
    "https://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?StopCode1=" +
      stopCode +
      "&ReturnList=DestinationName,LineName,EstimatedTime",
    { mode: "cors" }
  ).then((response) => {
    response.text().then((t) => {
      const lines = t.split("\n");
      const b = [];
      for (const line of lines) {
        const data = JSON.parse(line);
        if (data[0] === 1) {
          b.push({
            number: data[1],
            destination: data[2],
            eta: data[3]
          });
        }
      }

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
      setBusTimes(b.toSorted((a, b) => a.eta - b.eta));
    });
  });
}

function BusTimesForStop(props) {
  const [busTimes, setBusTimes] = React.useState([]);
  const [epochTime, setEpochTime] = React.useState(Date.now());

  // https://react.dev/reference/react/useEffect
  React.useEffect(() => {
    readFromTFL(props.stopCode, setBusTimes);
    const reloadData = setInterval(() => {
      console.log("reloading!");
      readFromTFL(props.stopCode, setBusTimes);
    }, 60000);

    const updateTime = setInterval(() => {
      setEpochTime(Date.now());
    }, 1000);

    // useEffect wants us to tell it what to do if this component is removed.
    return () => {
      clearInterval(reloadData);
      clearInterval(updateTime);
    };
    // useEffects wants us to tell it what data we used.
  }, [props.stopCode]);

  const items = busTimes.map((bus) => (
    <BusTime
      bus={bus.number}
      destination={bus.destination}
      waitingTime={bus.eta - epochTime}
    />
  ));

  return (
    <>
      <Stack sx={{ my: 2 }}>{items}</Stack>
    </>
  );
}

const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Barnes station bus times
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <BusTimesForStop stopCode={72331} />
      </Container>
    </>
  );
};

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
