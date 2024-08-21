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
const idUser = `
    id: String
`

export const User = `
     createAccount(${newUser}): User!
     follow(${idUser}): User!
     login(${inputLogin}): User!
`