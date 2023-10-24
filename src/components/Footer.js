import UserContext from "../Utils/userContext";
import { useContext } from "react";

const Footer = () => {
    const {user} = useContext(UserContext);
    return (
        <div className="Footer">
            <h4>Footer</h4>
            <p>this site is developed and maintained by {user.name}</p>
            <p>Contact me at {user.email}</p>
        </div>
    )
}

export default Footer;