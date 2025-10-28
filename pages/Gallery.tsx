import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Gallery: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) return <div>Carregando...</div>;
    const { images } = context;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gold mb-2">Galeria de Imagens</h1>
                <p className="text-gray-500 dark:text-gray-400">Todas as imagens que você gerou.</p>
            </div>
            {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {images.map(image => (
                        <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg shadow-md">
                            <img src={image.url} alt={image.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end p-2">
                                <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">{image.prompt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="text-center py-20 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gold">Nenhuma imagem ainda</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Crie um novo post para gerar imagens!</p>
                </div>
            )}
        </div>
    );
};

export default Gallery;