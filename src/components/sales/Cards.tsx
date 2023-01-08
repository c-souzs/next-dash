import React from "react";

import { SaleCtx } from "../../contexts/Sale";
import { SaleCards } from "../../types/sale";
import { labelsMonths } from "../../utils/graphic";
import Card from "../elements/Card";

const CardsSales = ({categories, value}: SaleCards) => {
    const { cards, setCards } = React.useContext(SaleCtx);
    React.useEffect(() => setCards({categories, value}),  []);

    const { categories: cC, value: vC } = cards;
    const spendignValue = vC.reduce((acc, v) => acc+=v, 0);

    const labelCategories = cC.map(({name}) => name);
    const categoriesValue = cC.map(({valueCategory}) => valueCategory);
    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-white-50 mb-3">Estatásticas 📊</h3>
            <div className="grid grid-cols-2 gap-6">
                <Card 
                    type="line"
                    title="Valores de vendas"
                    value={`R$ ${spendignValue}`}
                    labelGraphic="Em R$"
                    labelDescription={labelsMonths}
                    dataGraphic={value}
                />
                <Card 
                    type="pie"
                    title="Por categoria"
                    value={`${categories.length} categorias disponíveis`}
                    labelGraphic="Em unds"
                    labelDescription={labelCategories}
                    dataGraphic={categoriesValue}
                />
            </div>
        </div>
    )
}

export default CardsSales;