import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    console.log(process.env.NODE_ENV);
    console.log(process.env.CHECK_STATE_URL);
    console.log(process.env.REACT_APP_TEST);

    return <h1>Hello World</h1>;
}

export default App;
