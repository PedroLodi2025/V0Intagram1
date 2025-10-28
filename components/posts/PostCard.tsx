import React from 'react';
import { Post, PostType } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Image as ImageIcon, Copy, Film, Calendar } from 'lucide-react';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    const { title, status, postType, scheduledFor, images } = post;

    const PostTypeIcon = () => {
        switch(postType) {
            case PostType.SingleImage: return <ImageIcon size={16} className="text-muted-foreground dark:text-gray-400" />;
            case PostType.Carousel: return <Copy size={16} className="text-muted-foreground dark:text-gray-400" />;
            case PostType.Story: return <Film size={16} className="text-muted-foreground dark:text-gray-400" />;
            default: return null;
        }
    };
    
    const formattedDate = scheduledFor ? new Date(scheduledFor).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }) : 'Não agendado';

    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="p-4">
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                    {images && images.length > 0 && (
                        <img src={images[0].url} alt={title} className="w-full h-full object-cover" />
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
                <CardTitle className="text-base font-semibold mb-2 line-clamp-2">{title}</CardTitle>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <Badge status={status} />
                    <PostTypeIcon />
                </div>
                <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formattedDate}</span>
                </div>
            </CardFooter>
        </Card>
    );
};