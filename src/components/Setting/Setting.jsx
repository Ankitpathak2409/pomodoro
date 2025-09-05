import "./setting.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";

const Settings = ({ settings, setSettings, onClose }) => {
  const [localSettings, setLocalSettings] = useLocalStorage(
    "localSettings",
    settings
  );

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalSettings({
      ...localSettings,
      [name]: type === "checkbox" ? checked : Number(value),
    });
  };

  const handleSave = () => {
    setSettings(localSettings);
    onClose();
  };

  return (
    <div className="settingsPanel">
      <label>
        Work Duration (min):
        <input
          type="number"
          name="work"
          value={localSettings.work}
          onChange={handleChange}
          min="1"
        />
      </label>

      <label>
        Short Break (min):
        <input
          type="number"
          name="short_break"
          value={localSettings.short_break}
          onChange={handleChange}
          min="1"
        />
      </label>

      <label>
        Long Break (min):
        <input
          type="number"
          name="long_break"
          value={localSettings.long_break}
          onChange={handleChange}
          min="1"
        />
      </label>

      <label>
        Cycles before Long Break:
        <input
          type="number"
          name="cycles"
          value={localSettings.cycles}
          onChange={handleChange}
          min="1"
        />
      </label>

      <label>
        Enable Sound:
        <input
          className="enableSoundCheckbox"
          type="checkbox"
          name="sound"
          checked={localSettings.sound}
          onChange={handleChange}
        />
      </label>

      <div className="settingsActions">
        <button
          className="saveBtn"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
        <button
          className="cancelBtn"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Settings;
