import React from "react";

import { SaleCtx } from "../../contexts/Sale";
import { SaleAlerts } from "../../types/sale";
import { formatBr } from "../../utils/formatDate";
import Alert from "../elements/Alert";

const AlertsSales = ({moreSale, profitSales, salesMouth}: SaleAlerts) => {
    const {alerts, setAlerts } = React.useContext(SaleCtx);
    React.useEffect(() => setAlerts({moreSale, profitSales, salesMouth}), []);

    const { moreSale: mS, profitSales: pS, salesMouth: sM } = alerts;
    const { sale } = mS;
    const dateActual = new Date();
    const dateFormat = formatBr(dateActual);

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-white-50 mb-3">Avisos ⚠️</h3>
            <div className="grid grid-cols-3 gap-6">
                <Alert title="Total de vendas" text={`De acordo com o registro de vendas você já vendeu R$ ${pS}.`}  />
                <Alert title="Vendas mensais" text={`Até o dia ${dateFormat} o sistema registrou um valor de R$ ${sM}`}  />
                <Alert title="Produto mais vendido" text={`Com ${mS.amountSale} unidades vendidas, o produto: ${sale?.product?.name} é o mais vendido.`}  />
            </div>
        </div>
    )
}

export default AlertsSales;