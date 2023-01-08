import { ReactNode } from "react";
import useHours from "../../hooks/useHours";
import useMatchLayout from "../../hooks/useMatchLayout";

import Aside from "../aside";
import ResponsiveAlert from "../elements/ResponsiveAlert";

type LayoutMainProps = {
    children: ReactNode;
    title: string;
}

const LayoutMain = ({ children, title }: LayoutMainProps) => {
    const { date, hours } = useHours();
    const macthResponsive = useMatchLayout(1100);
    
    return (
        <main className="h-screen bg-black-800 flex">
            {
                macthResponsive ? (
                    <ResponsiveAlert />
                ) : (
                    <>        
                        <Aside />
                        <section className="w-full p-5 overflow-y-scroll overflow-x-hidden relative">
                        <div className="flex items-end justify-between border-b border-black-700 pb-4">
                            <h2 className="text-white-50 text-3xl font-semibold">{ title }</h2>
                            {
                                date && hours && (
                                    <span className="text-sm font-semibold text-white-500">{ date } às { hours }</span>
                                )
                            }
                            </div>
                            { children }
                        </section>
                    </>
                )
            }
        </main>
    )
}

export default LayoutMain;