import React, { useState, useEffect } from 'react';

interface EditTaskModalProps {
    isOpen: boolean;
    currentTaskText: string;
    onClose: () => void;
    onUpdate: (updatedTask: string) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, currentTaskText, onClose, onUpdate }) => {
    const [task, setTask] = useState(currentTaskText);

    // Update local state when currentTaskText changes
    useEffect(() => {
        setTask(currentTaskText);
    }, [currentTaskText]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(task);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.container}>
                <h3>Edit Task</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    <button type="submit">Update Task</button>
                    <button type="button" onClick={onClose} style={{ marginLeft: '5px' }}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    } as React.CSSProperties,
    container: {
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
        minWidth: '300px',
    } as React.CSSProperties,
};

export default EditTaskModal;