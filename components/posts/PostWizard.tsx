import React, { useState, useContext } from 'react';
import { PostType, Tone, PostStatus, PostImage, Post } from '../../types';
import { Image as ImageIcon, Copy, Film, ChevronRight, ChevronLeft, Sparkles, RefreshCw, Download, Calendar, Save } from 'lucide-react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { generateCaption, generateImages, generateHashtags } from '../../services/pollinationsService';
import { Spinner } from '../ui/Spinner';
import { StoryPreview } from './StoryPreview';
import { AppContext } from '../../contexts/AppContext';
import { publishPostToInstagram } from '../../services/instagramService';


interface PostWizardProps {
    onSuccess: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

type WizardStep = 1 | 2 | 3;

export const PostWizard: React.FC<PostWizardProps> = ({ onSuccess }) => {
    const [step, setStep] = useState<WizardStep>(1);
    const [postType, setPostType] = useState<PostType | null>(null);
    const [tema, setTema] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tone, setTone] = useState<Tone>(Tone.Casual);

    const [caption, setCaption] = useState('');
    const [images, setImages] = useState<{ url: string; prompt: string }[]>([]);
    const [hashtags, setHashtags] = useState<string[]>([]);
    
    const [loading, setLoading] = useState({ caption: false, images: false, hashtags: false });
    const [isPublishing, setIsPublishing] = useState(false);
    const [scheduledFor, setScheduledFor] = useState<string>('');
    
    const context = useContext(AppContext);

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3) as WizardStep);
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1) as WizardStep);

    const handleGenerateCaption = async () => {
        if (!tema) return;
        setLoading(prev => ({ ...prev, caption: true }));
        const result = await generateCaption(tema, descricao, tone);
        setCaption(result);
        setLoading(prev => ({ ...prev, caption: false }));
    };

    const handleGenerateImages = async () => {
        if (!tema || !postType) return;
        setLoading(prev => ({ ...prev, images: true }));
        const imageCount = postType === PostType.SingleImage ? 1 : postType === PostType.Carousel ? 3 : 4;
        const result = await generateImages(tema, 'photorealistic', imageCount, postType === PostType.Story);
        setImages(result);
        setLoading(prev => ({ ...prev, images: false }));
    };

    const handleGenerateHashtags = async () => {
        if (!tema) return;
        setLoading(prev => ({ ...prev, hashtags: true }));
        const result = await generateHashtags(tema);
        setHashtags(result);
        setLoading(prev => ({ ...prev, hashtags: false }));
    };
    
    const handleSave = async (status: PostStatus) => {
        if (!postType || !tema || !caption || !context) return;
        
        const postImages: PostImage[] = images.map((img, index) => ({
            id: `img-${Date.now()}-${index}`,
            postId: '', // will be set in App.tsx
            url: img.url,
            prompt: img.prompt,
            orderIndex: index,
        }));
        
        const newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'> = {
            title: tema,
            description: descricao,
            caption: caption,
            hashtags: hashtags,
            postType: postType,
            tone: tone,
            status: status,
            images: postImages,
            scheduledFor: scheduledFor || undefined,
            publishedAt: status === PostStatus.Published ? new Date().toISOString() : undefined,
        };

        if (status === PostStatus.Published) {
            if (!context.isInstagramConnected) {
                alert('Conecte sua conta do Instagram primeiro para publicar diretamente.');
                return;
            }
            setIsPublishing(true);
            const result = await publishPostToInstagram(
                newPost, 
                context.instagram_access_token!, 
                context.instagram_account_id!
            );
            
            setIsPublishing(false);
            alert(result.message);

            if (!result.success) {
                // Não salva o post localmente se a publicação falhar, permitindo que o usuário tente novamente
                return;
            }
        }

        onSuccess(newPost);
    };

    const renderStep1 = () => (
        <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-medium">1. Escolha o Tipo de Post</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {([
                    { type: PostType.SingleImage, icon: ImageIcon, title: 'Imagem Única', desc: 'Um post com uma única imagem' },
                    { type: PostType.Carousel, icon: Copy, title: 'Carrossel', desc: 'Post com 2-5 imagens' },
                    { type: PostType.Story, icon: Film, title: 'Story', desc: 'Story com transições' }
                ]).map(item => (
                    <button key={item.type} onClick={() => setPostType(item.type)} className={`p-4 border rounded-lg text-left transition-all ${postType === item.type ? 'border-primary ring-2 ring-primary' : 'hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-400'}`}>
                        <item.icon className="h-6 w-6 mb-2 text-primary" />
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{item.desc}</p>
                    </button>
                ))}
            </div>
            <h3 className="text-lg font-medium">2. Defina o Tópico</h3>
            <div className="space-y-4">
                <Input placeholder="Tópico / Assunto do post" value={tema} onChange={e => setTema(e.target.value)} />
                <Textarea placeholder="Descrição detalhada (opcional)" value={descricao} onChange={e => setDescricao(e.target.value)} />
                 <select value={tone} onChange={e => setTone(e.target.value as Tone)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                    <option value={Tone.Professional}>Profissional</option>
                    <option value={Tone.Casual}>Casual</option>
                    <option value={Tone.Educative}>Educativo</option>
                </select>
            </div>
            <div className="flex justify-end">
                <Button onClick={handleNext} disabled={!postType || !tema}><ChevronRight className="mr-2 h-4 w-4" /> Próximo Passo</Button>
            </div>
        </div>
    );
    
    const renderStep2 = () => (
        <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Conteúdo Gerado</h3>
                    <Textarea placeholder="Sua legenda gerada aparecerá aqui..." value={caption} onChange={e => setCaption(e.target.value)} rows={8} />
                    <Button onClick={handleGenerateCaption} disabled={loading.caption} className="w-full">
                        {loading.caption ? <Spinner size={16}/> : <Sparkles className="mr-2 h-4 w-4" />} Gerar Legenda
                    </Button>
                    <Input placeholder="As hashtags aparecerão aqui" value={hashtags.map(h => `#${h}`).join(' ')} onChange={e => setHashtags(e.target.value.replace(/#/g, '').split(' '))} />
                    <Button onClick={handleGenerateHashtags} disabled={loading.hashtags} className="w-full">
                         {loading.hashtags ? <Spinner size={16}/> : <Sparkles className="mr-2 h-4 w-4" />} Gerar Hashtags
                    </Button>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Imagens Geradas</h3>
                    <div className="grid grid-cols-2 gap-2 min-h-[200px] bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                        {images.map((img, i) => <img key={i} src={img.url} className="w-full h-full object-cover rounded" />)}
                        {loading.images && <div className="col-span-2 flex justify-center items-center"><Spinner/></div>}
                    </div>
                     <Button onClick={handleGenerateImages} disabled={loading.images} className="w-full">
                        {loading.images ? <Spinner size={16}/> : <ImageIcon className="mr-2 h-4 w-4" />} Gerar Imagens
                    </Button>
                </div>
            </div>
            <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}><ChevronLeft className="mr-2 h-4 w-4" /> Voltar</Button>
                <Button onClick={handleNext} disabled={!caption || images.length === 0}><ChevronRight className="mr-2 h-4 w-4" /> Visualizar & Agendar</Button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6 text-gray-800 dark:text-gray-200">
            <h3 className="text-lg font-medium">Visualização Final</h3>
             <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                {postType === PostType.Story ? (
                    <div className="w-[300px] h-[533px]">
                        <StoryPreview images={images.map(i => i.url)} />
                    </div>
                ) : (
                    <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-lg">
                         <div className="p-3 flex items-center gap-3 border-b dark:border-gray-700">
                           <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                           <span className="font-semibold text-sm">seu_usuario</span>
                         </div>
                         <div className="aspect-square bg-black">
                            {images.length > 0 && <img src={images[0].url} className="w-full h-full object-contain" />}
                         </div>
                         <div className="p-3 text-sm">
                            <p><span className="font-semibold">seu_usuario</span> {caption}</p>
                            <p className="text-sky-400 mt-1">{hashtags.map(h => `#${h}`).join(' ')}</p>
                         </div>
                    </div>
                )}
            </div>
             <h3 className="text-lg font-medium">Agendamento</h3>
             <Input type="datetime-local" value={scheduledFor} onChange={e => setScheduledFor(e.target.value)} />
             
            <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={isPublishing}><ChevronLeft className="mr-2 h-4 w-4" /> Voltar</Button>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleSave(PostStatus.Planned)} disabled={isPublishing}><Save className="mr-2 h-4 w-4" /> Salvar como Rascunho</Button>
                    <Button 
                        onClick={() => handleSave(scheduledFor ? PostStatus.Ready : PostStatus.Published)}
                        disabled={isPublishing || (!scheduledFor && !context?.isInstagramConnected)}
                        title={!scheduledFor && !context?.isInstagramConnected ? "Conecte-se ao Instagram para publicar" : ""}
                    >
                        {isPublishing ? <Spinner size={16} /> : (scheduledFor ? <Calendar className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />)}
                        {isPublishing ? 'Publicando...' : (scheduledFor ? 'Agendar Post' : 'Publicar Agora')}
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    );
};
