import React, { useState } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import { testData } from './testData'; // Adjust the import path
import EditTaskModal from './EditTaskModal';

interface Task {
    id: number;
    task: string;
}

const App: React.FC = () => {
    const [mustDoTasks, setMustDoTasks] = useState<Task[]>(testData.mustDoTasks);
    const [saveLaterTasks, setSaveLaterTasks] = useState<Task[]>(testData.saveLaterTasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
    const [currentTaskText, setCurrentTaskText] = useState<string>("");
    const [editingTaskType, setEditingTaskType] = useState<'mustDo' | 'saveLater' | null>(null);

    const addMustDoTask = (task: string) => {
        const newTask: Task = { id: Date.now(), task };
        setMustDoTasks([...mustDoTasks, newTask]);
    };

    const addSaveLaterTask = (task: string) => {
        const newTask: Task = { id: Date.now(), task };
        setSaveLaterTasks([...saveLaterTasks, newTask]);
    };

    const deleteTask = (id: number) => {
        setMustDoTasks(mustDoTasks.filter(task => task.id !== id));
    };

    const deleteSaveLaterTask = (id: number) => {
        setSaveLaterTasks(saveLaterTasks.filter(task => task.id !== id));
    };

    const openEditModal = (id: number, type: 'mustDo' | 'saveLater') => {
        const taskToEdit = type === 'mustDo'
            ? mustDoTasks.find(task => task.id === id)
            : saveLaterTasks.find(task => task.id === id);

        if (taskToEdit) {
            setCurrentTaskId(id);
            setCurrentTaskText(taskToEdit.task);
            setEditingTaskType(type); // Set the type of task being edited
            setModalOpen(true);
        }
    };

    const updateTask = (updatedTask: string) => {
        if (currentTaskId !== null && editingTaskType) {
            if (editingTaskType === 'mustDo') {
                setMustDoTasks(mustDoTasks.map(t => (t.id === currentTaskId ? { ...t, task: updatedTask } : t)));
            } else {
                setSaveLaterTasks(saveLaterTasks.map(t => (t.id === currentTaskId ? { ...t, task: updatedTask } : t)));
            }
            setCurrentTaskId(null);
            setCurrentTaskText("");
            setEditingTaskType(null); // Reset editing task type
            setModalOpen(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <TaskInput 
                onAddMustDo={addMustDoTask} 
                onAddSaveLater={addSaveLaterTask} 
                currentTaskText={currentTaskText} 
                onUpdateTask={updateTask} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TaskList tasks={mustDoTasks} onDelete={deleteTask} onEdit={openEditModal} />
                <Sidebar saveLaterTasks={saveLaterTasks} onDelete={deleteSaveLaterTask} onEdit={openEditModal} />
            </div>

            {/* Edit Task Modal */}
            <EditTaskModal 
                isOpen={modalOpen} 
                currentTaskText={currentTaskText} 
                onClose={() => setModalOpen(false)} 
                onUpdate={updateTask} 
            />
        </div>
    );
};

export default App;

