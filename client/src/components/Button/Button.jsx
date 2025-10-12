export default function Button({
    variant = "btn-primary",
    size = "btn-md",
    isWide = false,
    type = "submit",
    isBlock = false,
    isCircle = false,
    isSquare = false,
    glass = false,
    noAnimation = false,
    disabled = false,
    iconLeft = null,
    iconAlt = "",
    iconRight = null,
    children,
    className = "",
    onClick,
    ...props
}) {
    const baseClass = `btn  ${variant} ${size}`;

    // Extra props from daisyui
    const optionalModifiers = `
        ${isWide ? "btn-wide" : ""}
        ${isBlock ? "btn-block" : ""}
        ${isCircle ? "btn-circle" : ""}
        ${isSquare ? "btn-square" : ""}
        ${glass ? "glass" : ""}
        ${noAnimation ? "no-animation" : ""}
        ${disabled ? "btn-disabled" : ""}
    `.trim();

    // Check if there is no children (text) to center the icon
    const isIconOnly = !children && (iconLeft || iconRight);

    return (
        <button type={type} onClick={onClick} className={`${baseClass} ${optionalModifiers} ${className}`}>
            {(iconLeft || iconRight) && !children && (
                <span className={`flex items-center  justify-center ${isIconOnly ? "w-full h-full" : ""}`}>
                    {iconLeft && (
                        <img className="h-6 w-6" src={iconLeft} alt={iconAlt} />
                    )}
                    {iconRight && (
                        <img className="h-6 w-6" src={iconRight} alt={iconAlt} />
                    )}
                </span>
            )}

            {children && (
                <>
                    {iconLeft && (
                        <span className="flex items-center">
                            <img className="h-6 w-6" src={iconLeft} alt={iconAlt} />
                        </span>
                    )}
                    {children}
                    {iconRight && (
                        <span className=" flex items-center">
                            <img className="h-6 w-6" src={iconRight} alt={iconAlt} />
                        </span>
                    )}
                </>
            )}
        </button>
    );
}
