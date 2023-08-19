(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function l(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=l(o);fetch(o.href,d)}})();let y;const b=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(b)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function v(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),L={randomUUID:C};function E(e,t,l){if(L.randomUUID&&!t&&!e)return L.randomUUID();e=e||{};const i=e.random||(e.rng||S)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=i[o];return t}return v(i)}class A{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},s={todos:[],filter:a.All},P=()=>{w()},w=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[]}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=a.All},h=()=>{localStorage.setItem("state",JSON.stringify(s))},I=(e=a.All)=>{switch(e){case a.All:return[...s.todos];case a.Completed:return s.todos.filter(t=>t.done);case a.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not allowed`)}},U=e=>{if(!e)throw new Error("Description is required");s.todos.push(new A(e)),h()},D=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),h(),t))},F=e=>{s.todos=s.todos.filter(t=>t.id!==e),h()},M=()=>{s.todos=s.todos.filter(e=>!e.done),h()},q=(e=a.All)=>{s.filter=e,h()},x=()=>s.filter,c={initStore:P,loadStore:w,getTodos:I,addToDo:U,toggleTodo:D,deleteTodo:F,deleteCompleted:M,setFilter:q,getCurrentFilter:x},O=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Creado por Lucas Medina</a></p>\r
    <p>Parte del curso JavaScript Moderno: Guía para dominar el Lenguaje por Fernando Herrera</a></p>\r
</footer>`,k=e=>{const t=`<div class="view">
            <input class="toggle" type="checkbox" ${e.done?"checked":""}>
            <label>${e.description} </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`,l=document.createElement("li");return l.innerHTML=t,l.setAttribute("data-id",e.id),e.done&&l.classList.add("completed"),l};let m;const H=(e,t=[])=>{if(m||(m=document.querySelector(e)),!m)throw new Error(`Element ${e} not found`);m.innerHTML="",t.forEach(l=>{m.append(k(l))})};let T;const N=e=>{if(T||(T=document.querySelector(e)),!T)throw new Error(`Element ${e} not found`);T.innerHTML=c.getTodos(a.Pending).length},g={TodoList:".todo-list",newTodoInput:"#new-todo-input",clearCompleted:".clear-completed",todoFilters:".filtro",pendingCountLabel:"#pending-count"},$=e=>{const t=()=>{const n=c.getTodos(c.getCurrentFilter());H(g.TodoList,n),l()},l=()=>{N(g.pendingCountLabel)};(()=>{const n=document.createElement("div");n.innerHTML=O,document.querySelector(e).append(n),t()})();const i=document.querySelector(g.newTodoInput),o=document.querySelector(g.TodoList),d=document.querySelector(".clear-completed"),u=document.querySelectorAll(g.todoFilters);i.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().length!==0&&(c.addToDo(n.target.value),t(),n.target.value="")}),o.addEventListener("click",n=>{const p=n.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",n=>{const p=n.target.className==="destroy",f=n.target.closest("[data-id]");!f||!p||(c.deleteTodo(f.getAttribute("data-id")),t())}),d.addEventListener("click",n=>{c.deleteCompleted(),t()}),u.forEach(n=>{n.addEventListener("click",p=>{switch(u.forEach(f=>{f.classList.remove("selected")}),p.target.classList.add("selected"),p.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();$("#app");
