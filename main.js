import './style.css'
import { App } from './src/toDos/app'
import todoStore from './src/store/todo.store'

todoStore.initStore();

App('#app')
