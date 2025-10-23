import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colors = {
    primaryColor: "#016659",
    secondaryColor: "#fff7e6",
    bgColor: "#FAF3E6",
    bg: "bg-[#FAF3E6]",
    secondaryBg: "bg-[#FFFCF6]",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#facc15",
    info: "#0284c7",
    promaryHoveredColor: "[#016659]/10",
    promaryHoveredBg: "bg-[#016659]/10",
    card: "bg-[#FFFCF6] text-[#016659] shadow-md rounded-xl border border-[#016659]/30 overflow-hidden",
    hover: "hover:bg-[#016659]/10",
    primaryBtn: "bg-[#016659] text-white hover:bg-[#014A41] cursor-pointer",
    button: "bg-[#016659] text-white hover:bg-[#002a17]",
    heading: "text-[#016659]",
    text: "#016659",
  };

  const borders = {
    primary: "border border-[#00302A]/30",
    normal: "border border-[#00302A]/50",
    error: "border border-red-500",
    warning: "border border-yellow-400",
    success: "border border-green-500",
    focus: "focus:border-[#016659] focus:ring-1 focus:ring-[#016659]",
    divider: "border-[#016659]/30",
  };

  const defaultStyling = {
    FloatingBar: `flex items-center rounded-2xl shadow-md z-50 p-1.5 bg-white/30 backdrop-blur-md ${borders.primary}`,
  };

  return (
    <ThemeContext.Provider value={{ colors, borders, defaultStyling }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
