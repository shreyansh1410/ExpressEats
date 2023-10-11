import { useState, useEffect } from "react";

const useOnline = () => {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        }
        const handleOffline = () => {
            setIsOnline(false);
        }
        return () => {
            window.addEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOffline);

            window.addEventListener("online", handleOnline);
            window.removeEventListener("online", handleOnline);            
        }
    }, [])
    return isOnline;
}

export default useOnline;