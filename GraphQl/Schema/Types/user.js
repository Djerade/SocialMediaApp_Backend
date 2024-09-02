const User = `
type User {
    username: String,
    password: String,
    email: String,
    sentMessages: [Message!]!,
    receivedMessages: [Message!]!
    createdAt: String,
    token: String
}
`
export default User