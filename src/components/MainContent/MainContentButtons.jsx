import Button from '../Button/Button';
import './MainContentButton.css';

const MainContentButtons = ({ setMode }) => {
  return (
    <>
        <div className='mainContentButtons'>
            <Button text = "POMODORO" onClick={() => setMode("work")}/>
            <Button text = "SHORT BREAK" onClick={() => setMode("short_break")} />
            <Button text = "LONG BREAK" onClick={() => setMode("long_break")}/>
         </div>
    </>
  )
}

export default MainContentButtons;