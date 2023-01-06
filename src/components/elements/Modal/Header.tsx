import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconProps } from "phosphor-react";

type HeaderModalProps = {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    title: string;
}

const HeaderModal = ({ icon, title }: HeaderModalProps) => {
    const Icon = icon;

    return (
        <div className="flex items-center gap-2 mb-6">
            <Icon size={24} color='#456AED'/>
            <h3 className="text-2xl text-white-50 font-semibold">{ title }</h3>
        </div>
    )
}

export default HeaderModal;