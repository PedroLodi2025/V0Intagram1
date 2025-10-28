
import React, { useState, useEffect } from 'react';

interface StoryPreviewProps {
    images: string[];
}

export const StoryPreview: React.FC<StoryPreviewProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-lg">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    alt={`Story slide ${index + 1}`}
                />
            ))}
            <div className="absolute top-2 left-0 right-0 flex gap-1 px-2">
                {images.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 rounded-full bg-white/30">
                        <div
                            className={`h-full rounded-full bg-white ${idx === currentIndex ? 'animate-progress' : idx < currentIndex ? 'w-full' : 'w-0'}`}
                            style={{ animation: idx === currentIndex ? 'progress 3s linear forwards' : undefined }}
                        />
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                .animate-progress {
                    animation: progress 3s linear forwards;
                }
            `}</style>
        </div>
    );
};
