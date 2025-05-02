import { createContext, useContext, useState } from "react";
import { ITodo } from "../utils/types";

interface TodoContextProps {
    editTodo: ITodo | null,
    setEditTodo: (todo: ITodo | null) => void;
    isTodoDeleted: boolean;
    setisTodoDeleted: (value: boolean) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [editTodo, setEditTodo] = useState<ITodo | null>(null);
    const [isTodoDeleted, setisTodoDeleted] = useState<boolean>(false);

    return (
        <TodoContext.Provider value={{ editTodo, setEditTodo, isTodoDeleted, setisTodoDeleted }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider')
    };
    return context;
}