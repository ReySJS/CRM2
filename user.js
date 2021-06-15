const fs = require('fs');

class User {
    constructor() {
        this.name;
        this.email;
        this.phone;
        this.password;
        this.cep;
        this.street;
        this.number;
        this.district;
        this.city;
        this.state;
        this.currentUser = {};
    }

    setName(_name) { this.name = _name; }
    setEmail(_email) { this.email = _email; }
    setPhone(_phone) { this.phone = _phone; }
    setPassword(_password) { this.password = _password; }

    saveUsers(_user) {
        const currentUsers = this.loadUsers();
        currentUsers.push(_user)
        return fs.writeFileSync('./data/users/users.json', JSON.stringify(currentUsers), 'utf-8')
    }

    getName() { return this.name; }
    getEmail() { return this.email; }
    getPhone() { return this.phone; }
    getPassword() { return this.password; }

    loadUsers() {
        const fileBuffer = fs.readFileSync('./data/users/users.json', 'utf-8')
        const contentJson = JSON.parse(fileBuffer)
        return contentJson
    }

    validateLogin(_userName, _userPassword, _userMatch) {
        if (_userMatch[0].name === _userName && _userMatch[0].password === _userPassword) {
            return true
        } else {
            return false
        }
    }

    login(_name, _password) {

        const registeredUsers = this.loadUsers();
        const usersFilter = registeredUsers.filter(value => value.name === _name);
        const userMatch = usersFilter.filter(value => value.password === _password);

        if (userMatch[0]) {
            // this.name = userMatch[0].name;
            // this.email = userMatch[0].email;
            // this.phone = userMatch[0].phone;
            // this.password = userMatch[0].password;
            // this.cep = userMatch[0].cep;
            // this.street = userMatch[0].street;
            // this.number = userMatch[0].number;
            // this.district = userMatch[0].district;
            // this.city = userMatch[0].city;
            // this.state = userMatch[0].state;
            // this.currentUser = userMatch[0];
            return true
        }


    }

    logout() {
        this.name = null;
        this.email = null;
        this.phone = null;
        this.password = null;
        this.currentUser = {};
    }
}

module.exports = User