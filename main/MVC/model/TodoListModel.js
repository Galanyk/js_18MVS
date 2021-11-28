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
        const name = newUser[0].children[0].innerHTML.split(':');
        const address = newUser[0].children[1].innerHTML.split(':');
        const phone = newUser[0].children[2].innerHTML.split(':');
        console.log('user', address[1].length);
        if (name[1].length === 1) {
            alert('Incorrect name');
            return;
        } else if (address[1].length === 1) {
            alert('Incorrect address');
            return;
        } else if (phone[1].length === 1) {
            alert('Incorrect phone');
            return
        };

        const user = {
            id: this.todoListItems.length + 1,
            name: name[1],
            address: {
                city: address[1]
            },
            phone: phone[1]

        };
        this.todoListItems.push(user);
    };

}