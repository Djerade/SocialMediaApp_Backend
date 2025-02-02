const Post = `
    type Post {
        id: ID,
        body: String,
        createdAt: String,
        user: User!,
        comment : [Comment]
        likes: [Like]
    }
`

export default Post