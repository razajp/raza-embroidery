import { useTheme } from "../context/ThemeContext";
import FloatingBottomBar from "./FloatingBottomBar";
import FloatingTopLeftBar from "./FloatingTopLeftBar";
import FloatingTopRightBar from "./FloatingTopRightBar";
import LockScreen from "./LockScreen";
import { useLock } from "../context/LockContext";

export default function Layout({ children }) {
  const { colors, borders } = useTheme();
  const { isLocked, loading } = useLock();

  if (loading) return null; // ya spinner show karo

  return (
    <div className={`relative h-screen flex p-3 bg-[#3b3b3b]`}>
      <main className={`flex flex-col grow h-full border rounded-3xl relative overflow-hidden p-5 ${colors.bg}`}>
        {isLocked && <LockScreen />}
        <div className="flex justify-between">
          <FloatingTopLeftBar />
          <FloatingTopRightBar />
        </div>
        <div className="flex-1 mx-12 m-5 flex flex-col h-full overflow-x-hidden overflow-y-auto ">{children}</div>
        <div className="flex justify-between">
          <FloatingBottomBar />
        </div>
      </main>
    </div>
  );
}
