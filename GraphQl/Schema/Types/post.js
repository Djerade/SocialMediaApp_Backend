const Post = `
    type Post {
        id: ID,
        body: String,
        createdAt: String,
        user: User!,
        comment : [Comment]
    }
`

export default Post