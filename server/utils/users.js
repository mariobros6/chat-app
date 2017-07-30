// var user = [];

// var addUser = (id, ) => {

// }

// class Person {
//     constructor(name, age) {
//         console.log(name, age);
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescr() {
//         return `${this.name} ma ${this.age} lat`;
//     }
// }

// var me = new Person('mar', 39);
// console.log(me.name);
// console.log(me.getUserDescr());

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        this.users.push({id, name, room});
        return this.user;
    }

    removeUser(id) {
        // console.log(id);
        var user = this.getUser(id);
// console.log(this.users);
        if (user) {
            this.users = this.users.filter((user) => {
                return user.id != id;
            });
        }
// console.log(this.users);
        return user;

    }
    getUser(id) {
        return this.users.filter((user) => {
            return user.id === id;
        })[0];
    }
    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room == room;
        });
        // console.log(this.users);
        // console.log(users);
        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;

    }
}

module.exports = {
    Users
};