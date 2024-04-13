export function ValidateSignUpInput(username, password, confirmationPassword, email) {
    const errors = {}
    if (username.trim() === '') {
      username.errors() = 'username is empty';
    }
    if (password.trim() === '') {
        password.errors() = 'password is empty';
    } else {
        if (password !== confirmationPassword) {
            confirmationPassword.errors('password is different');
        }
    }
    if (email.trim() === '') {
        email.errors() = "email is empty";
    } else {
        const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        
        if (!email.match(regEx)) {
            errors.email = 'email must to be email valide';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
