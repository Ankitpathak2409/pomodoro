import { ToastContainer } from "react-toastify";
import DarkLightMode from "./components/DarkLightMode/DarkLightMode";
import Quotes from "./components/Quotes/Quotes";
import Settings from "./components/Setting/Setting";
import TimerCountdown from "./components/TimerCountdown/TimerCountdown";
import { FaCog } from "react-icons/fa";
import "./components/Setting/Setting.css";
import "./index.css";
import TodoList from "./components/TodoList/TodoList";
import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Stats from "./components/StatsAndStreaks/Stats";

const App = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [settings, setSettings] = useLocalStorage("settings", {
    work: 25,
    short_break: 1,
    long_break: 15,
    cycles: 4,
    sound: true,
  });

  const [stats, setStats] = useLocalStorage("stats", {
    today: 0,
    week: 0,
    tasksCompleted: 0,
    lastUpdated: new Date().toDateString(),
    streak: 0,
    bestStreak: 0,
  });

  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    if (stats.lastUpdated != today) {
      if (stats.today > 0) {
        const newStreak = stats.streak + 1;
        setStats((prev) => ({
          ...prev,
          today: 0,
          tasksCompleted: 0,
          lastUpdated: today,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
        }));
      } else {
        setStats((prev) => ({
          ...prev,
          today: 0,
          lastUpdated: today,
          streak: 0,
          tasksCompleted: 0,
        }));
      }
    }
  }, [stats]);

  const handleReset = () => {
    setStats({
      today: 0,
      week: 0,
      tasksCompleted: 0,
      lastUpdated: new Date().toDateString(),
      streak: 0,
      bestStreak: 0,
    });
  };

  return (
    <>
      <div className="heroSection">
        <h1 className="mainHeading">POMODORO TIMER</h1>
        <div className="">
          <button
            className="settingIcon"
            onClick={() => {
              // console.log("Settting open");
              setIsSettingOpen(true);
            }}
          >
            <FaCog size={22} />
          </button>
          {isSettingOpen && (
            <Settings
              settings={settings}
              setSettings={setSettings}
              onClose={() => setIsSettingOpen(false)}
            />
          )}
          <DarkLightMode />
        </div>

        <Quotes />

        <TimerCountdown
          settings={settings}
          stats={stats}
          setStats={setStats}
          activeTask={activeTask}
          setActiveTask={setActiveTask}
        />

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </div>

      <div className="todoStat">
        <TodoList
          activeTask={activeTask}
          setActiveTask={setActiveTask}
          setStats={setStats}
        />

        <Stats stats={stats} handleReset={handleReset} />
      </div>
    </>
  );
};

export default App;
