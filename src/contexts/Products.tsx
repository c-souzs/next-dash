import React, { createContext, ReactNode } from "react";
import { ProductAlertsType, ProductApi, ProductCards } from "../types/product";

import { api } from "../utils/api";
import { GlobalCtx } from "./Global";

type ProductProviderProps = {
    children: ReactNode;
}

type ProductCtxType = {
    cards: ProductCards;
    setCards: React.Dispatch<React.SetStateAction<ProductCards>>;
    alerts: ProductAlertsType;
    setAlerts: React.Dispatch<React.SetStateAction<ProductAlertsType>>;
}

const initialValue = {
    cards: {
        categories: [] as {name: string; amount: number}[],
        spending: [] as number[]
    },
    setCards: () => {},
    alerts: {
        ending: 0,
        excess: 0,
        expectedProfit: 0
    },
    setAlerts: () => {}
}

export const ProductCtx = createContext<ProductCtxType>(initialValue);

export const ProductsProvider = ({ children }: ProductProviderProps) => {
    const [cards, setCards] = React.useState(initialValue.cards);
    const [alerts, setAlerts] = React.useState(initialValue.alerts);
    
    const { refresh, setRefresh, setNotify } = React.useContext(GlobalCtx);

    const refreshItems = async () => {
        const listCards = await api.get<{data: ProductCards}>("product/cards");
        const listAlerts = await api.get<{data: ProductAlertsType}>("product/alerts");

        if(listCards.status !== 200 && listAlerts.status !== 200) {
            setNotify({
                show: true,
                type: "failure"
            });

            return;
        };

        const { data: { data: dataListCards } } = listCards;
        const { data: { data: dataAlerts } } = listAlerts;

        setAlerts(dataAlerts);
        setCards(dataListCards);
        setRefresh(false);
    }

    React.useEffect(() => {
        if(refresh) refreshItems();
    }, [refresh]);

    return (
        <ProductCtx.Provider value={{ cards, alerts, setAlerts, setCards }}>
            {children}
        </ProductCtx.Provider>
    )
}