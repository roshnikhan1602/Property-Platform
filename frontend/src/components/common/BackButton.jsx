import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BackButton({
  text = "Back",
  className = "",
  onClick,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-base font-medium shadow-sm transition cursor-pointer ${className}`}
    >
      <FaArrowLeft className="text-sm" />
      {text}
    </button>
  );
}

export default BackButton;