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
        const tempUser = this.todoListItems.find((e) => e.id === +user.id);
        tempUser.name = user.name;
        tempUser.address.city = user.address;
        tempUser.phone = user.phone;
    };

    addNewUser(newUser) {
        if (!newUser.name) {
            alert('Incorrect name');
            return;
        } else if (!newUser.address) {
            alert('Incorrect address');
            return;
        } else if (!newUser.phone) {
            alert('Incorrect phone');
            return
        };
        Object.assign(newUser, { id: this.todoListItems.length + 1, })
        this.todoListItems.push(newUser);
    };

}