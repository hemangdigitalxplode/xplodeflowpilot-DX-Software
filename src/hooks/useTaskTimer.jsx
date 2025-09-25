/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { toast } from 'react-toastify';

dayjs.extend(utc);
dayjs.extend(timezone);

const useTaskTimer = (taskId) => {
    const [totalTimeSpent, setTotalTimeSpent] = useState(0); // DB time
    const [sessionSeconds, setSessionSeconds] = useState(0); // current session
    const [isTiming, setIsTiming] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const res = await axiosInstance.get(`/tasks/${taskId}/time`);
                const { time_spent, start_time } = res.data;

                setTotalTimeSpent(time_spent || 0);

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


    // ⏳ Auto-stop at target time
    useEffect(() => {
        const checkStopTime = setInterval(async () => {
            const nowIST = dayjs().tz("Asia/Kolkata");
            const hour = nowIST.hour();
            const minute = nowIST.minute();

            // testing ke liye 12:42 par trigger
            if (isTiming && hour === 15 && minute === 34) {
                toast.info("Timer stopped automatically at 18:30 PM — Office time is over.");
                console.log("timer stopped")
                await stopTimer();

                try {
                    await axiosInstance.put(`/tasks/${taskId}/status`, { status: "To-do" });
                } catch (err) {
                    console.error("Failed to update status:", err);
                }
            }
        }, 1000); // 1 second interval for precise testing

        return () => clearInterval(checkStopTime);
    }, [isTiming, taskId]);

    const startTimer = async () => {
        try {
            await axiosInstance.put(`/tasks/${taskId}/start`);
            setSessionSeconds(0);
            setIsTiming(true);
        } catch (err) {
            console.error('Start timer failed:', err);
        }
    };

    const stopTimer = async () => {
        try {
            await axiosInstance.put(`/tasks/${taskId}/stop`, {
                time_spent: sessionSeconds, // ✅ Send time
            });
            setTotalTimeSpent(prev => prev + sessionSeconds);
            setSessionSeconds(0);
            setIsTiming(false);
        } catch (err) {
            console.error('Stop timer failed:', err);
        }
    };

    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return {
        seconds: totalTimeSpent + sessionSeconds,
        isTiming,
        startTimer,
        stopTimer,
        formatTime
    };
};

export default useTaskTimer;
