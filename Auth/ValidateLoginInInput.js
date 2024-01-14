export function ValidateLoginInput(username, password) {
    const errors = {};
    if (username.trim() === '') {
        email.errors() = "username is empty";
    }
    if (password.trim() === '') {
        password.errors() = 'password is empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
