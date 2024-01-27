const post = `
    body: String,
    username: String
    createAt: String
`

const updatePost = `
    _id: String!,
    body: String
`
export const Post = `
    createPost(${post}): Post,
    updatePost(${updatePost}): Post,
    deletPost(_id: ID): Post
`