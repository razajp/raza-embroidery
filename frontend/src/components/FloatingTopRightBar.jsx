import { useTheme } from "../context/ThemeContext";
import { Bell, Lock, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLock } from "../context/LockContext";
import IconButton from "../components/IconButton";

export default function FloatingTopRightBar() {
  const { colors, defaultStyling } = useTheme();
  const navigate = useNavigate();
  const { lockApp } = useLock();

  return (
    <div className={`flex justify-start ${defaultStyling.FloatingBar}`}>
      {/* Notification Button */}
      <IconButton icon={Bell} badge />

      <div className="w-px h-7 bg-gray-300 mx-1"></div>

      <IconButton icon={Settings} onClick={() => navigate("/settings")} title="Settings" />

      <div className="w-px h-7 bg-gray-300 mx-1"></div>

      <IconButton icon={Lock} onClick={lockApp} title="Lock App" />
    </div>
  );
}
