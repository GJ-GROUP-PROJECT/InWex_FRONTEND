const ImageContent = ({ background, alt = "Background", position = "right" }) => {
    // Different styles based on position
    const getContainerStyles = () => {
        if (position === "left") {
            // Shadow to the right + rounded corners on right
            return "w-full md:w-1/2 h-screen overflow-hidden rounded-tr-2xl rounded-br-2xl";
        } else {
            // position === "right" (default) - Shadow to the left + rounded corners on left
            return "w-full md:w-1/2 h-screen overflow-hidden rounded-tl-2xl rounded-bl-2xl";
        }
    };

    const getImageStyles = () => {
        if (position === "left") {
            // Left side: shadow to the right, image flipped
            return "w-full h-full object-cover transform scale-x-[-1] shadow-2xl";
        } else {
            // Right side: shadow to the left, normal image
            return "w-full h-full object-cover shadow-2xl";
        }
    };

    const containerStyle = position === "left" ? {
        boxShadow: "20px 0px 50px rgba(0,0,0,0.5)"
    } : {
        boxShadow: "-20px 0px 50px rgba(0,0,0,0.5)"
    };

    return (
        <div className={getContainerStyles()} style={containerStyle}>
            <img
                src={background}
                alt={alt}
                className={getImageStyles()}
            />
        </div>
    );
};

export default ImageContent