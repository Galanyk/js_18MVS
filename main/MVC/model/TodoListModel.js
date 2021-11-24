class TodoListModel {
    todoListItems = [];
    user = [{
            name: ""
        },
        { adress: 'Odessa' }
    ]
    constructor(url) {
        this.url = url;
    };

    getListItems() {
        return fetch(this.url)
            .then((r) => r.json())
            .then((r) => this.setListData(r))
    };

    setListData(data) {
        this.todoListItems = data;
        console.log(this.todoListItems)
    };

    getTodoListItems() {
        return this.todoListItems;
    };

    getDataUser(data) {
        console.log(data)
        this.todoListItems = data;
    }

    deleteItem(id) {
        return fetch(this.url + "/" + id, { method: 'DELETE' })
            .then((r) => {
                this.todoListItems = this.todoListItems.filter((i) => i.id !== +id);
                // console.log(this.todoListItems[0].id);
                return Promise.resolve(id);
            });
    };

    editItem(id) {
        return fetch(this.url + "/" + id, { method: 'PUT' })
            .then((r) => {
                this.todoListItems = this.todoListItems.filter((i) => i.id === +id);
                // this.createEditHtml()
                // console.log(this.todoListItems[0].id);
                // return Promise.resolve(id);
            });
    };

    enterUserNew(userData) {
        // console.log('ToDoListModel: 52: Click Enter');
        const foo = {
            name: ` ${ userData }`
        }

        return fetch(this.url + "/", { method: 'POST' })
            .then((r) => {
                this.todoListItems.push(foo)
                    // this.createEditHtml()

                // this.todoListItems.push(foo)
                // console.log(this.todoListItems);
                // return Promise.resolve(id);
            });
    };



}