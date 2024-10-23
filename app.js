const tasks = [
    {
        _id: "5d2ca9e2e03d40b326596aa7",
        completed: true,
        body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
        title: "Eu ea incididunt sunt consectetur fugiat non.",
    },
    {
        _id: "5d2ca9e29c8a94095c1288e0",
        completed: false,
        body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
        title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
    },
    {
        _id: "5d2ca9e2e03d40b3232496aa7",
        completed: true,
        body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
        title: "Eu ea incididunt sunt consectetur fugiat non.",
    },
    {
        _id: "5d2ca9e29c8a94095564788e0",
        completed: false,
        body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
        title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
    },
];

(function (arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask'];
    const inpTitle = form.elements['title'];
    const inpBody = form.elements['body'];

    renderTasks(objOfTasks);
    form.addEventListener('submit', onSubmitHandler);
    listContainer.addEventListener('click', onDeleteHandler);

    function renderTasks(tasksList) {
        if(!tasksList || !listContainer) return;

        const list = document.querySelector('.list-group');

        if(!list) return;

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => fragment.append(listItemTpl(task)));

        listContainer.append(fragment);
    }

    function listItemTpl({ _id, title, body } = {}) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center flex-wrap mt-2';
        li.dataset.taskId = _id;

        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.className = 'btn btn-danger ml-auto delete-btn';
        btn.textContent = 'Delete';

        const p = document.createElement('p');
        p.className = 'mt-2 w-100';
        p.textContent = body;

        li.append(span, btn, p);

        return li;
    }

    function onSubmitHandler(e) {
        e.preventDefault();

        const inpTitleVal = inpTitle.value;
        const inpBodyVal = inpBody.value;

        if(!inpTitleVal || !inpBodyVal) {
            alert('Enter title and body task');
            return;
        }

        const task = createNewTask(inpTitleVal, inpBodyVal);
        const li = listItemTpl(task);

        listContainer.insertAdjacentElement('afterbegin', li);
    }

    function createNewTask(title, body) {
        const newTask = {
            _id: `task_${Math.random()}`,
            complited: false,
            body,
            title
        };

        objOfTasks[newTask._id] = newTask;

        return {...newTask};
    }

    function deleteTask(id) {
        const { title } = objOfTasks[id];
        const isConfirm = confirm(`Do you want to remove task - ${title}`);

        if(!isConfirm) return;

        delete objOfTasks[id];

        return isConfirm;
    }

    function deleteTaskFromhtml(confirmed, el) {
        if(!confirmed) return;
        el.remove();
    }

    function onDeleteHandler({ target }) {
        if(target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromhtml(confirmed, parent);
        }
    }
})(tasks);
