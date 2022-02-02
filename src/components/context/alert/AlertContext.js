import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const initialState = {
        msg: "",
        type: "none",
    };

    const [state, dispatch] = useReducer(alertReducer, initialState);

    return (
        <AlertContext.Provider
            value={{ alert: state, dispatchAlert: dispatch }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
