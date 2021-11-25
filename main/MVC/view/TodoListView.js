class TodoListView {
    static BUTTON_CLASS = {
        BUTTON_NEW_USER: 'button-input',
        BUTTON_EDIT: 'button-edit',
        BUTTON_DEL: 'button-del',
        BUTTON_SAVE: 'button-save',
    };

    newUser = null;
    inputNameEl = document.querySelector('user-name');

    static INPUT = 'input'
    static ITEM = 'item'
    static CONTAINER_USER = 'container_user'
    static CONTAINER_USER_OPEN = 'container_user_open'
    constructor(options) {
        this.options = options;

        this.$ListContainerEl =
            this.initView()
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_DEL}`, (e) => this.onDeleteClick(e))
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_EDIT}`, (e) => this.onEditClick(e));
    };

    initView() {
        return $(`<ul></ul>`);
    };

    renderList(list) {
        const listHtml = list.map(item => this.createItemHtml(item)).join('');
        this.$ListContainerEl.html(listHtml)
    };

    renderEdit(list) {
        // const editHtml = $('button').each(item => this.createNewUserContainer(item));
        // this.$ListContainerEl.html(editHtml)
        const editHtml = this.createEditHtml(list)
            // const editHtml = $('li').each(() => this.createEditHtml());

        this.$ListContainerEl.html(editHtml)
            // console.log(editHtml)
    };

    renderEnter(list) {
        // const enterHtml = this.createNewUserContainer(list)
        this.$ListContainerEl.html(enterHtml)
            // console.log(enterHtml)
    };

    appendTo($container) {
        $container.append(this.$ListContainerEl);
    };

    createItemHtml(item) {
        return `<li id="${item.id}" class=" ${TodoListView.ITEM}">${item.name}</li>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_EDIT}">Edit</button>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_DEL}">Delete</button>`;

    };

    createEditHtml(item) {
        return `<li contenteditable="true" class=" ${TodoListView.ITEM}">${item}</li>
        <li contenteditable="true" class=" ${TodoListView.ITEM}">Adress: Odessa</li>
        <button id="button-save" class="${TodoListView.BUTTON_CLASS.BUTTON_SAVE}">Save</button>`
    }

    createUserCreateContainer($container) {
        const el = $(`<div ><input id="user-name" class="${TodoListView.INPUT}" type="text" placeholder="Name">
        <button id="button-input" class="${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}">Enter</button></div>`)
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}`, (e) => this.onEnterClick(e))
        $container.prepend(el);
    };

    createNewUserContainer($container) {
        const name = $(TodoListView.INPUT).val();
        this.newUser = $(`<div class="${TodoListView.CONTAINER_USER_OPEN}"><li>User Name : ${name} </li>
        <li contenteditable="true">Adress: </li>
        <li contenteditable="true">Company: </li></div>`)
        $container.prepend(this.newUser);
    };

    onDeleteClick(e) {
        this.options.onDelete(e.target.id);
    };

    onEditClick(e) {
        this.options.onEdit(e.target.id);
    };

    onEnterClick(e) {
        this.createNewUserContainer(this.$ListContainerEl);
        console.log('View new user: ', this.newUser);
        $(TodoListView.INPUT).val('');

        this.options.onNewUser(this.newUser); // call into save button

        // this.options.onEnter($(`${TodoListView.INPUT}`).val());
        // console.log('length: ', this.$ListContainerEl)
        // $(`${TodoListView.INPUT}`).val('')
        // const foo = {
        //         name: ` name`,
        //         id: '111',
        //     }
        //     // console.log(item)

        // $('button').each(function(index, value) {
        //     // console.log('button' + index + ':' + $(this).attr('id'));
        // })
    };
    // onToggleItem(e) {

    // }
    removeElement(id) {
        this.$ListContainerEl.find(`#${id }`).remove();
    };
}