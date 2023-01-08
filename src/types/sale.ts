import { Sale } from "@prisma/client";

export type SaleApi = (Sale & {
    user: {
        name: string;
    };
    product: {
        category: {
            name: string;
            id: number;
        };
        name: string;
    };
});

export type SaleCards = {
    value: number[];
    categories: {
        name: string;
        valueCategory: number;
    }[];
}

export type SaleContentModal = {
    type: "view" | "register" | "update";
    saleSelect?: SaleApi;
}

export type SaleAlerts = {
    profitSales: number;
    salesMouth: number;
    moreSale: {
        sale: SaleApi | null;
        amountSale: number;
    };
}