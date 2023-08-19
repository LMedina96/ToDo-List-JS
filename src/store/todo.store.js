import { Todo } from "../toDos/models/todo.model"

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {todos = []} = JSON.parse(localStorage.getItem('state'))
    state.todos = todos
    state.filter = Filters.All
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

const getTodos = (filter = Filters.All) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos]
        
        case Filters.Completed:
            return state.todos.filter((todo) => todo.done)

        case Filters.Pending:
            return state.todos.filter((todo) => !todo.done)

        default:
            throw new Error(`Option ${filter} is not allowed`)
    }
}

const addToDo = (description) => {
    if (!description) throw new Error('Description is required')

    state.todos.push(new Todo(description))
    saveStateToLocalStorage()
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map((todo) => {
        if(todo.id === todoId) {
            todo.done = !todo.done
        }

        saveStateToLocalStorage()
        return todo;
    })
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId)

    saveStateToLocalStorage()
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done)
    saveStateToLocalStorage()
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter
    saveStateToLocalStorage()
}

const getCurrentFilter = () => {
    return state.filter
}

export default {
    initStore,
    loadStore,
    getTodos,
    addToDo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}