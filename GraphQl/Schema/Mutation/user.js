const newUser = `
    username: String
    email: String
    password: String
    confirmationPassword: String
`
const inputLogin = `
    username: String
    password: String
`

export const User = `
     createAccount(${newUser}): User!
     login(${inputLogin}): User!
`