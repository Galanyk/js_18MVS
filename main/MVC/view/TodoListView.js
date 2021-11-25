class TodoListView {
    static BUTTON_CLASS = {
        BUTTON_NEW_USER: 'button-input',
        BUTTON_EDIT: 'button-edit',
        BUTTON_DEL: 'button-del',
        BUTTON_SAVE: 'button-save',
    };
    input = null
    inputNameEl = document.querySelector('user-name');
    static INPUT = 'input'
    constructor(options) {
        this.options = options;

        this.$ListContainerEl =
            this.initView()
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_DEL}`, (e) => this.onDeleteClick(e))
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_EDIT}`, (e) => this.onEditClick(e));
        // .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}`, (e) => this.onEnterClick(e)))
    };

    initView() {
        return $(`<ul></ul>`);
    };

    renderList(list) {
        const listHtml = list.map(item => this.createItemHtml(item)).join('');
        this.$ListContainerEl.html(listHtml)
    };

    renderEdit(user) {
        const editHtml = this.createEditHtml(user)
        this.$ListContainerEl.html(editHtml)
            // console.log(editHtml)
    };

    renderEnter(list) {
        const enterHtml = this.createNewUserContainer(list)
        this.$ListContainerEl.html(enterHtml)
            // console.log(enterHtml)
    };

    appendTo($container) {
        $container.append(this.$ListContainerEl);
    };

    createItemHtml(item) {
        return `<li class=" ${TodoListView.ITEM}">${item.name}</li>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_EDIT}">Edit</button>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_DEL}">Delete</button>`;
    };

    createEditHtml(item) {
        return `<li contenteditable="true" class=" ${TodoListView.ITEM}">${item}</li>
        <li contenteditable="true" class=" ${TodoListView.ITEM}">Adress: Odessa</li>
        <button id="button-save" class="${TodoListView.BUTTON_CLASS.BUTTON_SAVE}">Save</button>`
    }

    createUserCreateContainer($container) {
        const el = $(`<div><input id="user-name" class="${TodoListView.INPUT}" type="text" placeholder="Name">
        <button id="button-input" class="${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}">Enter</button></div>`)
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}`, (e) => this.onEnterClick(e))
        $container.prepend(el);
    };

    createNewUserContainer($container) {
        const element = $(`<div><li>User Name : $(${TodoListView.INPUT}).val()</li>
        <li>Adress: Odessa</li>
        <li>Compani: "Mylti-treyd"</li>`)

        // <button id="button-input" class="${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}">Enter</button></div>`)
        //     .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}`, (e) => this.onEnterClick(e))
        // $container.prepend(element);
    };

    onDeleteClick(e) {
        this.options.onDelete(e.target.id);
    };

    onEditClick(e) {
        this.options.onEdit(e.target.id);
    };

    onEnterClick(e) {
        this.options.onEnter($(`${TodoListView.INPUT}`).val());
        $(`${TodoListView.INPUT}`).val('')
        const foo = {
            name: ` name`,
            id: 'id'
        }
        this.createItemHtml(foo)
    };

    removeElement(id) {
        this.$ListContainerEl.find(`#${id }`).remove();
    };
}