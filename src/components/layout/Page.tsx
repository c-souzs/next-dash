import { ReactNode } from "react";

import useHours from "../../hooks/useHours";

type LayoutPageProps = {
    children: ReactNode;
    title: string;
}

const LayoutPage = ({ children, title }: LayoutPageProps) => {
    const { date, hours } = useHours();
    
    return (
        <section className="w-full p-5 overflow-y-scroll overflow-x-hidden relative">
            <div className="flex items-end justify-between border-b border-black-700 pb-4">
                <h2 className="text-white-50 text-3xl font-semibold">{ title }</h2>
                {
                    date && hours && (
                        <span className="text-sm font-semibold text-white-500">{ date } às { hours }</span>
                    )
                }
            </div>
            {
                children
            }
        </section>
    )
};

export default LayoutPage;