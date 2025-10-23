import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, FileText, Plus, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

const mainLinks = [
  { name: "Home", path: "/home", icon: <Home size={20} /> },
  { name: "Customers", path: "/customers", icon: <Users size={20} /> },
  { name: "Reports", path: "/reports", icon: <FileText size={20} /> },
];

const customerModuleLinks = [
  { name: "Summary", path: "/customers/summary", icon: <Users size={20} /> },
  { name: "Add", path: "/customers/add", icon: <Plus size={20} /> },
  { name: "Show", path: "/customers/show", icon: <Eye size={20} /> },
];

export default function FloatingBottomBar() {
  const { defaultStyling, colors } = useTheme();
  const location = useLocation();

  const [currentLinks, setCurrentLinks] = useState(mainLinks);
  const [prevLinks, setPrevLinks] = useState(null);
  const [nextLinks, setNextLinks] = useState(null);

  useEffect(() => {
    if (location.pathname.startsWith("/customers")) {
      if (!prevLinks) {
        setPrevLinks(mainLinks); // store main links as previous
      }
      setNextLinks(null); // no next links for now
      setCurrentLinks(customerModuleLinks);
    } else {
      setPrevLinks(null);
      setNextLinks(null);
      setCurrentLinks(mainLinks);
    }
  }, [location.pathname]);

  const handlePrevious = () => {
    if (prevLinks) {
      setNextLinks(currentLinks); // store current as next
      setCurrentLinks(prevLinks);
      setPrevLinks(null);
    }
  };

  const handleNext = () => {
    if (nextLinks) {
      setPrevLinks(currentLinks); // store current as previous
      setCurrentLinks(nextLinks);
      setNextLinks(null);
    }
  };

  return (
    <div
      className={`flex mx-auto items-center ${defaultStyling.FloatingBar}`}
    >
      {prevLinks && (
        <>
          <button
            onClick={handlePrevious}
            className={`px-2 h-full rounded-xl cursor-pointer ${colors.hover}`}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
        </>
      )}

      {currentLinks.map((link, index) => {
        const isActive = location.pathname.includes(link.path);
        return (
          <div key={link.name + index} className="flex items-center">
            <NavLink
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl active:scale-85 ${
                isActive ? colors.primaryBtn : colors.hover
              }`}
            >
              {link.icon}
              <span className="text-sm">{link.name}</span>
            </NavLink>

            {index !== currentLinks.length - 1 && (
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
            )}
          </div>
        );
      })}

      {nextLinks && (
        <>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
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
