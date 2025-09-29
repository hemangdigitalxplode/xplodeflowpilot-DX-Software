import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { toast } from 'react-toastify';

dayjs.extend(utc);
dayjs.extend(timezone);

const useTaskTimer = (taskId) => {
    const [totalTimeSpent, setTotalTimeSpent] = useState(0); 
    const [sessionSeconds, setSessionSeconds] = useState(0); 
    const [isTiming, setIsTiming] = useState(false);
    const [pausedTime, setPausedTime] = useState(0); 
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const res = await axiosInstance.get(`/tasks/${taskId}/time`);
                const { time_spent, start_time, paused_time } = res.data; 

                setTotalTimeSpent(time_spent || 0);
                setPausedTime(paused_time || 0); 

                if (start_time) {
                    const elapsed = dayjs().diff(dayjs(start_time), 'second');
                    setSessionSeconds(elapsed); 
                    setIsTiming(true);
                } else {
                    setSessionSeconds(0);
                    setIsTiming(false);
                }
            } catch (err) {
                console.error('Error fetching timer:', err);
            }
        };

        if (taskId) fetchTime();
    }, [taskId]);

    useEffect(() => {
        if (isTiming) {
            intervalRef.current = setInterval(() => {
                setSessionSeconds(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isTiming]);

    // Auto-stop after 6:30 PM and change status to "To-do"
    useEffect(() => {
        const checkStopTime = setInterval(async () => {
            const nowIST = dayjs().tz("Asia/Kolkata");
            const hour = nowIST.hour();
            const minute = nowIST.minute();

            // If time is 6:30 PM or later, stop the timer and update status
            if (isTiming && (hour > 18 || (hour === 18 && minute >= 30))) {
                toast.info("Timer stopped automatically at 6:30 PM — Office time is over.");
                console.log("timer stopped");

                await stopTimer();
                try {
                    await axiosInstance.put(`/tasks/${taskId}/status`, { status: "To-do" });
                } catch (err) {
                    console.error("Failed to update status:", err);
                }
            }
        }, 60000); 

        return () => clearInterval(checkStopTime);
    }, [isTiming, taskId]);

    // Start Timer function
const startTimer = async () => {
    try {
        await axiosInstance.put(`/tasks/${taskId}/start`);
        setSessionSeconds(0); 
        setIsTiming(true);  
    } catch (err) {
        console.error('Start timer failed:', err);
    }
};

    // Stop Timer function
    const stopTimer = async () => {
        try {
            await axiosInstance.put(`/tasks/${taskId}/stop`, {
                time_spent: sessionSeconds, 
            });
            setTotalTimeSpent(prev => prev + sessionSeconds);
            setSessionSeconds(0);
            setIsTiming(false);
        } catch (err) {
            console.error('Stop timer failed:', err);
        }
    };

    // Pause Timer function (when status is "To-do")
    const pauseTimer = async () => {
        try {
            await axiosInstance.put(`/tasks/${taskId}/pause`, {
                time_spent: sessionSeconds, 
            });
            setPausedTime(prev => prev + sessionSeconds); 
            setTotalTimeSpent(prev => prev + sessionSeconds); 
            setSessionSeconds(0); 
            setIsTiming(false); 
        } catch (err) {
            console.error('Pause timer failed:', err);
        }
    };

    // Format the time (Ensure no negative time)
const formatTime = (seconds) => {

    const validSeconds = Math.max(0, seconds); 

    const hours = String(Math.floor(validSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((validSeconds % 3600) / 60)).padStart(2, '0');
    const sec = String(validSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${sec}`;
};

    return {
        seconds: totalTimeSpent + sessionSeconds + pausedTime,  
        isTiming,
        startTimer,
        stopTimer,
        pauseTimer,  
        formatTime
    };
};

export default useTaskTimer;
