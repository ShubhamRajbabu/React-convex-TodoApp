import { useMutation } from "convex/react"
import { ITodo } from "../utils/types"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel";
import { useTodoContext } from "../context/Todocontext";

const TodoItem = ({ todo }: { todo: ITodo }) => {
    const { setEditTodo, setisTodoDeleted } = useTodoContext();
    const toggleTodo = useMutation(api.functions.todos.toggleTodoStatus);
    const deleteTodo = useMutation(api.functions.todos.deleteTodo);

    const handleDeleteTodo = async () => {
        deleteTodo({ id: todo._id as Id<"todos"> });
        setisTodoDeleted(true);
    }

    return (
        <div className="flex justify-between items-center p-2 border rounded">
            <span onClick={() => toggleTodo({ id: todo._id as Id<"todos"> })} className={`cursor-pointer ${todo.isCompleted ? "line-through text-gray-500" : ""}`}>{todo.title}</span>
            <div className="flex gap-3">
                <button onClick={() => setEditTodo(todo)} className="text-green-500 hover:text-green-700">Edit</button>
                <button onClick={handleDeleteTodo} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
        </div>
    )
}

export default TodoItem