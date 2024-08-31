const User = `
type User {
    username: String,
    password: String,
    email: String,
    followers: [User],
    following: [User],
    createdAt: String,
    token: String
}
`
export default User