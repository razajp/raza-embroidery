import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colors = {
    primaryColor: "#01654E",
    primaryBg: "bg-[#01654E] text-white",
    secondaryColor: "#fff7e6",
    bgColor: "#FAF3E6",
    bg: "bg-[#FAF3E6]",
    secondaryBg: "bg-[#FFFCF6]",
    success: "#46C27F",
    error: "#D43F3F",
    warning: "#D9A14A",
    info: "#0284c7",
    promaryHoveredColor: "[#01654E]/10",
    promaryHoveredBg: "bg-[#01654E]/10",
    card: "bg-[#FFFCF6] text-[#013D35] shadow-md border border-[#01654E]/30",
    hover: "hover:bg-[#01654E]/10",
    rowHover: "hover:bg-[#01654E]/5",
    primaryBtn: "bg-[#01654E] text-white hover:bg-[#014A41] cursor-pointer",
    secondaryBtn: "bg-[#01654E]/8 hover:bg-[#01654E]/18 border border-[#00302A]/30 cursor-pointer",
    dangerBtn: "bg-[#D43F3F]/8 hover:bg-[#D43F3F]/18 border border-[#7A2424]/40 cursor-pointer",
    button: "bg-[#01654E] text-white hover:bg-[#002a17]",
    heading: "text-[#01654E]",
    text: "#01654E",
    bgDangerHover: "hover:bg-red-200",
  };

  const borders = {
    primary: "border border-[#00302A]/30",
    normal: "border border-[#00302A]/50",
    error: "border border-red-500",
    warning: "border border-yellow-400",
    success: "border border-green-500",
    focus: "focus:border-[#01654E] focus:ring-1 focus:ring-[#01654E]",
    divider: "border-[#01654E]/30",
  };

  const defaultStyling = {
    FlterBox: `flex items-center rounded-2xl text-[#013D35] shadow-md z-50 p-1 bg-[#FFFCF6]/85 backdrop-blur-md ${borders.primary}`,
    FloatingBar: `flex items-center rounded-2xl text-[#013D35] shadow-md z-50 p-1 bg-white/30 backdrop-blur-md ${borders.primary}`,
  };

  return (
    <ThemeContext.Provider value={{ colors, borders, defaultStyling }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
