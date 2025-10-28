import React from 'react';
import { Post, PostType } from '../../types';
import { Image, Copy, Film } from 'lucide-react';

interface WeekViewProps {
    posts: Post[];
}

export const WeekView: React.FC<WeekViewProps> = ({ posts }) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))); // Monday
    const days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    const getPostsForDay = (date: Date) => {
        return posts.filter(post => {
            if (!post.scheduledFor) return false;
            const scheduledDate = new Date(post.scheduledFor);
            return (
                scheduledDate.getFullYear() === date.getFullYear() &&
                scheduledDate.getMonth() === date.getMonth() &&
                scheduledDate.getDate() === date.getDate()
            );
        });
    };

    const PostTypeIcon = ({ type }: { type: PostType }) => {
        const icons = {
            [PostType.SingleImage]: <Image size={14} />,
            [PostType.Carousel]: <Copy size={14} />,
            [PostType.Story]: <Film size={14} />,
        };
        return <span className="text-inherit">{icons[type]}</span>;
    };
    
    const isToday = (date: Date) => {
        const now = new Date();
        return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }

    return (
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {days.map(day => (
                <div key={day.toISOString()} className="bg-white dark:bg-dark-card min-h-[120px] flex flex-col">
                    <div className={`p-2 border-b border-gray-200 dark:border-gray-700 ${isToday(day) ? 'bg-primary/10 dark:bg-gold/10' : ''}`}>
                        <span className={`text-xs font-semibold ${isToday(day) ? 'text-primary dark:text-gold' : 'text-gray-500 dark:text-gray-400'}`}>{day.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}</span>
                        <p className={`text-lg font-bold ${isToday(day) ? 'text-primary dark:text-gold' : 'text-gray-800 dark:text-gold'}`}>{day.getDate()}</p>
                    </div>
                    <div className="p-1 space-y-1 flex-grow">
                        {getPostsForDay(day).map(post => (
                            <div key={post.id} className="bg-primary/10 text-primary dark:bg-gold/20 dark:text-gold p-1 rounded-md text-xs flex items-center gap-1">
                                <PostTypeIcon type={post.postType} />
                                <span className="truncate font-medium">{post.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};