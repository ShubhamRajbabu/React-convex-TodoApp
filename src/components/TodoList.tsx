
import TodoItem from "./TodoItem";
import { usePaginatedTodos } from "../hooks/usePaginatedTodos";
// import { useState } from "react";

const TodoList = () => {
    const { todos, isLoading, loadMore, status } = usePaginatedTodos();
    // const [pageNum, setPageNum] = useState(1);

    if (todos === undefined) return <div>Loading...</div>

    // const handleNextPage = async () => {
    //     if (status === "CanLoadMore") {
    //         setPageNum((prev) => prev + 1);
    //         loadMore(5);
    //     }
    // }

    return (
        <div className="flex flex-col gap-2">
            {
                todos.length === 0 ?
                    (<p className="text-gray-500">No todos available</p>)
                    :
                    (todos.map((todo) => <TodoItem key={todo._id} todo={todo} />))
            }
            <div className="flex justify-center mt-4">
                {status === "CanLoadMore" && (
                    <button
                        onClick={() => loadMore(5)}
                        className="bg-zinc-800 hover:bg-zinc-600 text-white px-4 py-2 rounded-xl"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Load More"}
                    </button>
                )}
                {(status != "CanLoadMore" && todos.length != 0) && <p className="text-gray-400">End of list</p>}
                {/* <div className="flex justify-center w-full gap-5">
                    <button className="text-zinc-500 hover:text-zinc-700">Prev</button>
                    <button onClick={() => handleNextPage} className="text-blue-500 hover:text-blue-700">Next</button>
                </div> */}
            </div>
        </div >
    )
}

export default TodoList