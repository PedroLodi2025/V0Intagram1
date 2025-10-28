export enum PostType {
    SingleImage = 'single_image',
    Carousel = 'carousel',
    Story = 'story',
}

export enum PostStatus {
    Planned = 'planned',
    Ready = 'ready',
    Published = 'published',
}

export enum Tone {
    Professional = 'professional',
    Casual = 'casual',
    Educative = 'educative',
}

export interface PostImage {
    id: string;
    postId: string;
    url: string;
    prompt: string;
    orderIndex: number;
}

export interface Post {
    id: string;
    title: string;
    description?: string;
    caption: string;
    hashtags: string[];
    postType: PostType;
    tone: Tone;
    status: PostStatus;
    images: PostImage[];
    scheduledFor?: string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

// Mock Data
export const mockImages: PostImage[] = [
    { id: 'img-1', postId: 'post-1', url: 'https://picsum.photos/seed/1/1080/1080', prompt: 'Um lindo pôr do sol sobre as montanhas', orderIndex: 0 },
    { id: 'img-2', postId: 'post-2', url: 'https://picsum.photos/seed/2/1080/1080', prompt: 'Um horizonte de cidade moderna à noite', orderIndex: 0 },
    { id: 'img-3', postId: 'post-2', url: 'https://picsum.photos/seed/3/1080/1080', prompt: 'Luzes da cidade refletindo na água', orderIndex: 1 },
    { id: 'img-4', postId: 'post-3', url: 'https://picsum.photos/seed/4/1080/1920', prompt: 'Um caminho sereno na floresta no outono', orderIndex: 0 },
    { id: 'img-5', postId: 'post-3', url: 'https://picsum.photos/seed/5/1080/1920', prompt: 'Close de folhas de outono', orderIndex: 1 },
    { id: 'img-6', postId: 'post-3', url: 'https://picsum.photos/seed/6/1080/1920', prompt: 'Luz do sol por entre as árvores', orderIndex: 2 },
];

export const mockPosts: Post[] = [
    {
        id: 'post-1',
        title: 'Pôr do Sol na Montanha',
        caption: 'Buscando a última luz do dia. ✨ #pordosol #montanhas #natureza',
        hashtags: ['pordosol', 'montanhas', 'natureza', 'aventura'],
        postType: PostType.SingleImage,
        tone: Tone.Casual,
        status: PostStatus.Published,
        images: mockImages.filter(img => img.postId === 'post-1'),
        scheduledFor: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'post-2',
        title: 'Noites na Cidade',
        caption: 'A cidade que nunca dorme. 🌃 Deslize para ver mais! #paisagemurbana #fotografianoturna #urbano',
        hashtags: ['paisagemurbana', 'fotografianoturna', 'urbano', 'luzes'],
        postType: PostType.Carousel,
        tone: Tone.Professional,
        status: PostStatus.Ready,
        images: mockImages.filter(img => img.postId === 'post-2'),
        scheduledFor: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'post-3',
        title: 'Passeio de Outono',
        caption: 'Encontrando a beleza no outono. 🍂 #outono #floresta #horadahistoria',
        hashtags: ['outono', 'floresta', 'horadahistoria', 'amantesdanatureza'],
        postType: PostType.Story,
        tone: Tone.Educative,
        status: PostStatus.Planned,
        images: mockImages.filter(img => img.postId === 'post-3'),
        scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];