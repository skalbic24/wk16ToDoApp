import React from 'react';

interface TaskInputProps {
    onAddMustDo: (task: string) => void;
    onAddSaveLater: (task: string) => void;
    currentTaskText: string;
    onUpdateTask: (task: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddMustDo, onAddSaveLater, currentTaskText, onUpdateTask }) => {
    const [inputValue, setInputValue] = React.useState<string>(currentTaskText);

    React.useEffect(() => {
        setInputValue(currentTaskText); // Update input value when currentTaskText changes
    }, [currentTaskText]);

    const handleAddMustDo = () => {
        if (inputValue.trim()) {
            onAddMustDo(inputValue);
            setInputValue("");
        }
    };

    const handleAddSaveLater = () => {
        if (inputValue.trim()) {
            onAddSaveLater(inputValue);
            setInputValue("");
        }
    };

    const handleUpdate = () => {
        if (inputValue.trim()) {
            onUpdateTask(inputValue); // Call the update function
            setInputValue("");
        }
    };

    return (
        <div className="input-container">
            <h2 className="task-title">To Do Tasks</h2>
            <div className="input-button-container">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Enter task..."
                />
                <button className="add-must-do" onClick={currentTaskText ? handleUpdate : handleAddMustDo}>
                    {currentTaskText ? "Update Task" : "Add Must Do"}
                </button>
                <button className="add-save-later" onClick={handleAddSaveLater}>
                    Add Save Later
                </button>
            </div>
        </div>
    );
};

export default TaskInput;