"use client"

import Link from "next/link";
import { sendGTMEvent } from '@next/third-parties/google'

interface ButtonProps {
    bg: string;
    btnText: string;
    textColor: string;
    linkDestination: string;
    buttonLocation: boolean;
    linkDestinationExternal: boolean;
    classes: string;
}

const Button = ({bg, btnText, textColor, linkDestination, linkDestinationExternal, buttonLocation, classes}: ButtonProps) => {
    return (

        <Link onClick={() => sendGTMEvent({ event: 'buttonClicked', value: linkDestination })} className={`${classes} block text-center bg-${bg} hover:bg-slate-800 mt-5 px-[10px] py-1 text-${textColor} ${buttonLocation ? 'lg:float-end' : 'lg:float-start'}`} href={`${linkDestinationExternal ? linkDestination : '/' + linkDestination}`}>
            {btnText}
        </Link>

    )
};
    
export default Button;