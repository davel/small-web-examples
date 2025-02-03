import React from "https://esm.sh/react@19?development";
import ReactDOMClient from "https://esm.sh/react-dom@19/client/?development";

function Welcome(props) {
  return /*#__PURE__*/(
    React.createElement("section", null, /*#__PURE__*/
    React.createElement("h1", null, "Welcome to React"), /*#__PURE__*/
    React.createElement("p", null, props.message)));


}

const App = () => {
  // The names "text" and "setText" are not important. You can use other names.
  const [text, setText] = React.useState("Hello");

  // The name "handleChange" is also not important, you can use something else provided you are consistent.
  const handleChange = e => {
    setText(e.target.value);
  };
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("label", null, /*#__PURE__*/
    React.createElement("input", { type: "text", value: text, onChange: handleChange }), "Our button"), /*#__PURE__*/


    React.createElement(Welcome, { message: text })));


};

ReactDOMClient.createRoot(document.getElementById("app")).render( /*#__PURE__*/React.createElement(App, null));