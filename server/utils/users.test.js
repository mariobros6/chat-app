var expect = require('expect');
var {Users} = require('./users');


describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: "pit",
            room: "room1"
        },{
            id: '2',
            name: "jen",
            room: "room2"
        },{
            id: '3',
            name: "mike",
            room: "room1"
        },];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {id: '212312312', name: 'mar', room: 'office'};
        var resUSer = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('hsould remove the user', () => {

        var user = users.removeUser('1');

        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {

        var user = users.removeUser('99');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });

    it('should find user', () => {
        var user = users.getUser('2');
        //console.log(user);
        expect(user.id).toBe('2');
    });

    it('should not find user', () => {
        var user = users.getUser('32');
        //console.log(user);
        expect(user).toNotExist();
    });

    it('should return names for room1', () => {
        
        var userList = users.getUserList('room1');
        expect(userList).toEqual(['pit', 'mike']);
    });
    it('should return names for room2', () => {
        
        var userList = users.getUserList('room2');
        expect(userList).toEqual(['jen']);
    });

});