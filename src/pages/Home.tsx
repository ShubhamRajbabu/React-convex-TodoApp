import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import { TodoProvider } from "../context/Todocontext"

const Home = () => {
    return (
        <TodoProvider>
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-4xl font-bold mb-4">📝 Create your own task!</h1>
                <TodoForm />
                <TodoList />
            </div>
        </TodoProvider>
    )
}

export default Home