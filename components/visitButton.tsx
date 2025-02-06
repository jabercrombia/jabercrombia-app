import Link from "next/link";

interface ButtonProps {
    bg: string;
    btnText: string;
    textColor: string;
    linkDestination: string;
    buttonLocation: boolean;
}

const Button = ({bg, btnText, textColor, linkDestination, buttonLocation}: ButtonProps) => {
    return (

        <Link className={`block w-1/6 text-center bg-${bg} hover:bg-slate-800 mt-5 px-1 py-1 text-${textColor} ${buttonLocation ? 'float-end' : 'float-start'}`} href={`/` + linkDestination}>
            {btnText}
        </Link>

    )
};
    
export default Button;