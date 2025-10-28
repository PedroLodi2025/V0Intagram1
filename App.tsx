import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MyPosts from './pages/MyPosts';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';
import { CreatePostModal } from './components/posts/CreatePostModal';
import { Post, PostImage, mockPosts, mockImages } from './types';
import { AppContext } from './contexts/AppContext';

export type Page = 'dashboard' | 'posts' | 'gallery' | 'settings';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [images, setImages] = useState<PostImage[]>(mockImages);

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Instagram connection state
    const [instagramAccessToken, setInstagramAccessToken] = useState<string | null>(null);
    const [instagramAccountId, setInstagramAccountId] = useState<string | null>(null);
    
    // Load credentials from localStorage on initial render
    useEffect(() => {
        const storedToken = localStorage.getItem('instagram_access_token');
        const storedAccountId = localStorage.getItem('instagram_account_id');
        if (storedToken && storedAccountId) {
            setInstagramAccessToken(storedToken);
            setInstagramAccountId(storedAccountId);
        }
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const connectInstagram = useCallback((token: string, accountId: string) => {
        localStorage.setItem('instagram_access_token', token);
        localStorage.setItem('instagram_account_id', accountId);
        setInstagramAccessToken(token);
        setInstagramAccountId(accountId);
    }, []);

    const disconnectInstagram = useCallback(() => {
        localStorage.removeItem('instagram_access_token');
        localStorage.removeItem('instagram_account_id');
        setInstagramAccessToken(null);
        setInstagramAccountId(null);
    }, []);

    const handleCreatePost = useCallback((newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
        const postWithId: Post = {
            ...newPost,
            id: `post-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setPosts(prev => [postWithId, ...prev]);
        const newImages = newPost.images.map(img => ({ ...img, postId: postWithId.id }));
        setImages(prev => [...newImages, ...prev]);
    }, []);

    const contextValue = useMemo(() => ({
      posts,
      images,
      createPost: handleCreatePost,
      theme,
      setTheme,
      isInstagramConnected: !!instagramAccessToken && !!instagramAccountId,
      instagram_access_token: instagramAccessToken,
      instagram_account_id: instagramAccountId,
      connectInstagram,
      disconnectInstagram,
    }), [posts, images, handleCreatePost, theme, setTheme, instagramAccessToken, instagramAccountId, connectInstagram, disconnectInstagram]);

    const renderPage = () => {
        switch (page) {
            case 'dashboard':
                return <Dashboard />;
            case 'posts':
                return <MyPosts />;
            case 'gallery':
                return <Gallery />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="min-h-screen">
                <Layout
                    currentPage={page}
                    onNavigate={setPage}
                    onOpenCreateModal={() => setIsModalOpen(true)}
                >
                    {renderPage()}
                </Layout>
                {isModalOpen && (
                    <CreatePostModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </AppContext.Provider>
    );
};

export default App;
