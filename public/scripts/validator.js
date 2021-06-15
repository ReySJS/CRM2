///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Class used for input validation///////////////////////////////
class Validator {
    #findBlank
    #regexPhone
    #regexEmail
    constructor() {
        this.#findBlank = /\s/;
        this.#regexPhone = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
        this.#regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    };

    #validateName(_name) {
        if (_name != "" && _name.length >= 5 && !this.#findBlank.test(_name)) {
            return true;
        }
        else {
            return false
        }
    };

    #validateEmail(_email1, _email2) {
        if (_email1 != "" && this.#regexEmail.test(String(_email1).toLowerCase()) && _email1 === _email2) { 
            return true
        }
        else {
            return false
        }
    };

    #validatePhone(_phone) {
        return this.#regexPhone.test(String(_phone))
    };

    #validateCep(_cep) {
        if (_cep != "" && _cep.length === 9 && !isNaN(_cep.replace('-', ''))) {
            return true;
        }
        else {
            return false;
        }
    };

    #validateNumber(_num) {
        if (_num != "" && !isNaN(_num) && !this.#findBlank.test(_num)) {
            return true;
        }
        else {
            return false;
        }
    };

    #validateLoginPassword(_password) {
        if (_password != "" && _password.length >= 5 && !this.#findBlank.test(_password)) {
            return true;
        }
        else {
            return false;
        }
    };

    #validateRegistrationPassword(_password1, _password2) {
        if (_password1 != "" && _password1.length >= 5 && _password1 === _password2) {
            if (!this.#findBlank.test(_password1) && !this.#findBlank.test(_password2)) {
                return true;
            }
        }
        else {
            return false;
        }
    };

    validateLogin(_userData, _inputs) {

        let validationStatus = true;

        if (!this.#validateName(_userData.name)) {
            formatter.formatError(_inputs[0])
            validationStatus = false;
        }
        if (!this.#validateLoginPassword(_userData.password)) {
            formatter.formatError(_inputs[1])
            validationStatus = false;
        }
        return validationStatus;
    };


    validateRegistration(_userData, _inputs) {
        let validationStatus = true;

        if (!this.#validateName(_userData.name)) {
            formatter.formatError(_inputs[0])
            validationStatus = false;
        }
        if (!this.#validateEmail(_userData.email1, _userData.email2)) {
            formatter.formatError(_inputs[1])
            formatter.formatError(_inputs[2])
            validationStatus = false;
        }
        if (!this.#validatePhone(_userData.phone)) {
            formatter.formatError(_inputs[3])
            validationStatus = false;
        }
        if (!this.#validateRegistrationPassword(_userData.password1, _userData.password2)) {
            formatter.formatError(_inputs[4])
            formatter.formatError(_inputs[5])
            validationStatus = false;
        }
        if (!this.#validateCep(_userData.cep)) {
            formatter.formatError(_inputs[6])
            validationStatus = false;
        }
        if (!this.#validateNumber(_userData.number)) {
            formatter.formatError(_inputs[7])
            validationStatus = false;
        }
        return validationStatus
    };
};

const validator = new Validator()
/////////////////////////////Class used for input validation///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
