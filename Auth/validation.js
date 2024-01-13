export function Validation(username, password, confirmationPassword, email) {
    const errors = {}
  if (username.trim() == '') {
      username.errors() = 'username is empty';
    }
    if (password.trim() == '') {
        password.errors() = 'password is empty';
    } else {
        if (password !== confirmationPassword) {
            confirmationPassword.errors('passwoed must match');
        }
    }
    if (email.trim() == '') {
        email.errors() = "email is empty";
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(regEx)) {
            errors.email = 'email must to be email valide';
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
