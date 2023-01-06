import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalCtx } from "../../contexts/Global";

import classNames from "classnames";
import { UsersThree, Tote, Coins } from "phosphor-react";

const dataNav = [
    {
        id: 33371,
        label: "Dados",
        options: [
            {
                id: 1101,
                text: "Vendas",
                href: "/",
                icon: Coins,
            },
            {
                id: 1102,
                text: "Produtos",
                icon: Tote,
                href: "/products",
            }
        ]
    },
    {
        id: 33372,
        label: "Administração",
        options: [
            {
                id: 1101,
                text: "Funcionários",
                href: "/employees",
                icon: UsersThree,
            }
        ]
    }
]

const NavAside = () => {
    const router = useRouter();
    const { showAside } = React.useContext(GlobalCtx);

    return (
        <nav>
            <div className="mt-2 px-2">
                {
                    dataNav.map(({id, label, options}) => {
                        return (
                            <div className="mt-4 first:mt-0" key={id}>
                                <h3 className={classNames("font-semibold text-sm text-white-600", {"hidden": !showAside})}> { label } </h3>
                                <ul className="mt-3 flex flex-col gap-y-2">
                                    {
                                        options.map(({ id, text, icon, href }) => {
                                            const Icon = icon;

                                                return (
                                                    <li key={id}>
                                                        <Link href={href} className={classNames("flex items-center gap-x-2 p-2 text-base text-white-50 rounded transition-colors hover:bg-black-700", { "bg-black-700": router.pathname === `${href}`})}>
                                                            <Icon size={24} color="#fff"/>
                                                            { showAside && text }
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        </nav>
    )
}

export default NavAside;