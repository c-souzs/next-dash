import { GetServerSideProps } from "next"
import { SaleProvider } from "../contexts/Sale";

import  Head  from "next/head";
import LayoutMain from "../components/layout/Main";
import AlertsSales from "../components/sales/Alerts";
import CardsSales from "../components/sales/Cards";
import RegisterSales from "../components/sales/Register";
import TableSale from "../components/sales/Table";

import { getAlertsSales } from "../lib/sale/getAlerts";
import { getAllSales } from "../lib/sale/getAll";
import { getCardsSales } from "../lib/sale/getCards";
import { SaleAlerts, SaleApi, SaleCards } from "../types/sale";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type SalesProps = {
  sales: SaleApi[];
  cards: SaleCards,
  alerts: SaleAlerts
}

const Sales = ({ sales, cards, alerts }: SalesProps) => {
  const { categories, value } = cards;
  const { moreSale, profitSales, salesMouth } = alerts;

  return (
    <>
      <Head>
        <title>Vendas - Dash next</title>
      </Head>
      <LayoutMain title="Vendas">
        <SaleProvider>
          <RegisterSales />
          <AlertsSales moreSale={moreSale} profitSales={profitSales} salesMouth={salesMouth}/>
          <CardsSales categories={categories} value={value}/>
          <TableSale sales={sales}/>
        </SaleProvider>
      </LayoutMain>
    </>
  )
}

export default Sales;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!(session )) {
        return {
            redirect: { destination: '/', permanent: true }
        }
    }
    const sales = await getAllSales();
    const cards = await getCardsSales();
    const alerts = await getAlertsSales();

    return {
        props: {
            sales: JSON.parse(JSON.stringify(sales)),
            cards, 
            alerts: JSON.parse(JSON.stringify(alerts))
        }
    }
}
