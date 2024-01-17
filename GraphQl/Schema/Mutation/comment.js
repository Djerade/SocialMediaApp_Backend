const newComment = `
    body: String,
    username: String
    createAt: String
`

const updatePost = `
    body: String
`
export const Comment = `
    createComment(${newComment}): Comment,
    updateComment(${newComment}): Comment
`