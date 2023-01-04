import { ReactNode } from "react";
import Aside from "../aside";

//import StructureAside from "../aside/Structure";

type LayoutMainProps = {
    children: ReactNode;
}

const LayoutMain = ({ children }: LayoutMainProps) => {
    return (
        <main className='h-screen bg-black-800 flex'>
            <Aside />
            {children}
        </main>
    )
}

export default LayoutMain;