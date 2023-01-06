import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

import classNames from "classnames";
import { IconProps } from "phosphor-react";

type ButtonProps = {
    color: "blue" | "yellow" | "green" | "red";
    children: ReactNode;
    onClick: () => void;
    icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}

const Button = ({color, children, icon, onClick}: ButtonProps) => {
    const Icon = icon;
    return (
        <button
            onClick={onClick}
            className={classNames("flex gap-2 justify-between items-center rounded text-sm font-semibold text-white-50 py-2 px-3 transition-color",
            {"bg-blue-500 hover:bg-blue-600": color === "blue"},
            {"bg-yellow-500 hover:bg-yellow-600": color === "yellow"},
            {"bg-green-500 hover:bg-green-600": color === "green"},
            {"bg-red-500 hover:bg-red-600": color === "red"})}
        >
            { Icon && <Icon size={18}/> }
            { children }
        </button>
    )
}

export default Button;