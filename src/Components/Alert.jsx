import { useState, useEffect } from "react";

const AlertMessage = ({ message, type = "success", duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Call the onClose function when alert disappears
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-md transition-all duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default AlertMessage;
