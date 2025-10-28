import React, { useContext, useState } from 'react';
import { Button } from '../ui/Button';
import { PlusCircle, Menu, Sun, Moon, Instagram } from 'lucide-react';
import { AppContext } from '../../contexts/AppContext';
import { InstagramConnectModal } from '../instagram/InstagramConnectModal';

interface HeaderProps {
    onOpenCreateModal: () => void;
    onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal, onToggleSidebar }) => {
    const context = useContext(AppContext);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    
    if (!context) {
        return null;
    }

    const { theme, setTheme, isInstagramConnected } = context;
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            <header className="flex justify-between items-center p-4 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                     <button onClick={onToggleSidebar} className="md:hidden text-gray-600 dark:text-gray-300">
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gold">Postador Automático do Instagram</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Button 
                        variant={isInstagramConnected ? 'secondary' : 'outline'}
                        onClick={() => setIsConnectModalOpen(true)}
                        className={`${isInstagramConnected ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800' : ''}`}
                    >
                        <Instagram className="mr-2 h-4 w-4" />
                        {isInstagramConnected ? 'Conectado' : 'Conectar com Instagram'}
                    </Button>

                    <Button onClick={onOpenCreateModal}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Criar Novo Post
                    </Button>
                     <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </header>
            {isConnectModalOpen && (
                <InstagramConnectModal
                    isOpen={isConnectModalOpen}
                    onClose={() => setIsConnectModalOpen(false)}
                />
            )}
        </>
    );
};
