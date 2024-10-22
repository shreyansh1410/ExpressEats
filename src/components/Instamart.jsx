import { useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Section = ({ title, description, isVisible, toggleVisibility }) => {
  return (
    <div className="border rounded-lg border-gray-300 p-4 mb-4 shadow-md">
      <div className="flex items-center justify-between">
        <h6 className="font-semibold text-gray-800 text-lg">{title}</h6>
        <button
          onClick={toggleVisibility}
          className="flex items-center text-blue-500 border border-blue-500 rounded px-3 py-1 transition hover:bg-blue-500 hover:text-white"
        >
          {isVisible ? 'Hide' : 'Show'}
          {isVisible ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </button>
      </div>
      {isVisible && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
    </div>
  );
};

const Instamart = () => {
  const [isVisibleSection, setIsVisibleSection] = useState("About");

  const toggleSection = (section) => {
    setIsVisibleSection(prevSection =>
      prevSection === section ? "" : section
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h4 className="text-center font-bold mb-6 text-4xl">Welcome to Instamart</h4>
      <h5 className="text-center mb-4 text-gray-700 text-2xl">
        We are currently building this feature. Stay tuned for updates!
      </h5>
      <Section
        title="About Instamart"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        isVisible={isVisibleSection === "About"}
        toggleVisibility={() => toggleSection("About")}
      />
      <Section
        title="Team Instamart"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        isVisible={isVisibleSection === "Team"}
        toggleVisibility={() => toggleSection("Team")}
      />
      <Section
        title="Careers"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        isVisible={isVisibleSection === "Careers"}
        toggleVisibility={() => toggleSection("Careers")}   
      />
    </div>
  );
};

export default Instamart;
