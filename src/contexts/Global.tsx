import React, { createContext, ReactNode } from "react";

type GlobalProviderProps = {
    children: ReactNode;
}

type GlobalCtxType = {
    showAside: boolean;
    setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValue = {
    showAside: true,
    setShowAside: () => {}
}

export const GlobalCtx = createContext<GlobalCtxType>(initialValue);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [showAside, setShowAside] = React.useState(initialValue.showAside);

    return (
        <GlobalCtx.Provider value={{ showAside, setShowAside }}>
            {children}
        </GlobalCtx.Provider>
    )
}