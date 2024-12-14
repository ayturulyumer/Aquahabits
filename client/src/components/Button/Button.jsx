

export default function Button({ variant = "btn-primary",
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
    ...props }) {

    const baseClass = `btn   uppercase ${variant} ${size}`;

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

    return (
        <button type={type} onClick={onClick} className={`${baseClass} ${optionalModifiers} ${className}`}>
            {iconLeft && (
                <span className="mr-2 flex items-center">
                    <img className="h-6 w-6" src={iconLeft} alt={iconAlt} />
                </span>
            )}
            {children}
            {iconRight && (
                <span className="ml-2 flex items-center">
                    <img className="h-6 w-6" src={iconRight} alt={iconAlt} />
                </span>
            )}
        </button>
    )
}
