import "./InputBox.css";

export default function InputBox({ type, value, onChange, placeholder }) {
  return (
    <input
      className="todoInput"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
