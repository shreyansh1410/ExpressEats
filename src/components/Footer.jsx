import logo from "../Assets/Images/logo.png";

const Footer = () => {
  return (
    <div className="Footer text-gray-600 bg-gray-300 h-[300px] flex flex-col justify-between">
      <div className="flex justify-evenly">
        <div className="ml-2 mt-4 mb-2">
          <div>
            <img src={logo} alt="logo" className="w-48"></img>
          </div>
          <div id="copytight">
            <p className="text-md">
              &copy; <span>2024&nbsp;</span>
              <span>
                {" "}
                <a
                  href="https://www.github.com/shreyansh1410"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shreyansh Shukla&nbsp;
                </a>{" "}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col my-4">
          <ul>
            <li className="text-xl text-black my-2 font-semibold">Legal</li>
            <li className="my-1">Terms and Conditions</li>
            <li className="my-1">Privacy Policy</li>
            <li className="my-1">Cookie Policy</li>
          </ul>
        </div>
        <div className="flex flex-col my-4">
          <ul>
            <li className="text-xl text-black my-2 font-semibold">Company</li>
            <li className="my-1">About</li>
            <li className="my-1">Careers</li>
            <li className="my-1">Team</li>
            <li className="my-1">ExpressEats Instamart</li>
            <li className="my-1">ExpressEats Plus</li>
          </ul>
        </div>
        <div className="flex flex-col my-4">
          <ul>
            <li className="text-xl text-black my-2 font-semibold">Contact Us</li>
            <li className="my-1">Help And Support</li>
            <li className="my-1">Partner With Us</li>
            <li className="my-1">Ride With Us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
