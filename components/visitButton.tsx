"use client"

import Link from "next/link";

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
    
    const handleClick = () => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "visit_btn", {
            event_category: "User Interaction",
            event_label: btnText.toLocaleLowerCase() + '_' + linkDestination,
            value: 1,
            });
        }
    }; 

    return (

        <Link onClick={handleClick}  className={`${classes} block text-center bg-${bg} hover:bg-slate-800 mt-5 px-[10px] py-1 text-${textColor} ${buttonLocation ? 'lg:float-end' : 'lg:float-start'}`} href={`${linkDestinationExternal ? linkDestination : '/' + linkDestination}`}>
            {btnText}
        </Link>

    )
};
    
export default Button;