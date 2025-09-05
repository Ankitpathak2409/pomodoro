import "./TimerCountdown.css";
import { useEffect, useState } from "react";
import MainContentButtons from "../MainContent/MainContentButtons";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

const TimerCountdown = ({ settings, setStats, activeTask }) => {
  const DURATION = {
    work: settings.work * 60,
    short_break: settings.short_break * 60,
    long_break: settings.long_break * 60,
  };

  const [mode, setMode] = useLocalStorage("mode", "work");
  const [timeLeft, setTimeLeft] = useState(DURATION[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [_cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);

          handleSessionComplete();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const handleSessionComplete = () => {
    setIsRunning(false);

    if (settings.sound) {
      const audio = new Audio("src/assets/notificationSound.wav");
      audio.currrentTime = 0;
      audio.play();
    }

    if (mode === "work") {
      setStats((prev) => ({
        ...prev,
        today: prev.today + 1,
        week: prev.week + 1,
        tasksCompleted: activeTask
          ? prev.tasksCompleted + 1
          : prev.tasksCompleted,
      }));

      setCycleCount((prev) => {
        const newCount = prev + 1;

        if (newCount % settings.cycles === 0) {
          setMode("long_break");
          toast("🎉 Great work! Time for a LONG break!");
        } else {
          setMode("short_break");
          toast("✅ Nice! Take a short break.");
        }

        return newCount;
      });
    } else {
      setMode("work");

      toast("Get back to work again");
    }
  };

  // Keyboard shortcuts

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        isRunning ? setIsRunning(false) : setIsRunning(true);
      }

      if (e.key.toLowerCase() === "r") {
        handleReset();
      }
      if (e.key.toLowerCase() === "s") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, mode]);

  // Reset when mode changes

  useEffect(() => {
    setIsRunning(false);
    setTimeLeft(DURATION[mode]);
  }, [mode, settings]);

  // Format MM:SS

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  // Circle Progress

  const radius = 120;
  const stroke = 11;
  const normalizedRadius = radius - stroke * 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress =
    timeLeft === 0 ? 0 : (timeLeft / DURATION[mode]) * circumference;

  // Controls

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(DURATION[mode]);
  };

  const handleSkip = () => {
    setIsRunning(false);
    handleSessionComplete();
  };

  return (
    <div>
      {/* Mode Buttons  */}
      <MainContentButtons setMode={setMode} />

      {/* Progress Container  */}

      <div className="progressContainer">
        <svg width={radius * 2} height={radius * 2} className="progressRing">
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#e684ae" />
              <stop offset="50%" stopColor="#79cbca" />
              <stop offset="100%" stopColor="#77a1d3" />
            </linearGradient>
          </defs>

          <circle
            stroke="#eee"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          <circle
            stroke="url(#progressGradient)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>

        {/* Timer  */}

        <div className="timer">
          {mm} : {ss}
        </div>
      </div>

      {/* Controls  */}

      <div className="startPauseBtn">
        <button
          className="controlBtn"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          <FaPlay size={36} />
        </button>

        <button
          className="controlBtn"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          <FaPause size={36} />
        </button>

        <button className="controlBtn" onClick={handleReset}>
          <FaRedo size={34} />
        </button>
      </div>
    </div>
  );
};

export default TimerCountdown;
