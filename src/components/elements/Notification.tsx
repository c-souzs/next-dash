import React from "react";

import classNames from "classnames";
import { useInterval } from "../../hooks/useInterval";

type NotificationProps = {
    type: 'success' | 'failure';
    show: boolean;
    hideNotification: () => void;
}

const Notification = ({ type, hideNotification, show }: NotificationProps) => {
    
    useInterval(() => {
        hideNotification();
    }, type === "failure" ? 10000 : 5000);

    return (
        <>
            <div id="toast-success" className={classNames('flex absolute z-50 top-[20px] translate-x-[calc(100%+35px)] transition-notificy right-[35px] items-center p-4 mb-4 w-full max-w-xs text-white-50 bg-white rounded-lg shadow bg-black-700', {'translate-x-0': show})} role="alert">
                <div className={classNames('inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg text-black-900', {'bg-green-500': type === 'success'}, {'bg-red-500': type === 'failure'})}>
                    {
                        type === 'success' ? (
                            <>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                    </path>
                                </svg>
                                <span className="sr-only">Check icon</span>
                            </>
                        ) : (
                            <>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                                    </path>
                                </svg>
                                <span className="sr-only">Error icon</span>
                            </>
                        )
                    }
                </div>
                <div className="ml-3 text-sm font-normal">
                    {type === 'success' ? 'Ação realizada com sucesso.' : 'Erro ao relizar ação.'}
                </div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-white-50 rounded p-1.5 inline-flex h-8 w-8 hover:bg-black-600" data-dismiss-target="#toast-success" aria-label="Close" onClick={hideNotification}>
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        </>
    )
}

export default Notification;