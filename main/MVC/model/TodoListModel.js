class TodoListModel {
    todoListItems = [];
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

    deleteItem(id) {
        return fetch(this.url + "/" + id, { method: 'DELETE' })
            .then((r) => {
                this.todoListItems = this.todoListItems.filter((i) => i.id !== +id);
                console.log(this.todoListItems[0].id);
                return Promise.resolve(id);
            })
    };

    editItem(id) {
        return fetch(this.url + "/" + id, { method: 'PUT' })
            .then((r) => {
                this.todoListItems = this.todoListItems.filter((i) => i.id === +id);
                console.log(this.todoListItems[0].id);
                // return Promise.resolve(id);
            })
    }

}