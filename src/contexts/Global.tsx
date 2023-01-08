import { Category, Office } from "@prisma/client";
import React, { createContext, ReactNode } from "react";
import Modal from "../components/elements/Modal";
import Notification from "../components/elements/Notification";
import { Notify } from "../types/global";
import { ProductApi } from "../types/product";
import { api } from "../utils/api";

type GlobalProviderProps = {
    children: ReactNode;
}

type GlobalCtxType = {
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    notify: Notify;
    setNotify: React.Dispatch<React.SetStateAction<Notify>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    contentModal: ReactNode | null;
    setContentModal: React.Dispatch<React.SetStateAction<ReactNode | null>>;
    showAside: boolean;
    setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
    positions: Office[];
    setPositions: React.Dispatch<React.SetStateAction<Office[]>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    products: ProductApi[];
    setProducts: React.Dispatch<React.SetStateAction<ProductApi[]>>;
}

const initialValue = {
    refresh: false,
    setRefresh: () => {},
    showAside: true,
    setShowAside: () => {},
    positions: [],
    setPositions: () => {},
    showModal: false,
    setShowModal: () => {},
    contentModal: null,
    setContentModal: () => {},
    notify: {
        show: false,
        type: 'success'
    } as Notify,
    setNotify: () => {},
    categories: [],
    setCategories: () => {},
    products: [],
    setProducts: () => {},
}

export const GlobalCtx = createContext<GlobalCtxType>(initialValue);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [showAside, setShowAside] = React.useState(initialValue.showAside);
    const [notify, setNotify] = React.useState(initialValue.notify);
    const [showModal, setShowModal] = React.useState(initialValue.showModal);
    const [contentModal, setContentModal] = React.useState<ReactNode | null>(initialValue.contentModal);
    const [refresh, setRefresh] = React.useState(initialValue.refresh);
    
    const [positions, setPositions] = React.useState<Office[]>(initialValue.positions);
    const [categories, setCategories] = React.useState<Category[]>(initialValue.categories);
    const [products, setProducts] = React.useState<ProductApi[]>(initialValue.products);

    const getOfficies = async () => {
        try {
            const listOfficies = await api.get<{data: { positions: Office[]} }>("office");
            
            if(listOfficies.status !== 200) {
                setNotify({
                    show: true,
                    type: "failure"
                });

                return;
            };

            const { data: { data: { positions } } } = listOfficies;
            
            setPositions(positions);
        } catch (e) {
            console.log(e);
        }
    }

    const getCategories = async () => {
        const listCategories = await api.get<{data: { categories: Category[] }}>("category");

        if(listCategories.status !== 200) {
            setNotify({
                show: true,
                type: "failure"
            });

            return;
        };

        const { data: { data: { categories } } } = listCategories;

        setCategories(categories);
    }

    const getProducts = async () => {
        const listProducts = await api.get<{data: ProductApi[]}>("product");

        if(listProducts.status !== 200) {
            setNotify({
                show: true,
                type: "failure"
            });
            
            return;
        };

        const { data: { data: dataListProducts } } = listProducts;

        setProducts(dataListProducts);
    }

    React.useEffect(() => {
        if(refresh) getProducts();
    }, [refresh]);

    React.useEffect(() => {
        getOfficies();
        getCategories();
        getProducts();
    }, []);

    return (
        <GlobalCtx.Provider value={{ showAside, positions, notify, showModal, contentModal, refresh, categories, products, setProducts, setCategories, setRefresh, setContentModal, setNotify, setShowModal, setPositions, setShowAside }}>
            <Notification show={notify.show} hideNotification={() => setNotify({show: false, type: 'success'})} type={notify.type}/>
            <Modal onClose={() => setShowModal(false)} show={showModal}>
                {contentModal && contentModal}
            </Modal>
            {children}
        </GlobalCtx.Provider>
    )
}