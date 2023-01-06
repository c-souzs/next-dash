import React from "react";
import { GlobalCtx } from "../../contexts/Global";

import classNames from "classnames";
import { CaretDoubleLeft } from "phosphor-react";

const HeaderAside = () => {
    const { showAside, setShowAside } = React.useContext(GlobalCtx);

    return (
        <header>
            <div className="px-2 py-4 flex items-center justify-between">
                <strong className={classNames("text-white-50 text-xl uppercase leading-8", {"inline-block": showAside}, {"hidden": !showAside})}>Dash Next</strong>
                <button onClick={() => setShowAside(!showAside)} className="p-2 rounded transition-colors hover:bg-black-700">
                    <CaretDoubleLeft size={24} color="#fff" className={classNames("transition-transform", {"rotate-180": !showAside})}/>
                </button>
            </div>
        </header>
    )
}

export default HeaderAside;