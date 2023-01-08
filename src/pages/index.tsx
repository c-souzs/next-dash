import { GetServerSideProps } from "next"
import { signIn, useSession } from "next-auth/react"
import { SaleProvider } from "../contexts/Sale";

import LayoutMain from "../components/layout/Main";
import AlertsSales from "../components/sales/Alerts";
import CardsSales from "../components/sales/Cards";
import RegisterSales from "../components/sales/Register";
import TableSale from "../components/sales/Table";

import { getAlertsSales } from "../lib/sale/getAlerts";
import { getAllSales } from "../lib/sale/getAll";
import { getCardsSales } from "../lib/sale/getCards";
import { SaleAlerts, SaleApi, SaleCards } from "../types/sale";

type SalesProps = {
  sales: SaleApi[];
  cards: SaleCards,
  alerts: SaleAlerts
}

const Sales = ({ sales, cards, alerts }: SalesProps) => {
  const { status: sessionStatus } = useSession();
  const { categories, value } = cards;
  const { moreSale, profitSales, salesMouth } = alerts;
  
  if(sessionStatus === "unauthenticated") signIn();

  return (
    <LayoutMain title="Vendas">
      <SaleProvider>
        <RegisterSales />
        <AlertsSales moreSale={moreSale} profitSales={profitSales} salesMouth={salesMouth}/>
        <CardsSales categories={categories} value={value}/>
        <TableSale sales={sales}/>
      </SaleProvider>
    </LayoutMain>
  )
}

export default Sales;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;

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
