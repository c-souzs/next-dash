import React, { createContext, ReactNode } from "react";
import { ProductAlertsType, ProductApi, ProductCards } from "../types/product";

import { api } from "../utils/api";
import { GlobalCtx } from "./Global";

type ProductProviderProps = {
    children: ReactNode;
}

type ProductCtxType = {
    products: ProductApi[];
    setProducts: React.Dispatch<React.SetStateAction<ProductApi[]>>;
    cards: ProductCards;
    setCards: React.Dispatch<React.SetStateAction<ProductCards>>;
    alerts: ProductAlertsType;
    setAlerts: React.Dispatch<React.SetStateAction<ProductAlertsType>>;
}

const initialValue = {
    products: [],
    setProducts: () => {},
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
    const [products, setProducts] = React.useState<ProductApi[]>(initialValue.products);
    const [cards, setCards] = React.useState(initialValue.cards);
    const [alerts, setAlerts] = React.useState(initialValue.alerts);
    const { refresh, setRefresh } = React.useContext(GlobalCtx);

    const refreshItems = async () => {
        const listProducts = await api.get<{data: ProductApi[]}>("product");
        const listCards = await api.get<{data: ProductCards}>("product/cards");
        const listAlerts = await api.get<{data: ProductAlertsType}>("product/alerts");

        if(listProducts.status !== 200 && listCards.status !== 200 && listAlerts.status !== 200) return;

        const { data: { data: dataListProducts } } = listProducts;
        const { data: { data: dataListCards } } = listCards;
        const { data: { data: dataAlerts } } = listAlerts;

        setAlerts(dataAlerts);
        setCards(dataListCards);
        setProducts(dataListProducts);
        setRefresh(false);
    }

    React.useEffect(() => {
        if(refresh) refreshItems();
    }, [refresh]);

    return (
        <ProductCtx.Provider value={{products, cards, alerts, setAlerts, setCards, setProducts}}>
            {children}
        </ProductCtx.Provider>
    )
}