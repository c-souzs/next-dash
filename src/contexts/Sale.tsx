import React, { createContext, ReactNode } from "react";
import { ProductAlertsType, ProductApi, ProductCards } from "../types/product";
import { SaleAlerts, SaleApi, SaleCards } from "../types/sale";

import { api } from "../utils/api";
import { GlobalCtx } from "./Global";

type SaleProviderProps = {
    children: ReactNode;
}

type SaleCtxType = {
    sales: SaleApi[];
    setSales: React.Dispatch<React.SetStateAction<SaleApi[]>>;
    cards: SaleCards;
    setCards: React.Dispatch<React.SetStateAction<SaleCards>>;
    alerts: SaleAlerts;
    setAlerts: React.Dispatch<React.SetStateAction<SaleAlerts>>;
}

const initialValue = {
    sales: [],
    setSales: () => {},
    cards: {
        value: [] as number[],
        categories: [] as {name: string; valueCategory: number}[]
    },
    setCards: () => {},
    alerts: {
        moreSale: {
            amountSale: 0,
            sale: {}
        },
        profitSales: 0,
        salesMouth: 0
    } as SaleAlerts,
    setAlerts: () => {}
}

export const SaleCtx = createContext<SaleCtxType>(initialValue);

export const SaleProvider = ({ children }: SaleProviderProps) => {
    const [sales, setSales] = React.useState<SaleApi[]>(initialValue.sales);
    const [cards, setCards] = React.useState(initialValue.cards);
    const [alerts, setAlerts] = React.useState(initialValue.alerts);

    const { refresh, setRefresh } = React.useContext(GlobalCtx);

    const refreshItems = async () => {
        const listSales = await api.get<{data: SaleApi[]}>("sale");
        const listCards = await api.get<{data: SaleCards}>("sale/cards");
        const listAlerts = await api.get<{data: SaleAlerts}>("sale/alerts");

        if(listSales.status !== 200 && listCards.status !== 200 && listAlerts.status !== 200) return;

        const { data: { data: dataListSales } } = listSales;
        const { data: { data: { categories, value } } } = listCards;
        const { data: { data: { moreSale, profitSales, salesMouth } } } = listAlerts;
        
        setAlerts({moreSale, profitSales, salesMouth});
        setSales(dataListSales);
        setCards({categories, value});
        setRefresh(false);
    }

    React.useEffect(() => {
        if(refresh) refreshItems();
    }, [refresh]);

    return (
        <SaleCtx.Provider value={{ sales, cards,alerts, setAlerts, setCards, setSales }}>
            {children}
        </SaleCtx.Provider>
    )
}