class TodoListController {
    static API = "https://jsonplaceholder.typicode.com";
    static ENVIRONMENT = {
        USERS: {
            getUsers: "/users",
        },
    };

    constructor($container) {
        this.$container = $container;
        this.todoListModel = new TodoListModel(TodoListController.API + TodoListController.ENVIRONMENT.USERS.getUsers);

        this.todoListView = new TodoListView({
            onDelete: (id) => this.deleteListItem(id),
            onEdit: (id) => this.editListItem(id),
            onAddNewUser: (user) => this.addNewUser(user),
            onEditSave: (user) => this.editSave(user),
        });
        this.todoListModel.getListItems().then(() => this.initViewRender());
        this.todoListView.createUserCreateContainer(this.$container);
    };

    initViewRender() {
        this.todoListView.renderList(this.todoListModel.getTodoListItems());
        this.todoListView.appendTo(this.$container);
    };

    deleteListItem(id) {
        this.todoListModel.deleteItem(id).then((r) => {
            this.initViewRender();
            this.todoListView.removeElement(id);
        });
    };

    editSave(user) {
        this.todoListModel.editSave(user);
        this.todoListView.renderList(this.todoListModel.getTodoListItems());
    };

    editListItem(id) {
        return this.todoListModel.editItem(id);
    };

    addNewUser(newUser) {
        this.todoListModel.addNewUser(newUser);
        this.todoListView.renderList(this.todoListModel.getTodoListItems());
    };
}