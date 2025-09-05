const Button = ({ text, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className="mainContentButton">
        {text}
      </button>
    </div>
  );
};

export default Button;
