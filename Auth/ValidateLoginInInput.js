export function ValidateLoginInput(username, password) {
    const errors = {};
    if (username.trim() === '') {
        email.errors() = "username  empty";
    }
    if (password.trim() === '') {
        password.errors() = 'password  empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
