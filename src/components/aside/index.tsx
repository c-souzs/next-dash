import React from "react";
import { GlobalCtx } from "../../contexts/Global";

import classNames from "classnames";

import HeaderAside from "./Header";
import NavAside from "./Nav";
import ProfileAside from "./Profile";

const Aside = () => {
    const { showAside } = React.useContext(GlobalCtx);

    return (
        <aside className={classNames("h-full border-r border-black-700 flex flex-col justify-between transition-width", {"w-64": showAside}, {"w-20": !showAside})}>
            <div className={classNames({"flex flex-col items-center": !showAside})}>
                <HeaderAside />
                <NavAside />
            </div>
            <ProfileAside />
        </aside>
    )
}

export default Aside;