import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastProvider";
import api from "../utils/api"; 

const LockContext = createContext();

export const LockProvider = ({ children }) => {
  const { addToast } = useToast();
  const [isLocked, setIsLocked] = useState(true);
  const [storedPin, setStoredPin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch PIN from backend
  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await api.get("/settings/pin");
        const pinFromDB = res.data.pin;

        setStoredPin(pinFromDB);

        // If no PIN → show Set PIN screen
        if (!pinFromDB) {
          setIsLocked(true);
        } else {
          // Preserve unlock state across reloads
          const savedLock = localStorage.getItem("isLocked");
          setIsLocked(savedLock !== "false");
        }
      } catch (err) {
        console.error("Failed to fetch PIN", err);
        setIsLocked(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPin();
  }, []);

  const lockApp = () => {
    setIsLocked(true);
    localStorage.setItem("isLocked", "true");
    addToast({ message: "locked!", type: "success" });
  };

  const unlockApp = (enteredPin) => {
    if (!storedPin) return false;
    if (enteredPin === storedPin) {
      setIsLocked(false);
      localStorage.setItem("isLocked", "false");
      return true;
    }
    return false;
  };

  const setPin = async (pin) => {
    try {
      await api.post("/settings/pin", { pin });
      setStoredPin(pin);
      setIsLocked(false);
      localStorage.setItem("isLocked", "false");
    } catch (err) {
      console.error("Failed to save PIN", err);
    }
  };

  return (
    <LockContext.Provider
      value={{ isLocked, lockApp, unlockApp, storedPin, setPin, loading }}
    >
      {children}
    </LockContext.Provider>
  );
};

export const useLock = () => useContext(LockContext);
