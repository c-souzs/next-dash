import React from "react";
import { ProductCtx } from "../../contexts/Products";

import { ProductCards } from "../../types/product";
import { labelsMonths } from "../../utils/graphic";
import Card from "../elements/Card";

const CardsProducts = ({categories, spending}: ProductCards) => {
    const { cards, setCards } = React.useContext(ProductCtx);
    React.useEffect(() => setCards({categories, spending}),  []);

    const { categories: cC, spending: sC } = cards;
    const spendignValue = sC.reduce((acc, v) => acc+=v, 0);

    const labelCategories = cC.map(({name}) => name);
    const categoriesValue = cC.map(({amount}) => amount);
    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-white-50 mb-3">Estatásticas 📊</h3>
            <div className="grid grid-cols-2 gap-6">
                <Card 
                    type="line"
                    title="Gastos com produtos"
                    value={`R$ ${spendignValue}`}
                    labelGraphic="Em R$"
                    labelDescription={labelsMonths}
                    dataGraphic={spending}
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

export default CardsProducts;