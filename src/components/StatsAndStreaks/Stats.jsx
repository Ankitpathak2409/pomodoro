import "./Stats.css";
import {
  FaRegClock,
  FaCalendarWeek,
  FaCheckCircle,
  FaFire,
  FaTrophy,
} from "react-icons/fa";

const Stats = ({ stats, handleReset }) => {
  return (
    <div className="stats">
      <h2>Stats & Streaks</h2>
      <p>
        {" "}
        <FaRegClock color="#FF6347" size={22} /> <span>Pomodoros Today:</span>{" "}
        {stats.today || 0} times
      </p>
      <p>
        {" "}
        <FaCalendarWeek color="#1E90FF" size={22} />{" "}
        <span>Pomodoros This Week:</span> {stats.week || 0} times
      </p>
      <p>
        {" "}
        <FaCheckCircle color="#2ECC71" size={22} />{" "}
        <span>Tasks Completed Today:</span> {stats.tasksCompleted}
      </p>
      <p>
        {" "}
        <FaFire color="#F39C12" size={22} /> <span>Current Streak:</span>{" "}
        {stats.streak || 0} days
      </p>
      <p>
        {" "}
        <FaTrophy color="#FFD700" size={22} /> <span>Best Streak:</span>{" "}
        {stats.bestStreak || 0} days
      </p>

      <div>
        <button onClick={handleReset} className="resetStatsBtn">
          Reset Stats
        </button>
      </div>
    </div>
  );
};

export default Stats;
