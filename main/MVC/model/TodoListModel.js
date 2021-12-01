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
    };

    getTodoListItems() {
        return this.todoListItems;
    };

    getDataUser(data) {
        this.todoListItems = data;
    };

    deleteItem(id) {
        return fetch(this.url + "/" + id, { method: 'DELETE' })
            .then((r) => {
                this.todoListItems = this.todoListItems.filter((i) => i.id !== +id);
                return Promise.resolve(id);
            });
    };

    editItem(id) {
        const element = this.todoListItems.find((e) => e.id === +id);
        return element;
    };

    editSave(user) {
        console.log('model save user: ', user[0].children[0].innerHTML);
        const tempUser = this.todoListItems.find((e) => e.id === +user[0].children[0].id);
        const tempName = user[0].children[0].innerHTML.split(':');
        tempUser.name = tempName[1];
    };

    addNewUser(newUser) {
        if (!newUser.name.trim()) {
            alert('Incorrect name');
            return;
        } else if (!newUser.address.trim()) {
            alert('Incorrect address');
            return;
        } else if (!newUser.phone.trim()) {
            alert('Incorrect phone');
            return
        };
        this.todoListItems.push(newUser);
    };
}