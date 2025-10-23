import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function FloatingTopLeftBar() {
  const { colors, defaultStyling } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className={`flex justify-start select-none cursor-pointer active:scale-85 ${defaultStyling.FloatingBar}`}
    >
      <div
        className={`flex items-center px-5 h-full rounded-xl font-medium leading-none ${colors.promaryHoveredBg} ${colors.heading}`}
      >
        Raza Embroidery
      </div>
    </div>
  );
}
