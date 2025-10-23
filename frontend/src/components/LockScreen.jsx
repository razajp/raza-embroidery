import { useState } from "react";
import { useLock } from "../context/LockContext";
import { useTheme } from "../context/ThemeContext";
import { Lock, Unlock, RefreshCw } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useToast } from "../context/ToastProvider";
import { validators } from "../utils/validators";

export default function LockScreen() {
  const { borders, colors } = useTheme();
  const { unlockApp, setPin, storedPin } = useLock();
  const { addToast } = useToast();

  const [pin, setPinInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");

  const handleUnlock = () => {
    if (!storedPin) {
      if (pin.length < 4) {
        addToast({ message: "PIN must be at least 4 digits", type: "error" });
        return;
      }
      setPin(pin);
      addToast({ message: "PIN set successfully!", type: "success" });
      setPinInput("");
      return;
    }

    const success = unlockApp(pin);
    if (!success) {
      addToast({ message: "Incorrect PIN", type: "error" });
      setIsUnlocked(false);
    } else {
      addToast({ message: "Unlocked!", type: "success" });
      setIsUnlocked(true);
    }
    setPinInput("");
  };

  const handleReset = () => {
    if (currentPin !== storedPin) {
      addToast({ message: "Current PIN is incorrect", type: "error" });
      return;
    }
    if (newPin.length < 4) {
      addToast({ message: "New PIN must be at least 4 digits", type: "error" });
      return;
    }
    setPin(newPin);
    addToast({ message: "PIN reset successfully!", type: "success" });
    setCurrentPin("");
    setNewPin("");
    setResetMode(false);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md z-[999]">
      <div className={`p-8 rounded-2xl w-80 text-center grid grid-cols-1 gap-4 ${colors.secondaryBg} ${borders.primary}`}>
        <div className="flex justify-center">
          {isUnlocked ? (
            <Unlock size={40} className={colors.heading} />
          ) : (
            <Lock size={40} className={colors.heading} />
          )}
        </div>

        <h2 className={`text-2xl font-semibold ${colors.heading}`}>
          {!resetMode
            ? storedPin
              ? "Enter PIN"
              : "Set Your App PIN"
            : "Reset PIN"}
        </h2>

        {!resetMode ? (
          <>
            <Input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={setPinInput}
              onEnter={handleUnlock}
              placeholder="••••"
              validator={validators.numeric}
              icon="RectangleEllipsis"
            />
            <Button onClick={handleUnlock} className="w-full">
              {storedPin ? (
                <div className="flex justify-center items-center gap-2">
                  <Unlock size={18} />
                  Unlock
                </div>
              ) : (
                "Save PIN"
              )}
            </Button>

            {storedPin && (
              <Button
                onClick={() => setResetMode(true)}
                className="w-full flex justify-center items-center gap-2"
              >
                <RefreshCw size={18} /> Reset PIN
              </Button>
            )}
          </>
        ) : (
          <>
            <Input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={currentPin}
              onChange={setCurrentPin}
              placeholder="Current PIN"
              validator={validators.numeric}
              icon="RectangleEllipsis"
            />
            <Input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={newPin}
              onChange={setNewPin}
              placeholder="New PIN"
              validator={validators.numeric}
              icon="RectangleEllipsis"
            />
            <Button onClick={handleReset} className="w-full">
              Save New PIN
            </Button>
            <Button onClick={() => setResetMode(false)} className="w-full">
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
