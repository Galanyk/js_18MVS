class TodoListController {
    static API = "https://jsonplaceholder.typicode.com";
    static ENVIRONMENT = {
        USERS: {
            getUsers: "/users",
        },
        POSTS: {
            getPosts: "/posts",
        },
        TODOS: {
            getTodos: "/todos"
        }

    };

    constructor($container) {
        this.$container = $container;
        this.todoListModel = new TodoListModel(TodoListController.API + TodoListController.ENVIRONMENT.USERS.getUsers);

        this.todoListView = new TodoListView({
            onDelete: (id) => this.deleteListItem(id),
            onEdit: (id) => this.editListItem(id),
            onEnter: (id) => this.enterUser(id),
            onNewUser: (user) => this.getNewUser(user),

        });
        this.todoListModel.getListItems().then(() => this.initViewRender());

        // this.todoListView.createNewUserContainer(this.$container)
        this.todoListView.createUserCreateContainer(this.$container)
    }

    initViewRender() {
        this.todoListView.renderList(this.todoListModel.getTodoListItems())
        this.todoListView.appendTo(this.$container);
        // this.todoListView.createNewUserContainer(this.$container)

    }

    deleteListItem(id) {
        this.todoListModel.deleteItem(id).then((r) => {
            this.initViewRender()
            this.todoListView.removeElement(id)
        })
    }

    editListItem(id) {
        this.todoListModel.editItem(id).then((r) => {
            this.initViewRender()
                // this.todoListView.removeElement(id)
            this.todoListView.renderEdit(this.todoListModel.getDataUser())

        })
    }

    enterUser(id) {
        this.todoListModel.enterUserNew(id).then((r) => {
            this.initViewRender()
            this.todoListView.createNewUserContainer($('container_user').toggleClass(`${TodoListView.CONTAINER_USER_OPEN}`))
                // $(`'${TodoListView.CONTAINER_USER}'`).toggleClass(`'${TodoListView.CONTAINER_USER_OPEN}'`)
                // console.log(createNewUserContainer())

            // this.todoListView.removeElement(id)
            this.todoListView.renderEnter(this.todoListModel)

        })
    }

    getNewUser(newUser) {
        console.log('controler name: ', newUser);
        this.todoListModel.createNewUser(newUser);
    }
}