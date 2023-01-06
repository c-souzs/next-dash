import { ReactNode } from "react";

export type Notify = {
    show: boolean;
    type: 'success' | 'failure'
}

export type ContentModal = "view" | "register" | "update" | null;

export type BasicContext = {
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    notify: Notify;
    setNotify: React.Dispatch<React.SetStateAction<Notify>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    contentModal: ContentModal;
    setContentModal: React.Dispatch<React.SetStateAction<ContentModal>>;
}
