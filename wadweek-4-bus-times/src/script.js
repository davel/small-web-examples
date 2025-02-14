import React from "https://esm.sh/react@19?development";
import ReactDOMClient from "https://esm.sh/react-dom@19/client/?development";

// https://v5.mui.com/material-ui/all-components/
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

// https://v5.mui.com/material-ui/material-icons/
import MenuIcon from "https://esm.sh/@mui/icons-material/Menu";

// This function takes a the estimated time of a bus's arrival and the current
// time and returns a string with the time as text formatted in minutes and seconds.
function formatBusTime(estimatedEta, epochTime) {
  const waitingTime = estimatedEta - epochTime;
  if (waitingTime >= 1) {
    const minutes = Math.floor(waitingTime / 60000);
    const seconds = Math.floor((waitingTime - minutes * 60000) / 1000);

    // Messy, but seconds is always positive so it works.
    if (seconds < 10) {
      return minutes + ":0" + seconds;
    }
    return minutes + ":" + seconds;
  }
  return "Due";
}

// Function to download the bus times from TFL's service and store
// it in a React state variable.
// https://content.tfl.gov.uk/tfl-live-bus-river-bus-arrivals-api-documentation.pdf
function readFromTFL(stopCode, setBusTimes) {
  fetch(
    "https://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?StopCode1=" +
      stopCode +
      "&ReturnList=StopPointIndicator,DestinationName,LineName,EstimatedTime",
    { mode: "cors" }
  ).then((response) => {
    response.text().then((t) => {
      const lines = t.split("\n");
      const busList = [];
      for (const line of lines) {
        const data = JSON.parse(line);
        if (data[0] === 1) {
          busList.push({
            stopPoint: data[1],
            number: data[2],
            destination: data[3],
            eta: data[4]
          });
        }
      }

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
      setBusTimes(busList.toSorted((a, b) => a.eta - b.eta));
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

  // Transform an array of JavaScript objects in to an array of React elements.
  const items = busTimes.map((bus) => (
    <BusTime
      bus={bus.number}
      destination={bus.destination}
      wait={formatBusTime(bus.eta, epochTime)}
      stopPoint={bus.stopPoint}
    />
  ));

  // https://v5.mui.com/material-ui/react-stack/
  return (
    <>
      <Stack sx={{ my: 2 }}>{items}</Stack>
    </>
  );
}

// https://v5.mui.com/material-ui/react-card/
// https://v5.mui.com/material-ui/react-grid/
// https://v5.mui.com/material-ui/react-typography/
function BusTime(props) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Typography variant="body1">
              <span class="stopPoint">{props.stopPoint}</span>
              <span class="busNumber">{props.bus}</span> to {props.destination}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="body1" align="right">
              {props.wait}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function MainScreen(props) {
  // State variables and functions to handle hamburger menu.

  // "Anchor element", the element which the pop up menu is linked to.
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
          >
            <MenuItem onClick={handleClose}>Example</MenuItem>
            <MenuItem onClick={handleClose}>menu</MenuItem>
            <MenuItem onClick={handleClose}>items</MenuItem>
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
}

function App(props) {
  return (
    <>
      <CssBaseline />
      <MainScreen />
    </>
  );
}

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
