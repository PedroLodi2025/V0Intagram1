import React, { useState, useMemo, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { PostCard } from '../components/posts/PostCard';
import { PostStatus } from '../types';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const MyPosts: React.FC = () => {
    const context = useContext(AppContext);
    const [activeFilter, setActiveFilter] = useState<PostStatus | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    if (!context) return <div>Carregando...</div>;
    const { posts } = context;

    const filteredPosts = useMemo(() => {
        return posts
            .filter(post => activeFilter === 'all' || post.status === activeFilter)
            .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [posts, activeFilter, searchTerm]);

    const filters: { label: string, value: PostStatus | 'all' }[] = [
        { label: 'Todos', value: 'all' },
        { label: 'Planejados', value: PostStatus.Planned },
        { label: 'Prontos', value: PostStatus.Ready },
        { label: 'Publicados', value: PostStatus.Published },
    ];

    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gold mb-2">Meus Posts</h1>
                <p className="text-gray-500 dark:text-gray-400">Gerencie e visualize todo o seu conteúdo.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                    {filters.map(filter => (
                        <Button
                            key={filter.value}
                            variant={activeFilter === filter.value ? 'default' : 'ghost'}
                            onClick={() => setActiveFilter(filter.value)}
                            className="capitalize px-4 py-2 text-sm"
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>
                <div className="w-full md:w-auto">
                    <Input 
                        type="text"
                        placeholder="Buscar por título..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64"
                    />
                </div>
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gold">Nenhum post encontrado</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Tente ajustar seus filtros ou crie um novo post.</p>
                </div>
            )}
        </div>
    );
};

export default MyPosts;