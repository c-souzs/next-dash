import { ReactNode } from "react";

type ErrorProps = {
    children: ReactNode;
}

const Error = ({ children }: ErrorProps) => <p className="text-sm font-semibold text-red-500">{ children }</p>;

export default Error;