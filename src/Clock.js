import React, { useState, useEffect } from "react";
import './clock.css';

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [alarmminute, setAlarmminutes] = useState(0);
    const [alarmseconds, setAlarmseconds] = useState(0);
    const [alarmTime, setAlarmTime] = useState(null);
    const [alarmTriggered, setAlarmTriggered] = useState(false);

    // Function to update the current time
    const update = () => {
        const curTime = new Date().toLocaleTimeString();
        console.log(Date());
        setTime(curTime);
    };

    // Set an interval to update the time every second
    useEffect(() => {
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    // Function to set the alarm after the selected minutes
    const setAlarmForMinutes = () => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + alarmminute);
        currentTime.getSeconds(currentTime.getSeconds() + alarmseconds);
        setAlarmTime(currentTime);
        setAlarmTriggered(false);
        alert("Alarm set for: " + currentTime.toLocaleTimeString());
    };

    // Check if the current time matches the alarm time
    useEffect(() => {
        if (alarmTime && !alarmTriggered) {
            const currentTime = new Date();
            if (currentTime.getHours() === alarmTime.getHours() &&
            currentTime.getMinutes() === alarmTime.getMinutes() && 
            currentTime.getSeconds() === alarmTime.getSeconds())
        {
                alert("The alarm is going off!");
                setAlarmTriggered(true); // Prevent the alert from showing again
            }
        }
    }, [time, alarmTime, alarmTriggered]);

    return (
        <div className="clock">
            <div className="digital_clock">
                <h1>Digital Clock</h1>
                <div className="timer-clock">
                    <h2>{time}</h2>
                </div>
                <h1>Set Alarm</h1>
                <p>Alarm in {alarmminute}M : {alarmseconds}s</p>
                <div style={{display:"flex",  gap: "25px"}}>
                    <button className="btns" onClick={() => setAlarmminutes(alarmminute + 1)}>Set Minutes</button>
                    <button className="btns" onClick={() => setAlarmminutes(alarmminute - 1)}>Unset Minutes</button>
                    <button className="btns" onClick={() => setAlarmseconds(alarmseconds + 1)}>Set Seconds</button>
                    <button className="btns" onClick={setAlarmForMinutes}>Set Alarm</button>
                </div>
            </div>
        </div>
    );
};

export default Clock;
