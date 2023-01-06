import React from "react";
import { GlobalCtx } from "../../contexts/Global";

import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";

const ProfileAside = () => {
    const { showAside } = React.useContext(GlobalCtx);
    const { data: session } = useSession();
    if(!session) return null;

    const { user } = session;
    const { name, image } = user;

    return (
        <div className="p-2">
            <p className={classNames("text-sm text-white-50 font-medium mb-1", {"hidden": !showAside})}>Deslogar:</p>
            <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-center text-sm font-medium text-white-50 gap-2 p-2 py-1 rounded border border-black-700"
            >
                <img src={image} alt={name} className="w-8"/>
                {showAside && name}
            </button>
        </div>
    )
}

export default ProfileAside;