type AlertProps = {
    title: string;
    text: string;
}

const Alert = ({ text, title }: AlertProps) => {
    return (
        <div className="text-white-50 border border-black-700 rounded py-2 px-4 bg-opacity-80">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm">{text}</p>
        </div>
    )
}

export default Alert;