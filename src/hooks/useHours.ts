import React from "react";

const useHours = () => {
    const date = new Date().toLocaleDateString();
    
    const [hours, setHours] = React.useState("");

    React.useEffect(() => {
        const intervalHours = setInterval(() => {
        const newHours = new Date().toLocaleTimeString();
        setHours(newHours);
        }, 1000);

        return () => clearInterval(intervalHours);
    }, []);

    return {hours, date};
};

export default useHours;