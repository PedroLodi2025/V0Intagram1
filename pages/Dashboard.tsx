import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { WeekView } from '../components/calendar/WeekView';
import { PostCard } from '../components/posts/PostCard';
import { Post } from '../types';

const Dashboard: React.FC = () => {
    const context = useContext(AppContext);
    
    if (!context) return <div>Carregando...</div>;

    const { posts } = context;

    const upcomingPosts = posts
        .filter(post => post.scheduledFor && new Date(post.scheduledFor) > new Date())
        .sort((a, b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime())
        .slice(0, 3);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gold mb-2">Painel</h1>
                <p className="text-gray-500 dark:text-gold/80">Resumo da sua semana.</p>
            </div>
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gold mb-4">Agenda Semanal</h2>
                <WeekView posts={posts} />
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gold mb-4">Próximos Posts</h2>
                {upcomingPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                        <p className="text-gray-500 dark:text-gray-400">Nenhum post agendado.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;