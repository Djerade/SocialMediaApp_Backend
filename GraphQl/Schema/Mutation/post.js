const post = `
    body: String,
    username: String
    createAt: String
`

const updatePost = `
    body: String
`
export const Post = `
    createPost(${post}): Post,
    updatePoste(${updatePost}): Post
`