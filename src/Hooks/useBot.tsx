import React, { useState, useEffect } from "react";

type Response = { running: boolean } | { error: string };

const checkStateUrl = process.env.REACT_APP_CHECK_STATE_URL as string;

const useBot = () => {
    const [isRunning, setIsRunning] = useState<Response>({ running: false });

    useEffect(() => {
        fetch(
            `https://cors-anywhere.herokuapp.com/scantrad-wa-notifier-private.herokuapp.com/start`
        ).then((res) => {
            console.log(res);
        });
    }, []);

    return [isRunning, setIsRunning];
};

export default useBot;
