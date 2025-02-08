import Link from "next/link";

interface ButtonProps {
    bg: string;
    btnText: string;
    textColor: string;
    linkDestination: string;
    buttonLocation: boolean;
    linkDestinationExternal: boolean;
}

const Button = ({bg, btnText, textColor, linkDestination, linkDestinationExternal, buttonLocation}: ButtonProps) => {
    return (

        <Link className={`block text-center bg-${bg} hover:bg-slate-800 mt-5 px-[10px] py-1 text-${textColor} ${buttonLocation ? 'float-end' : 'float-start'}`} href={`${linkDestinationExternal ? linkDestination : '/' + linkDestination}`}>
            {btnText}
        </Link>

    )
};
    
export default Button;