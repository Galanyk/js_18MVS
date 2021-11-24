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
            })
    };

    editItem(id) {
            return fetch(this.url + "/" + id, { method: 'PUT' })
                .then((r) => {
                    this.todoListItems = this.todoListItems.filter((i) => i.id === +id);
                    // this.createEditHtml()
                    // console.log(this.todoListItems[0].id);
                    // return Promise.resolve(id);
                })
        }
        // createEditHtml(user, $container) {
        //     return `<li contenteditable="true" class=" ${TodoListView.ITEM}">AAAA</li>
        //     <li contenteditable="true" class=" ${TodoListView.ITEM}">Adress: Odessa</li>`;

    //     $container.append(this.$ListContainerEl);

    // }

}