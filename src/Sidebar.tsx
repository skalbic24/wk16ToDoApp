import React from 'react';

interface Task {
    id: number;
    task: string;
}

interface SidebarProps {
    saveLaterTasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (id: number, type: 'mustDo' | 'saveLater') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ saveLaterTasks, onDelete, onEdit }) => {
    return (
        <div>
            <h3>Saved for Later</h3>
            <ul>
                {saveLaterTasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span role="img" aria-label="task" style={{ marginRight: '8px', lineHeight: '30px' }}>
                                📅 
                            </span>
                            <span style={{ flexGrow: 1 }}>{task.task}</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button className="edit" onClick={() => onEdit(task.id, 'saveLater')}>✏️</button>
                                <button className="delete" onClick={() => onDelete(task.id)}>❌</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;