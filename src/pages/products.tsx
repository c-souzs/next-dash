import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import LayoutMain from "../components/layout/Main";
import ProductAlerts from "../components/products/Alerts";
import CardsProducts from "../components/products/Cards";
import RegisterProducts from "../components/products/Register";
import TableProducts from "../components/products/Table";
import { ProductsProvider } from "../contexts/Products";
import { getAlerts } from "../lib/product/getAlerts";
import { getAllProducts } from "../lib/product/getAll";
import { getCards } from "../lib/product/getCards";
import { ProductAlertsType, ProductApi, ProductCards } from "../types/product";
import { authOptions } from "./api/auth/[...nextauth]";

type ProductsProps = {
    products: ProductApi[];
    cards: ProductCards;
    alerts: ProductAlertsType;
}

const Products = ({ products, cards, alerts }: ProductsProps) => {
    const { categories, spending } = cards;
    const { ending, excess, expectedProfit } = alerts;
    return (
        <LayoutMain title="Produtos" >
            <ProductsProvider>
                <RegisterProducts />
                <ProductAlerts ending={ending} excess={excess} expectedProfit={expectedProfit}/>
                <CardsProducts categories={categories} spending={spending}/>
                <TableProducts products={products}/>
            </ProductsProvider>
        </LayoutMain>
    )
}

export default Products;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!(session )) {
        return {
            redirect: { destination: '/', permanent: true }
        }
    }

    const products = await getAllProducts();
    const cards = await getCards();
    const alerts = await getAlerts();

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            cards, alerts
        }
    }
}