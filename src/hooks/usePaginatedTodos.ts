import { usePaginatedQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

export const usePaginatedTodos = () => {
    const { results: todos,
        status,
        loadMore,
        isLoading,
    } = usePaginatedQuery(api.functions.todos.getPaginatedTodos, {}, { initialNumItems: 5 });
    return { todos, status, loadMore, isLoading };
}