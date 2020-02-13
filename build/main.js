import React from "react";
import ReactDOM from "react-dom";

var App = function App() {
  return React.createElement("p", null, "Hello");
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));