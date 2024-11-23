import React, { useState } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Sidebar from './Sidebar';
import { testData } from './testData'; // Adjust the import path
import EditTaskModal from './EditTaskModal';
import ItemForm from './ItemForm';

interface Task {
    id: number;
    task: string;
    type: 'mustDo' | 'saveLater'; // Updated to include type
}

const App: React.FC = () => {
    const [mustDoTasks, setMustDoTasks] = useState<Task[]>(testData.mustDoTasks);
    const [saveLaterTasks, setSaveLaterTasks] = useState<Task[]>(testData.saveLaterTasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
    const [currentTaskText, setCurrentTaskText] = useState<string>("");
    const [editingTaskType, setEditingTaskType] = useState<'mustDo' | 'saveLater' | null>(null);

    // For ItemForm
    const [itemFormOpen, setItemFormOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Task | null>(null);

    const addMustDoTask = (task: string) => {
        const newTask: Task = { id: Date.now(), task, type: 'mustDo' }; // Set type
        setMustDoTasks([...mustDoTasks, newTask]);
    };

    const addSaveLaterTask = (task: string) => {
        const newTask: Task = { id: Date.now(), task, type: 'saveLater' }; // Set type
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
            setEditingTaskType(type);
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
            setEditingTaskType(null);
            setModalOpen(false);
        }
    };

    const handleItemFormSubmit = (newItem: Task) => {
        if (currentItem) {
            // Update existing item
            if (currentItem.type === 'mustDo') {
                setMustDoTasks(mustDoTasks.map(task => (task.id === currentItem.id ? { ...task, task: newItem.task } : task)));
            } else {
                setSaveLaterTasks(saveLaterTasks.map(task => (task.id === currentItem.id ? { ...task, task: newItem.task } : task)));
            }
        } else {
            // Create new item
            const newTask: Task = { id: Date.now(), task: newItem.task, type: newItem.type }; // Ensure type is set
            setMustDoTasks([...mustDoTasks, newTask]);
        }
        setItemFormOpen(false);
    };

    const openItemForm = (task?: Task) => {
        setCurrentItem(task || null);
        setItemFormOpen(true);
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

            {/* Item Form Modal */}
            {itemFormOpen && (
                <ItemForm 
                    onSubmit={handleItemFormSubmit} 
                    item={currentItem} 
                    closeModal={() => setItemFormOpen(false)} 
                />
            )}
        </div>
    );
};

export default App;