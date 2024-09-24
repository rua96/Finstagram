
class validation{

    static emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    static isEmail(input) {
        return input.match(this.emailRegex);

    }
}

export default validation;