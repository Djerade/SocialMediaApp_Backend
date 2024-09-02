const Message = `
    type Message {
        id: ID,
        content: String,
        sender: User!
        receiver: User!
        created: String,
    }
`

export default Message;