interface Task {
    id: number;
    task: string;
    type: 'mustDo' | 'saveLater'; // Ensure to match the Task interface
}

export const testData = {
    mustDoTasks: [
        { id: 1, task: 'Buy groceries', type: 'mustDo' } as Task,
        { id: 2, task: 'Walk the dog', type: 'mustDo' } as Task,
    ],
    saveLaterTasks: [
        { id: 3, task: 'Read a book', type: 'saveLater' } as Task,
        { id: 4, task: 'Watch a movie', type: 'saveLater' } as Task,
    ],
};