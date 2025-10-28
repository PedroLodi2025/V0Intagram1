import React from 'react';
import { Home, LayoutGrid, GalleryHorizontal, Settings, X } from 'lucide-react';
import { Page } from '../../App';

interface SidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Painel', icon: Home },
    { id: 'posts', label: 'Meus Posts', icon: LayoutGrid },
    { id: 'gallery', label: 'Galeria', icon: GalleryHorizontal },
    { id: 'settings', label: 'Configurações', icon: Settings },
];

const logoUrl = 'https://i.imgur.com/UPly5RX.png';

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, isOpen, setIsOpen }) => {
   
    const NavLink: React.FC<{ id: Page, label: string, icon: React.ElementType }> = ({ id, label, icon: Icon }) => {
        const isActive = currentPage === id;
        return (
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onNavigate(id);
                }}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                        ? 'bg-primary text-white dark:bg-black dark:text-white'
                        : 'text-gray-600 hover:bg-gray-200 dark:text-gold-text dark:hover:bg-gold-dark'
                }`}
            >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{label}</span>
            </a>
        );
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            ></div>
            <aside
                className={`flex flex-col w-64 bg-white dark:bg-gold border-r border-gray-200 dark:border-transparent p-4 transition-transform transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed md:static md:translate-x-0 h-full z-40`}
            >
                <div className="relative mb-8">
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 dark:text-gold-text absolute top-0 right-0 z-50">
                        <X size={24} />
                    </button>
                    <div className="flex flex-col items-center gap-3 pt-8 md:pt-0">
                        <img src={logoUrl} alt="PostGenius AI Logo" className="h-32 w-32" />
                        <span className="text-2xl font-bold text-gray-800 dark:text-gold-text">PostGenius</span>
                    </div>
                </div>
                <nav className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                        <NavLink key={item.id} id={item.id} label={item.label} icon={item.icon} />
                    ))}
                </nav>
            </aside>
        </>
    );
};