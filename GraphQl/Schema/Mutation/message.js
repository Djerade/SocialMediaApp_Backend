const message = `
    content: String!
    idreceiver: ID!
` 

export const Message = `
    createMessage(${message}): Message!
`