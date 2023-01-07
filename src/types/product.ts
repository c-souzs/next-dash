import { Category, Product } from "@prisma/client";

export type ProductApi = Product & { category: Category };

export type ProductContentModal = {
    type: "view" | "register" | "update";
    productSelect?: ProductApi;
}

export type ProductCards = {
    categories: {
        name: string;
        amount: number;
    }[];
    spending: number[];
}

export type ProductAlertsType = {
    ending: number;
    excess: number;
    expectedProfit: number;
}