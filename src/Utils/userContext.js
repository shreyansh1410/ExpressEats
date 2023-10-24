import { createContext } from "react"

const UserContext =createContext({
    user:{
        name: "John Doe",
        email: "johndoe@mailme.com"
    }
});

export default UserContext;