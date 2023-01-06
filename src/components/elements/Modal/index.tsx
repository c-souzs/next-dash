import React, { ReactNode } from "react";
import ReactDOM from 'react-dom';

import { X } from "phosphor-react";

type ModalProps = {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ show, children, onClose }: ModalProps) => {
    const [renderModal, setRenderModal] = React.useState(false);
    React.useEffect(() => setRenderModal(true), []);

    const modalContent = show && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black-900 bg-opacity-50 flex items-center justify-center" >
            <div className="bg-black-800 rounded px-6 py-4 relative animate-movie-left">
                <button onClick={onClose} className="absolute top-[16px] right-[24px] flex items-center gap-2 px-2 py-2 rounded transition-colors hover:bg-black-700">
                    <X size={18} color="#fff"/>
                </button>
                { children }
            </div>
        </div>
    );

    if(renderModal) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-render')!
        );
    } else return null;
}

export default Modal;