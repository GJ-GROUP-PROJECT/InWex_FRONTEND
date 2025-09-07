const ImageContent = ({ background, alt = "Background" }) => {
    return (
        <div className="w-full md:w-1/2 h-screen overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)] rounded-tl-2xl rounded-bl-2xl">
            <img
                src={background}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default ImageContent