import React from "https://esm.sh/react@19?development";
import ReactDOMClient from "https://esm.sh/react-dom@19/client/?development";

import {
HashRouter,
Routes,
Route,
Link,
useNavigate } from
"https://esm.sh/react-router@7";

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
CardActionArea } from
"https://esm.sh/@mui/material@5";

// https://v5.mui.com/material-ui/material-icons/
import MenuIcon from "https://esm.sh/@mui/icons-material/Menu";
import AddIcon from "https://esm.sh/@mui/icons-material/Add";

function OurItemElement(props) {
  const navigate = useNavigate();
  return /*#__PURE__*/(
    React.createElement(Card, { variant: "outlined", sx: { maxWidth: 360 } }, /*#__PURE__*/
    React.createElement(CardActionArea, {
      onClick: () => {
        navigate("/cat");
      } }, /*#__PURE__*/

    React.createElement(CardMedia, {
      component: "img",
      height: "194",
      image: props.image,
      alt: props.alt }), /*#__PURE__*/

    React.createElement(CardContent, null, /*#__PURE__*/
    React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "div" },
    props.title), /*#__PURE__*/

    React.createElement(Typography, { variant: "body2", color: "text.secondary" },
    props.text)))));





}

function CatPage(props) {
  return /*#__PURE__*/(
    React.createElement(OurItemElement, {
      image: "https://github.com/davel/davel.github.io/blob/master/IMG_2339.JPG?raw=true",
      title: "Manx cat",
      alt: "A Manx cat",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }));


}

function MainScreen(props) {
  return /*#__PURE__*/(
    React.createElement(Box, { sx: { flexGrow: 1 } }, /*#__PURE__*/
    React.createElement(AppBar, { position: "static" }, /*#__PURE__*/
    React.createElement(Toolbar, null, /*#__PURE__*/
    React.createElement(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1 } }, "Our app"))), /*#__PURE__*/




    React.createElement(Box, null, /*#__PURE__*/
    React.createElement(ButtonGroup, { "aria-label": "Basic button group", variant: "contained" }, /*#__PURE__*/
    React.createElement(Button, null, "One"), /*#__PURE__*/
    React.createElement(Button, null, "Two"), /*#__PURE__*/
    React.createElement(Button, null, "Three")), /*#__PURE__*/

    React.createElement(Stack, null, /*#__PURE__*/
    React.createElement(OurItemElement, {
      image: "https://github.com/davel/davel.github.io/blob/master/IMG_2339.JPG?raw=true",
      title: "Manx cat",
      alt: "A Manx cat",
      text: "Manx cats have no tail but do not seem to be mind." })))));





}

function App(props) {
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(CssBaseline, null), /*#__PURE__*/
    React.createElement(HashRouter, null, /*#__PURE__*/
    React.createElement(Routes, null, /*#__PURE__*/
    React.createElement(Route, { index: true, element: /*#__PURE__*/React.createElement(MainScreen, null) }), /*#__PURE__*/
    React.createElement(Route, { path: "/cat", element: /*#__PURE__*/React.createElement(CatPage, null) })))));




}

ReactDOMClient.createRoot(document.getElementById("app")).render( /*#__PURE__*/React.createElement(App, null));