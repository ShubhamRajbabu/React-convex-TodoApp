import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useTodoContext } from "../context/Todocontext";
import { Id } from "../../convex/_generated/dataModel";

const TodoForm = () => {

    const { editTodo, setEditTodo } = useTodoContext();
    const [title, setTitle] = useState("");
    const addTodo = useMutation(api.functions.todos.CreateTodos);
    const updateTodos = useMutation(api.functions.todos.updateTodos);

    useEffect(() => {
        if (editTodo) {
            setTitle(editTodo.title);
        }
    }, [editTodo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        if (editTodo) {
            await updateTodos({ id: editTodo._id as Id<"todos">, title });
            setEditTodo(null);
        }
        else {
            await addTodo({ title });
        }
        setTitle("");
    }
    return (
        <form onSubmit={handleSubmit} className="mt-10 mb-10 flex gap-5">
            <input placeholder="Add your todo task..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-black rounded-xl w-full h-10 text-center" />
            <button type="submit" className="border-2 bg-zinc-800 hover:bg-zinc-600 text-white px-5 py-1 rounded-2xl"> {editTodo ? "Update" : "Add"} </button>
        </form>
    )
}

export default TodoForm