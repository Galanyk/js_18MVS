class TodoListView {
    static BUTTON_CLASS = {
        BUTTON_NEW_USER: 'button-input',
        BUTTON_EDIT: 'button-edit',
        BUTTON_DEL: 'button-del',
    };

    static ITEM = 'item'
    constructor(options) {
        this.options = options;

        this.$ListContainerEl =
            this.initView()
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_DEL}`, (e) => this.onDeleteClick(e))
            .on('click', `.${TodoListView.BUTTON_CLASS.BUTTON_EDIT}`, (e) => this.onEditClick(e))

        // this.$ListContainerEl.append();


    };

    initView() {
        return $(`<ul></ul>`);
    };

    initDiv() {
        console.log('add div');
        return $(`<div></div>`);
    };

    renderList(list) {
        const listHtml = list.map(item => this.createItemHtml(item)).join('');
        this.$ListContainerEl.html(listHtml)

    };

    // renderInput(input) {
    //     const inputHtml = list.map(input => this.createInputHtml(input)).join('');
    //     this.$ListContainerEl.html(inputHtml)
    //     console.log(inputHtml)
    // };

    renderEdit(user) {
        const editHtml = this.createEditHtml(user)
        this.$ListContainerEl.html(editHtml)
        console.log(editHtml)
    }

    appendTo($container) {
        $container.append(this.$ListContainerEl);
    }

    createItemHtml(item) {
        return `<li class=" ${TodoListView.ITEM}">${item.name}</li>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_EDIT}">Edit</button>
        <button id="${item.id}" class="${TodoListView.BUTTON_CLASS.BUTTON_DEL}">Delete</button>`;
    };

    createEditHtml(item) {
        return `<li contenteditable="true" class=" ${TodoListView.ITEM}">${item}</li>
        <li contenteditable="true" class=" ${TodoListView.ITEM}">Adress: Odessa</li>`
    }

    createUserCreateContainer($container) {
        const el = `<div><input id="user-name" type="text" placeholder="Name">
        <button  class="${TodoListView.BUTTON_CLASS.BUTTON_NEW_USER}">Enter</button></div>`;
        $container.prepend(el);
    };

    onDeleteClick(e) {
        this.options.onDelete(e.target.id);
    };

    onEditClick(e) {
        this.options.onEdit(e.target.id);
        console.log(e.target.id)
    }

    removeElement(id) {
        this.$ListContainerEl.find(`#${id }`).remove();
    }
}