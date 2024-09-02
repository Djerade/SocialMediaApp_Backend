const newComment = `
    postID: String,
    body: String,
    username: String
    createAt: String
`

const updatePost = `
    body: String
`

export const Comment = `
    createComment(${newComment}): Post!,
    updateComment(${updatePost}): Post!
`