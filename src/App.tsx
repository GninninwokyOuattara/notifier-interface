import React from "react";
import logo from "./logo.svg";
import "./App.css";
import useBot from "./Hooks/useBot";

function App() {
    console.log(process.env.NODE_ENV);
    console.log(process.env.REACT_APP_CHECK_STATE_URL);
    console.log(process.env.REACT_APP_START_BOT_URL);

    const [isRunning, setIsrunning] = useBot();
    console.log(isRunning);

    return <h1>Hello World</h1>;
}

export default App;
