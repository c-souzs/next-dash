import React from "react";
import { ProductCtx } from "../../contexts/Products";
import { ProductAlertsType } from "../../types/product";
import Alert from "../elements/Alert";

const ProductAlerts = ({ending, excess, expectedProfit}: ProductAlertsType) => {
    const { setAlerts, alerts } = React.useContext(ProductCtx);
    React.useEffect(() => setAlerts({ending, excess, expectedProfit}), []);
    
    const { ending: enA, excess: exA, expectedProfit: expA } = alerts;

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-white-50 mb-3">Avisos ⚠️</h3>
            <div className="grid grid-cols-3 gap-6">
                <Alert title="Lucro esperado" text={`Baseado no estoque e valores de cada produto calculamos que seu lucro esperado é de R$ ${expA}.`}  />
                <Alert title="Esgotando" text={`Atenção, á ${enA} produtos abaixo de 15 unidades no estoque. Reponha`}  />
                <Alert title="Em execesso" text={`Atenção, á ${exA} produtos acima de 100 unidades no estoque. Faça uma promoção.`}  />
            </div>
        </div>
    )
}

export default ProductAlerts;