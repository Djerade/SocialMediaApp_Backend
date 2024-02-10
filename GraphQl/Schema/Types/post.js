const Post = `
    type Post {
        id: ID,
        body: String!,
        createdAt: String
        username: String
        comment : [Comment]
    }
`

export default Post