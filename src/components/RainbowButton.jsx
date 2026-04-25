const RainbowButton = ({ children, onClick, className = "", borderRadius = "rounded-full", buttonClassName = "" }) => {
    return (
        <div className={`relative group inline-block ${className}`}>
            <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(90deg, rgba(255,255,255,0.2), #ffffff, rgba(255,255,255,0.2));
                    animation: rotate 4s linear infinite;
                }
            `}</style>
            {/* Note: User had bg-white/15, I'm keeping similar transparency but ensuring it works on dark bg */}
            <div className={`rainbow relative z-0 bg-white/10 overflow-hidden p-[2px] flex items-center justify-center ${borderRadius} hover:scale-105 transition duration-300 active:scale-100`}>
                <button
                    onClick={onClick}
                    className={`px-8 py-4 text-sm md:text-lg text-white ${borderRadius} font-medium bg-black/80 backdrop-blur w-full h-full flex items-center justify-center gap-2 ${buttonClassName}`}
                >
                    {children}
                </button>
            </div>
        </div>
    );
};

export default RainbowButton;
