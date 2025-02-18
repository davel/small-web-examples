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
  Paper
} from "https://esm.sh/@mui/material@5";

function Welcome(props) {
  return (
    <Stack>
      <Typography variant="h3">Welcome to React</Typography>

      <TextField
        label="Our text"
        variant="filled"
        value={props.message}
        onChange={props.handleChange}
      />
      <Switch
        label="Our switch"
        value={props.anOption}
        onChange={props.handleOptionChange}
      />
      <Paper>
        <Typography variant="body1">
          {props.message} {props.anOption.toString()}
        </Typography>

        <Typography variant="body2">
          {props.message} {props.anOption.toString()}
        </Typography>
      </Paper>
    </Stack>
  );
}

const App = () => {
  const [text, setText] = React.useState("Hello");
  const [anOption, setOption] = React.useState(true);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleOptionChange = (e) => {
    setOption(!anOption);
  };
  return (
    <div>
      <Welcome
        message={text}
        handleChange={handleChange}
        anOption={anOption}
        handleOptionChange={handleOptionChange}
      />
    </div>
  );
};

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);
