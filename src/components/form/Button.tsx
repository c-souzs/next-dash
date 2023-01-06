import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => <button type="submit" className="bg-blue-500 rounded text-lg font-semibold text-white-50 py-2 px-4 mt-4 transition-colors hover:bg-blue-600 disabled:opacity-50" {...rest}>{children}</button>;

export default Button;