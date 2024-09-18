import { useState } from "react";
import { Button, Collapse, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Section = ({ title, description, isVisible, toggleVisibility }) => {
  return (
    <div className="border rounded-lg border-gray-300 p-4 mb-4 shadow-md">
      <div className="flex items-center justify-between">
        <Typography variant="h6" className="font-semibold text-gray-800">
          {title}
        </Typography>
        <Button
          onClick={toggleVisibility}
          endIcon={isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          variant="outlined"
          color="primary"
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>
      <Collapse in={isVisible}>
        <Typography variant="body2" className="mt-2 text-gray-600">
          {description}
        </Typography>
      </Collapse>
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
      <Typography variant="h4" className="text-center font-bold mb-6">
        Welcome to Instamart
      </Typography>
      <Typography variant="h5" className="text-center mb-4 text-gray-700">
        We are currently building this feature. Stay tuned for updates!
      </Typography>
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
