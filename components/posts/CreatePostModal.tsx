import React, { useContext } from 'react';
import { Modal } from '../ui/Modal';
import { PostWizard } from './PostWizard';
import { AppContext } from '../../contexts/AppContext';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
    const context = useContext(AppContext);

    const handleSuccess = (newPost: any) => {
        if (context) {
            context.createPost(newPost);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Criar Novo Post" size="4xl">
            <PostWizard onSuccess={handleSuccess} />
        </Modal>
    );
};