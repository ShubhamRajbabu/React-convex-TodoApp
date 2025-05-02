import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { paginationOptsValidator } from "convex/server";

// Fetch all todos (ordered by creation time, newest first)
export const getAllTodos = query(async ({ db }) => {
    const allTodos = await db.query("todos").order("desc").collect();
    if (!allTodos) throw new Error("No Todos Found");
    return allTodos;
});

//get todos based on paginations
export const getPaginatedTodos = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, { paginationOpts }) => {
        const filteredTodos = await ctx.db.query("todos").order('desc').paginate(paginationOpts);
        if (!filteredTodos) throw new Error("No Todos Found");
        return filteredTodos;
    }
})


//Add a new todo
export const CreateTodos = mutation({
    args: { title: v.string() },
    handler: async ({ db }, { title }) => {
        return await db.insert('todos', {
            title,
            isCompleted: false,
            createdOn: Date.now(),
        });
    },
});

//Updating a todo by id and new title
export const updateTodos = mutation({
    args: { id: v.id("todos"), title: v.string() },
    handler: async ({ db }, args) => {
        const todoItem = await db.get(args.id);
        if (!todoItem) throw new Error("Todo not found");
        await db.patch(args.id, { title: args.title });
    }
})

//Toggling completed or incompleted status of a todo
export const toggleTodoStatus = mutation({
    args: { id: v.id("todos") },
    handler: async ({ db }, { id }) => {
        const todoItem = await db.get(id);
        if (!todoItem) throw new Error("Todo not found");
        await db.patch(id, { isCompleted: !todoItem.isCompleted });
    }
})

//delete a todo by id
export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async ({ db }, { id }) => {
        const todoItemToBeDeleted = await db.get(id);
        if (!todoItemToBeDeleted) throw new Error("Todo not available");
        await db.delete(id);
    },
});

