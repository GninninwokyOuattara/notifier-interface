import React, { useState, useEffect } from "react";
// import fetch from "cross-fetch";

type Response = { running: boolean | string };

const checkStateUrl = process.env.REACT_APP_CHECK_STATE_URL as string;
const startBot = process.env.REACT_APP_START_BOT_URL as string;

const useBot = (): [
    Response,
    React.Dispatch<React.SetStateAction<Response>>
] => {
    const [isRunning, setIsRunning] = useState<Response>({ running: false });

    useEffect(() => {
        fetch(checkStateUrl, {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=utf-8",
            },
        })
            .then((res) => res.json())
            .then((jsondata) => {
                console.log(jsondata);
                setIsRunning({ running: jsondata.running });
            });
    }, []);

    return [isRunning, setIsRunning];
};

export default useBot;
