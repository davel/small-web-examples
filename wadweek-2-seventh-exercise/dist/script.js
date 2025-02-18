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
Paper } from
"https://esm.sh/@mui/material@5";

function Welcome(props) {
  return /*#__PURE__*/(
    React.createElement(Stack, null, /*#__PURE__*/
    React.createElement(Typography, { variant: "h3" }, "Welcome to React"), /*#__PURE__*/

    React.createElement(TextField, {
      label: "Our text",
      variant: "filled",
      value: props.message,
      onChange: props.handleChange }), /*#__PURE__*/

    React.createElement(Switch, {
      label: "Our switch",
      value: props.anOption,
      onChange: props.handleOptionChange }), /*#__PURE__*/

    React.createElement(Paper, null, /*#__PURE__*/
    React.createElement(Typography, { variant: "body1" },
    props.message, " ", props.anOption.toString()), /*#__PURE__*/


    React.createElement(Typography, { variant: "body2" },
    props.message, " ", props.anOption.toString()))));




}

const App = () => {
  const [text, setText] = React.useState("Hello");
  const [anOption, setOption] = React.useState(true);

  const handleChange = e => {
    setText(e.target.value);
  };
  const handleOptionChange = e => {
    setOption(!anOption);
  };
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement(Welcome, {
      message: text,
      handleChange: handleChange,
      anOption: anOption,
      handleOptionChange: handleOptionChange })));



};

ReactDOMClient.createRoot(document.getElementById("app")).render( /*#__PURE__*/React.createElement(App, null));