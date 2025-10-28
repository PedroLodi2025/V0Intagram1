import React from 'react';
import { PostStatus } from '../../types';

interface BadgeProps {
    status: PostStatus;
}

const statusTranslations: Record<PostStatus, string> = {
    [PostStatus.Planned]: 'Planejado',
    [PostStatus.Ready]: 'Pronto',
    [PostStatus.Published]: 'Publicado',
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
    const statusStyles = {
        [PostStatus.Planned]: 'bg-muted text-muted-foreground border-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500',
        [PostStatus.Ready]: 'bg-green-100 text-success border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700',
        [PostStatus.Published]: 'bg-primary/20 text-primary border-primary/40 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusStyles[status]}`}
        >
            {statusTranslations[status]}
        </span>
    );
};