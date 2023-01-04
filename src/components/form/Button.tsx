import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
}

const Button = ({ children }: ButtonProps) => <button type='submit' className="bg-blue-500 rounded text-lg font-semibold text-white-50 py-2 px-4 mt-4 transition-colors hover:bg-blue-600">{children}</button>;

export default Button;