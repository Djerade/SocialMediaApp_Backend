const newUser = `
    username: String
    email: String
    password: String
    confirmationPassword: String


`

export const User = `
     createAccount(${newUser}): User!
`