const Button = ({bg, btnText, textColor}) => {
    return (
        <>
            <button className={`bg-${bg} py-4 px-7 p-4 text-${textColor}`}>{btnText}hello</button>

        </>
    )
    };
    
    export default Button;