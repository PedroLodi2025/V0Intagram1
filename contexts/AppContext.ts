import React, { createContext } from 'react';
import { Post, PostImage } from '../types';

interface AppContextType {
    posts: Post[];
    images: PostImage[];
    createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    isInstagramConnected: boolean;
    instagram_access_token: string | null;
    instagram_account_id: string | null;
    connectInstagram: (token: string, accountId: string) => void;
    disconnectInstagram: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
