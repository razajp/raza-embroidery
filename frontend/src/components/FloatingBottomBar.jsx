import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  Truck,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

// --- Main Bottom Bar Links ---
const mainLinks = [
  { name: "Home", path: "/home", icon: <Home size={20} /> },
  { name: "Customers", path: "/customers", icon: <Users size={20} /> },
  { name: "Suppliers", path: "/suppliers", icon: <Truck size={20} /> },
  { name: "Reports", path: "/reports", icon: <FileText size={20} /> },
];

// --- Customer Module Links ---
const customerModuleLinks = [
  { name: "Summary", path: "/customers/summary", icon: <Users size={20} /> },
  { name: "Add", path: "/customers/add", icon: <Plus size={20} /> },
  { name: "Show", path: "/customers/show", icon: <Eye size={20} /> },
];

// --- Supplier Module Links ---
const supplierModuleLinks = [
  { name: "Summary", path: "/suppliers/summary", icon: <Truck size={20} /> },
  { name: "Add", path: "/suppliers/add", icon: <Plus size={20} /> },
  { name: "Show", path: "/suppliers/show", icon: <Eye size={20} /> },
];

export default function FloatingBottomBar() {
  const { defaultStyling, colors } = useTheme();
  const location = useLocation();

  const [currentLinks, setCurrentLinks] = useState(mainLinks);
  const [prevLinks, setPrevLinks] = useState(null);
  const [nextLinks, setNextLinks] = useState(null);

  // Detect current module based on path
  useEffect(() => {
    if (location.pathname.startsWith("/customers")) {
      if (currentLinks !== customerModuleLinks) {
        setPrevLinks(mainLinks);
        setNextLinks(null);
        setCurrentLinks(customerModuleLinks);
      }
    } else if (location.pathname.startsWith("/suppliers")) {
      if (currentLinks !== supplierModuleLinks) {
        setPrevLinks(mainLinks);
        setNextLinks(null);
        setCurrentLinks(supplierModuleLinks);
      }
    } else {
      setPrevLinks(null);
      setNextLinks(null);
      setCurrentLinks(mainLinks);
    }
  }, [location.pathname]);

  // Go back to previous set of links
  const handlePrevious = () => {
    if (prevLinks) {
      setNextLinks(currentLinks);
      setCurrentLinks(prevLinks);
      setPrevLinks(null);
    }
  };

  // Go forward to next set of links (if available)
  const handleNext = () => {
    if (nextLinks) {
      setPrevLinks(currentLinks);
      setCurrentLinks(nextLinks);
      setNextLinks(null);
    }
  };

  return (
    <div className={`flex mx-auto items-center ${defaultStyling.FloatingBar}`}>
      {/* ← Back */}
      {prevLinks && (
        <>
          <button
            onClick={handlePrevious}
            className={`px-2 h-full rounded-xl cursor-pointer ${colors.hover}`}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="w-px h-7 bg-gray-300 mx-1.5"></div>
        </>
      )}

      {/* --- Main / Module Links --- */}
      {currentLinks.map((link, index) => {
        const isActive = location.pathname.includes(link.path); // precise match
        return (
          <div key={link.name + index} className="flex items-center">
            <NavLink
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl active:scale-95 transition-all ${
                isActive ? colors.primaryBtn : colors.hover
              }`}
            >
              {link.icon}
              <span className="text-sm">{link.name}</span>
            </NavLink>

            {index !== currentLinks.length - 1 && (
              <div className="w-px h-7 bg-gray-300 mx-1.5"></div>
            )}
          </div>
        );
      })}

      {/* → Forward */}
      {nextLinks && (
        <>
          <div className="w-px h-7 bg-gray-300 mx-1.5"></div>
          <button
            onClick={handleNext}
            className={`px-2 h-full rounded-xl cursor-pointer ${colors.hover}`}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
