class TodoListView {
    static BUTTON_CLASS = {
        BUTTON_NEW_USER: 'button-input',
        BUTTON_EDIT: 'button-edit',
        BUTTON_DEL: 'button-del',
        BUTTON_SAVE: 'button-save',
        BUTTON_SAVE_NEW_USER: 'button-saveNewUser'
    };
    static ID = {
        BUTTON_SAVE_ID: 'button-save',
        USER_NAME_ID: 'user-name',
        NEW_USER_NAME_ID: 'new-user-name',
        NEW_USER_ADDRESS_ID: 'new-user-address',
        NEW_USER_PHONE_ID: 'new-user-phone',
    }

    static INPUT = 'input'
    static LIST = 'list'
    static CONTAINER_INPUT = 'container_input'
    static ITEM = 'item'
    static ITEM_ADDRESS = 'item-address'
    static ITEM_PHONE = 'item-phone'
    static CONTAINER_USER = 'container_user'
    static CONTAINER_USER_OPEN = 'container_user_open'

    editUser = null;
    id = 0;
    isEnter = true;
    newUser = null;



    constructor(options) {
        this.options = options;
        this.$ListContainerEl =
            this.initView()
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_DEL}`, (e) => this.onDeleteClick(e))
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_EDIT}`, (e) => this.onEditClick(e))
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_SAVE_NEW_USER}`, (e) => this.onSaveNewUser(e))
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_SAVE}`, (e) => this.onEditSave(e))
    };

    initView() {
        return $(`<ul class="${TodoListView.LIST}"></ul>`);
    };

    renderList(list) {
        const listHtml = list.map(item => this.createItemHtml(item)).join('');
        this.$ListContainerEl.html(listHtml)
    };

    renderEdit(user) {
        const editHtml = this.createEditHtml(user);
        this.$ListContainerEl.html(editHtml);
    };

    appendTo($container) {
        $container.append(this.$ListContainerEl);
    };

    createItemHtml(item) {
        return `<li id="${item.id}" class=" ${TodoListView.ITEM}">${item.name}</li>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_EDIT}">Edit</button>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_DEL}">Delete</button>`;
    };

    createEditHtml(user) {
        return `<li id=${user.id} class="${TodoListView.ITEM}" contenteditable="true">Name:${user.name}</li>
        <li id=${user.id}  class=" ${TodoListView.ITEM_ADDRESS}" contenteditable="true">Address:${user.address.city}</li>
        <li id=${user.id}  class=" ${TodoListView.ITEM_PHONE}" contenteditable="true">Phone: ${user.phone}</li>
        <button id="#${TodoListView.ID.BUTTON_SAVE_ID}" class="${TodoListView.BUTTON_CLASS.BUTTON_SAVE}">Save</button>`
    };

    createUserCreateContainer($container) {
        const el = $(`<div class="${TodoListView.CONTAINER_INPUT}">
        <input id="${TodoListView.ID.USER_NAME_ID}" class="${TodoListView.INPUT}" placeholder="Name">
        <button id="button-input" class="${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}">Enter</button></div>`)
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}`, (e) => this.onEnterClick(e));
        $container.prepend(el);
    };

    createNewUserContainer($container) {
        this.newUser = $(`<div class="${TodoListView.CONTAINER_USER_OPEN}"> 
        <p>Name:</p><input id="${TodoListView.ID.NEW_USER_NAME_ID}" class=" ${TodoListView.ITEM}"> 
        <p>Address:</p><input id="${TodoListView.ID.NEW_USER_ADDRESS_ID}" class=" ${TodoListView.ITEM_ADDRESS}">
        <p>Phone:</p><input id="${TodoListView.ID.NEW_USER_PHONE_ID}" class=" ${TodoListView.ITEM_PHONE}"> 
        <button id="button-saveNewUser" class="${TodoListView.BUTTON_CLASS.BUTTON_SAVE_NEW_USER}">Save</button></div>`);
        $($container).prepend(this.newUser);
    };

    onDeleteClick(e) {
        if (!this.isEnter) {
            return;
        };
        this.options.onDelete(e.target.id);
    };

    onEditClick(e) {
        if (!this.isEnter) {
            return;
        };
        this.id = e.target.id;
        this.isEnter = false;
        this.editUser = this.options.onEdit(e.target.id);
        this.renderEdit(this.editUser);
        $(`div.${TodoListView.CONTAINER_INPUT}`).toggleClass(TodoListView.CONTAINER_USER);
    };

    onEditSave(e) {
        const name = $(`.${TodoListView.ITEM}`).text().split(':')[1];
        const address = $(`.${TodoListView.ITEM_ADDRESS}`).text().split(':')[1]
        const phone = $(`.${TodoListView.ITEM_PHONE}`).text().split(': ')[1];
        const id = this.id;
        this.editUser = { name, address, phone, id }
        this.isEnter = true;
        this.options.onEditSave(this.editUser);
        $(`div.${TodoListView.CONTAINER_INPUT}`).toggleClass(TodoListView.CONTAINER_USER);
    };

    onEnterClick(e) {
        if (this.isEnter && $(TodoListView.INPUT).val().length > 0) {
            this.createNewUserContainer(this.$ListContainerEl);
            $(`#${TodoListView.ID.NEW_USER_NAME_ID}`).val($(TodoListView.INPUT).val());
            $(`#${TodoListView.ID.USER_NAME_ID}`).val('');
            this.isEnter = false;
        };
    };

    onSaveNewUser(e) {
        const name = $(`#${TodoListView.ID.NEW_USER_NAME_ID}`).val();
        const address = {
            city: $(`#${TodoListView.ID.NEW_USER_ADDRESS_ID}`).val()
        };
        const phone = $(`#${TodoListView.ID.NEW_USER_PHONE_ID}`).val();
        this.newUser = { name, address, phone }
        this.options.onAddNewUser(this.newUser);
        this.isEnter = true;
    };

    removeElement(id) {
        this.$ListContainerEl.find(`#${id }`).remove();
    };
}