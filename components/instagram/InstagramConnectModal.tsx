import React, { useState, useContext } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AppContext } from '../../contexts/AppContext';

interface InstagramConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const InstagramConnectModal: React.FC<InstagramConnectModalProps> = ({ isOpen, onClose }) => {
    const context = useContext(AppContext);
    
    const [accessToken, setAccessToken] = useState(context?.instagram_access_token || '');
    const [accountId, setAccountId] = useState(context?.instagram_account_id || '');

    if (!context) return null;

    const { connectInstagram } = context;

    const handleSave = () => {
        if (accessToken && accountId) {
            connectInstagram(accessToken, accountId);
            onClose();
        } else {
            alert('Por favor, preencha ambos os campos.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Conectar com Instagram" size="lg">
            <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Para publicar e agendar posts, você precisa fornecer suas credenciais da API de Grafos do Instagram.
                    Você pode obter essas credenciais no <a href="https://developers.facebook.com/docs/instagram-api" target="_blank" rel="noopener noreferrer" className="text-primary underline">Portal do Desenvolvedor da Meta</a>.
                </p>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ID da Conta do Instagram
                    </label>
                    <Input 
                        placeholder="Ex: 17841405822325321" 
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Token de Acesso de Usuário
                    </label>
                    <Input 
                        type="password"
                        placeholder="Cole seu token de acesso aqui" 
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar e Conectar</Button>
                </div>
            </div>
        </Modal>
    );
};
