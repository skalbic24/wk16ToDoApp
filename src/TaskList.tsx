import React from 'react';

interface Task {
    id: number;
    task: string;
}

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (id: number, type: 'mustDo' | 'saveLater') => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
    return (
        <div>
            <h3>Must Do Tasks</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span role="img" aria-label="task" style={{ marginRight: '8px', lineHeight: '30px' }}>
                                ✅ {/* Emoji here */}
                            </span>
                            <span style={{ flexGrow: 1 }}>{task.task}</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button className="edit" onClick={() => onEdit(task.id, 'mustDo')}>✏️</button>
                                <button className="delete" onClick={() => onDelete(task.id)}>❌</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;