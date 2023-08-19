import todoStore from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos } from './use-cases/render-todos';
import { Filters } from '../store/todo.store';
import { renderPending } from './use-cases/render-pending';

const elementIds = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    todoFilters: '.filtro',
    pendingCountLabel: '#pending-count'
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIds.TodoList, todos)
        updatePendingCounts()
    }

    const updatePendingCounts = () => {
        renderPending(elementIds.pendingCountLabel);
    }

    (() => {
        const app = document.createElement('div')
        app.innerHTML = html;
        document.querySelector(elementId).append(app)
        displayTodos();
    })();


    //Referencias
    const newDescriptionInput = document.querySelector(elementIds.newTodoInput);
    const todoListUL = document.querySelector(elementIds.TodoList)
    const clearCompletedButton = document.querySelector('.clear-completed')
    const filtersLI = document.querySelectorAll(elementIds.todoFilters)


    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return
        if (event.target.value.trim().length === 0) return

        todoStore.addToDo(event.target.value)
        displayTodos();

        event.target.value = ''
    })

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos();
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroy = event.target.className === 'destroy'
        const element = event.target.closest('[data-id]')

        if(!element || !isDestroy) return

        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos();
    })

    clearCompletedButton.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersLI.forEach((element) => {
        element.addEventListener('click', (element) => {
            filtersLI.forEach((el) => {
                el.classList.remove('selected')
            })
            element.target.classList.add('selected')

            switch(element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }

            displayTodos();
        })
    })
}