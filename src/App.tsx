import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useBot from "./Hooks/useBot";
import botLogo from "./img/bot.gif";

const startBot = process.env.REACT_APP_START_BOT_URL as string;
const restartBot = process.env.REACT_APP_RESTART_BOT_URL as string;

function App() {
    const [isRunning, setIsRunning] = useBot();
    const [isRestarting, setIsRestarting] = useState<Boolean>(false);

    const clickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        fetch(startBot, {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=utf-8",
            },
        })
            .then((res) => res.json())
            .then((jsondata) => {
                setIsRunning({ running: jsondata.running });
            });
    };

    const restartHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsRestarting(() => true);
        fetch(restartBot, {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=utf-8",
            },
        })
            .then((res) => res.json())
            .then((jsondata) => {
                setIsRunning({ running: jsondata.running });
                setIsRestarting(() => false);
            });
    };

    let btnStart: React.ButtonHTMLAttributes<HTMLButtonElement>;
    if (isRestarting) {
        btnStart = (
            <button
                className={`w-24 h-4/6 bg-red-500 ring-1 ring-gray-200 rounded-md text-white hover:bg-gray-600 disabled:bg-red-800 disabled:opacity-50 cursor-not-allowed`}
                disabled={true}
            >
                Loading
            </button>
        );
    } else {
        btnStart = (
            <button
                className={`w-24 h-4/6 bg-gray-500 ring-1 ring-gray-200 rounded-md text-white hover:bg-gray-600 disabled:bg-red-800 disabled:opacity-50 ${
                    isRunning.running == true ? "cursor-not-allowed" : ""
                }`}
                onClick={clickHandler}
                disabled={isRunning.running == true ? true : false}
            >
                Start
            </button>
        );
    }

    return (
        <div className="w-screen h-screen flex justify-center bg-red-100">
            <div className="w-80 h-40 bg-white mt-20 rounded-md shadow-2xl p-2 flex flex-row">
                <div className="h-full w-1/3 border-r-2 border-gray-200">
                    <img src={botLogo} alt="" className="h-full w-full" />
                </div>
                <div className="h-full w-2/3 px-1 flex flex-col">
                    <div className="overflow-auto top-section w-full h-2/3 font-serif pl-1">
                        <h2 className="block text-center border-b-2 border-gray-200 mb-2">
                            BOT REPORT
                        </h2>

                        <h3>
                            Running :{" "}
                            <span
                                className={
                                    isRunning.running == true
                                        ? "text-green-300"
                                        : "text-red-300"
                                }
                            >
                                {`${isRunning.running}`
                                    .charAt(0)
                                    .toUpperCase() +
                                    `${isRunning.running}`.slice(1)}
                            </span>
                        </h3>
                        <h3>Prefix : 🤖</h3>
                    </div>
                    <div className="bottom-section w-full h-1/3  flex justify-around	items-end">
                        {btnStart}
                        <button
                            className="w-24 h-4/6 bg-gray-500 ring-1 ring-gray-200 rounded-md text-white hover:bg-gray-600"
                            onClick={restartHandler}
                        >
                            Restart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
