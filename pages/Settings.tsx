import React, { useContext, useState, useEffect } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AppContext } from '../contexts/AppContext';

const Settings: React.FC = () => {
    const context = useContext(AppContext);
    const [accessToken, setAccessToken] = useState('');
    const [accountId, setAccountId] = useState('');

    useEffect(() => {
        if (context) {
            setAccessToken(context.instagram_access_token || '');
            setAccountId(context.instagram_account_id || '');
        }
    }, [context]);

    if (!context) {
        return <div>Carregando...</div>;
    }

    const { connectInstagram, disconnectInstagram, isInstagramConnected } = context;

    const handleSaveChanges = () => {
        if (accessToken && accountId) {
            connectInstagram(accessToken, accountId);
            alert('Credenciais do Instagram salvas!');
        } else {
            alert('Por favor, preencha o token e o ID da conta.');
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gold mb-2">Configurações</h1>
                <p className="text-gray-500 dark:text-gray-400">Configure as preferências do seu aplicativo.</p>
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold border-b pb-4 mb-4 text-gray-800 dark:text-gold">Conexão com Instagram</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID da Conta do Instagram</label>
                        <Input 
                            placeholder="Seu ID numérico da conta do Instagram"
                            value={accountId}
                            onChange={(e) => setAccountId(e.target.value)}
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token de Acesso de Usuário</label>
                        <Input 
                            type="password"
                            placeholder="Seu token de acesso de longa duração"
                            value={accessToken}
                            onChange={(e) => setAccessToken(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    {isInstagramConnected && (
                        <Button variant="destructive" onClick={() => {
                            disconnectInstagram();
                            alert('Desconectado do Instagram.');
                        }}>Desconectar</Button>
                    )}
                    <Button onClick={handleSaveChanges}>Salvar Credenciais</Button>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold border-b pb-4 mb-4 text-gray-800 dark:text-gold">Geral</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Projeto</label>
                        <Input defaultValue="Meu Conteúdo do Instagram" />
                    </div>
                </div>
            </div>
            
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold border-b pb-4 mb-4 text-gray-800 dark:text-gold">Preferências de IA</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estilo de Imagem Padrão</label>
                        <Input placeholder="ex: cinematográfico, vibrante, fotorrealista" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button>Salvar Todas as Alterações</Button>
            </div>
        </div>
    );
};

export default Settings;
