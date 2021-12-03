class TodoListView {
    static BUTTON_CLASS = {
        BUTTON_NEW_USER: 'button-input',
        BUTTON_EDIT: 'button-edit',
        BUTTON_DEL: 'button-del',
        BUTTON_SAVE: 'button-save',
        BUTTON_SAVE_NEW_USER: 'button-saveNewUser'
    };
    isEnter = true;
    newUser = null;
    editUser = null;
    id = 0;

    static INPUT = 'input'
    static LIST = 'list'
    static CONTAINER_INPUT = 'container_input'
    static ITEM = 'item'
    static ITEM_ADDRESS = 'item-address'
    static ITEM_PHONE = 'item-phone'

    static CONTAINER_USER = 'container_user'
    static CONTAINER_USER_OPEN = 'container_user_open'

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
        return `<li id=${user.id} class="${TodoListView.ITEM}" contenteditable="true" class=" ${TodoListView.ITEM}">Name:${user.name}</li>
        <li id=${user.id}  class=" ${TodoListView.ITEM_ADDRESS}" contenteditable="true" class=" ${TodoListView.ITEM}">Address: ${user.address.city}</li>
        <li id=${user.id}  class=" ${TodoListView.ITEM_PHONE}" contenteditable="true" class=" ${TodoListView.ITEM}">Phone: ${user.phone}</li>
        <button id="button-save" class="${TodoListView.BUTTON_CLASS.BUTTON_SAVE}">Save</button>`
    };

    createUserCreateContainer($container) {
        const el = $(`<div class="${TodoListView.CONTAINER_INPUT}">
        <input id="user-name" class="${TodoListView.INPUT}" type="text" placeholder="Name">
        <button id="button-input" class="${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}">Enter</button></div>`)
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}`, (e) => this.onEnterClick(e));
        $container.prepend(el);
    };

    createNewUserContainer($container) {
        this.newUser = $(`<div class="${TodoListView.CONTAINER_USER_OPEN}"> 
         Name: <input type=text id="new-user-name" class=" ${TodoListView.ITEM}"> 
         Address: <input id="new-user-address" class=" ${TodoListView.ITEM_ADDRESS}">
         Phone: <input id="new-user-phone" class=" ${TodoListView.ITEM_PHONE}"> 
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
        //console.log('edit name: ', this.editUser.name);
        const name = $('.item').text().split(':')[1];
        const address = $('.item-address').text().split(':')[1]
        const phone = $('.item-phone').text().split(': ')[1];
        const id = this.id;
        this.editUser = { name, address, phone, id }
        this.isEnter = true;
        this.options.onEditSave(this.editUser);
        $(`div.${TodoListView.CONTAINER_INPUT}`).toggleClass(TodoListView.CONTAINER_USER);
    };

    onEnterClick(e) {
        if (this.isEnter) {
            this.createNewUserContainer(this.$ListContainerEl);
            $('#new-user-name').val($(TodoListView.INPUT).val());
            $('#user-name').val('');
            this.isEnter = false;
        };

    };
    // { city: this.editUser.address.city } 
    onSaveNewUser(e) {
        const name = $('#new-user-name').val();
        const address = {
            city: $('#new-user-address').val()
        };
        console.log('Address: ', address.city);
        const phone = $('#new-user-phone').val();
        this.newUser = { name, address, phone }
        this.options.onAddNewUser(this.newUser);
        this.isEnter = true;
    };

    removeElement(id) {
        this.$ListContainerEl.find(`#${id }`).remove();
    };
}