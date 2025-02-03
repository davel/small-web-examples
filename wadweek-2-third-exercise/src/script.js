import React from "https://esm.sh/react@19?development";
import ReactDOMClient from "https://esm.sh/react-dom@19/client/?development";

function Welcome(props) {
  return (
    <section>
      <h1>Welcome to React</h1>
      <p>{props.message}</p>
    </section>
  );
}

const App = () => {
  // The names "text" and "setText" are not important. You can use other names.
  const [text, setText] = React.useState("Hello");

  // The name "handleChange" is also not important, you can use something else provided you are consistent.
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div>
      <label>
        <input type="text" value={text} onChange={handleChange} />
        Our button
      </label>
      <Welcome message={text} />
    </div>
  );
};

ReactDOMClient.createRoot(document.getElementById("app")).render(<App />);